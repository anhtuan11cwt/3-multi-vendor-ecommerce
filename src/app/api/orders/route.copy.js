import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { orderApiSchema } from "@/lib/validations/checkout";

const ORDER_NUMBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateOrderNumber(length = 8) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += ORDER_NUMBER_CHARS.charAt(
      Math.floor(Math.random() * ORDER_NUMBER_CHARS.length),
    );
  }
  return result;
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Vui lòng đăng nhập để tạo đơn hàng",
          status: 401,
        },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const body = await request.json();
    const parsed = orderApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          errors: parsed.error.flatten().fieldErrors,
          message: "Dữ liệu đơn hàng không hợp lệ",
          status: 400,
        },
        { status: 400 },
      );
    }

    const { items, subtotal, shippingCost, total, ...customerInfo } =
      parsed.data;

    const newOrder = await db.order.create({
      data: {
        ...customerInfo,
        orderNumber: generateOrderNumber(8),
        province: customerInfo.province ?? "",
        shippingCost: Number(shippingCost),
        subtotal: Number(subtotal),
        total: Number(total),
        userId,
        ward: customerInfo.ward ?? "",
      },
    });

    const newOrderItems = await db.orderItem.createMany({
      data: items.map((item) => ({
        imageUrl: item.imageUrl ?? null,
        orderId: newOrder.id,
        price: Number(item.price),
        productId: item.id,
        quantity: Number(item.quantity),
        title: item.title,
      })),
    });

    console.log("Đơn hàng đã tạo:", newOrder);
    console.log("Chi tiết sản phẩm:", newOrderItems);

    return NextResponse.json(
      {
        data: newOrder,
        message: "Tạo đơn hàng thành công",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    return NextResponse.json(
      {
        error: error.message,
        message: "Xử lý đơn hàng thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Vui lòng đăng nhập để xem đơn hàng",
          status: 401,
        },
        { status: 401 },
      );
    }

    const orders = await db.order.findMany({
      include: { orderItems: true },
      orderBy: { createdAt: "desc" },
      where: { userId: session.user.id },
    });

    return NextResponse.json(
      {
        data: orders,
        message: "Lấy danh sách đơn hàng thành công",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi lấy danh sách đơn hàng:", error);
    return NextResponse.json(
      {
        error: error.message,
        message: "Lấy danh sách đơn hàng thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
