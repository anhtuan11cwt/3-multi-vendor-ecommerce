import { NextResponse } from "next/server";
import db from "@/lib/db";
import { generateISOFormattedDate } from "@/lib/generate-iso-formatted-date";
import { couponApiSchema } from "@/lib/validations/coupon";

export async function GET() {
  try {
    const coupons = await db.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

    const { expiryDate, ...rest } = parsed.data;

    const newCoupon = await db.coupon.create({
      data: {
        ...rest,
        expiryDate: generateISOFormattedDate(expiryDate),
      },
    });

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
