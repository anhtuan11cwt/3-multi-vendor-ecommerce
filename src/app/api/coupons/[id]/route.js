import { NextResponse } from "next/server";
import db from "@/lib/db";

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
