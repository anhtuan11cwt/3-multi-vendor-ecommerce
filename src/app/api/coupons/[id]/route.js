import { NextResponse } from "next/server";
import db from "@/lib/db";
import { generateISOFormattedDate } from "@/lib/generate-iso-formatted-date";
import { couponUpdateApiSchema } from "@/lib/validations/coupon";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    const coupon = await db.coupon.findUnique({ where: { id } });

    if (!coupon) {
      return NextResponse.json(
        { message: "Không tìm thấy mã giảm giá" },
        { status: 404 },
      );
    }

    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể lấy mã giảm giá" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const parsed = couponUpdateApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          errors: parsed.error.flatten().fieldErrors,
          message: "Dữ liệu không hợp lệ",
        },
        { status: 400 },
      );
    }

    const existingCoupon = await db.coupon.findUnique({ where: { id } });

    if (!existingCoupon) {
      return NextResponse.json(
        { message: "Không tìm thấy mã giảm giá" },
        { status: 404 },
      );
    }

    const { expiryDate, ...rest } = parsed.data;

    const updatedCoupon = await db.coupon.update({
      data: {
        ...rest,
        expiryDate: generateISOFormattedDate(expiryDate),
      },
      where: { id },
    });

    console.log("Đã cập nhật mã giảm giá:", updatedCoupon);

    return NextResponse.json(updatedCoupon);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Cập nhật mã giảm giá thất bại" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    const existingCoupon = await db.coupon.findUnique({ where: { id } });

    if (!existingCoupon) {
      return NextResponse.json(
        { message: "Không tìm thấy mã giảm giá" },
        { status: 404 },
      );
    }

    const deletedCoupon = await db.coupon.delete({ where: { id } });

    console.log("Đã xóa mã giảm giá:", deletedCoupon);

    return NextResponse.json(deletedCoupon);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể xóa mã giảm giá" },
      { status: 500 },
    );
  }
}
