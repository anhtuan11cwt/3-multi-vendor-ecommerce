import { NextResponse } from "next/server";
import { orderApiSchema } from "@/lib/validations/checkout";

export async function POST(request) {
  try {
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

    console.log("Đơn hàng hợp lệ:", {
      ...customerInfo,
      itemCount: items.length,
      shippingCost,
      subtotal,
      total,
    });

    return NextResponse.json(
      {
        data: parsed.data,
        message: "Dữ liệu đơn hàng hợp lệ",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error) {
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
