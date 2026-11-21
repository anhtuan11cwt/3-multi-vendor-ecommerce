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

/**
 * Xác định vendorId (User ID của farmer) cho từng sản phẩm trong đơn hàng.
 * - Ưu tiên vendorId gửi từ giỏ hàng.
 * - Với giỏ hàng cũ chưa có vendorId: tra product -> farmer -> userId.
 * Trả về Map<productId, vendorId>. Nếu không tra được -> throw (rollback toàn transaction).
 */
async function resolveVendorIds(tx, items) {
  const vendorIdByProductId = new Map();
  const missingProductIds = [];

  for (const item of items) {
    if (item.vendorId) {
      vendorIdByProductId.set(String(item.id), item.vendorId);
    } else {
      missingProductIds.push(String(item.id));
    }
  }

  if (missingProductIds.length === 0) {
    return vendorIdByProductId;
  }

  const products = await tx.product.findMany({
    select: { farmer: { select: { userId: true } }, id: true },
    where: { id: { in: missingProductIds } },
  });

  for (const product of products) {
    if (product.farmer?.userId) {
      vendorIdByProductId.set(String(product.id), product.farmer.userId);
    }
  }

  return vendorIdByProductId;
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

    // Gộp toàn bộ thao tác ghi vào một transaction nguyên tử:
    // nếu bất kỳ bước nào lỗi thì toàn bộ được rollback (không còn đơn hàng thiếu chi tiết).
    const result = await db.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
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

      const vendorIdByProductId = await resolveVendorIds(tx, items);

      for (const item of items) {
        if (!vendorIdByProductId.has(String(item.id))) {
          throw new Error(
            `Không xác định được nhà cung cấp cho sản phẩm "${item.title}"`,
          );
        }
      }

      await tx.orderItem.createMany({
        data: items.map((item) => ({
          imageUrl: item.imageUrl ?? null,
          orderId: newOrder.id,
          price: Number(item.price),
          productId: item.id,
          quantity: Number(item.quantity),
          title: item.title,
          vendorId: vendorIdByProductId.get(String(item.id)),
        })),
      });

      const createdOrderItems = await tx.orderItem.findMany({
        orderBy: { createdAt: "asc" },
        where: { orderId: newOrder.id },
      });

      // Tạo một bản ghi Sale cho từng sản phẩm (mỗi vendor tự có doanh số riêng)
      const sales = await Promise.all(
        items.map((item) =>
          tx.sale.create({
            data: {
              orderId: newOrder.id,
              productId: item.id,
              productImage: item.imageUrl ?? null,
              productPrice: Number(item.price),
              productQuantity: Number(item.quantity),
              productTitle: item.title,
              total: Number(item.price) * Number(item.quantity),
              vendorId: vendorIdByProductId.get(String(item.id)),
            },
          }),
        ),
      );

      return { createdOrderItems, newOrder, sales };
    });

    console.log("Đơn hàng đã tạo:", result.newOrder);
    console.log("Chi tiết sản phẩm:", result.createdOrderItems);
    console.log("Doanh số đã tạo:", result.sales);

    return NextResponse.json(
      {
        data: result.newOrder,
        message: "Tạo đơn hàng thành công",
        orderItems: result.createdOrderItems,
        sales: result.sales,
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
