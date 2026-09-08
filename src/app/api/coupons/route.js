import { NextResponse } from "next/server";
import { couponApiSchema } from "@/lib/validations/coupon";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = couponApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          errors: parsed.error.flatten().fieldErrors,
          message: "Dữ liệu không hợp lệ",
          status: 400,
        },
        { status: 400 },
      );
    }

    const newCoupon = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    console.log("Đã tạo mã giảm giá:", newCoupon);

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo mã giảm giá thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
