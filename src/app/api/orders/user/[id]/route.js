import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        {
          message: "Không tìm thấy đơn hàng của người dùng này",
          status: 404,
        },
        { status: 404 },
      );
    }

    // userId không phải trường duy nhất nên dùng findMany kèm where
    const orders = await db.order.findMany({
      include: { orderItems: true },
      orderBy: { createdAt: "desc" },
      where: { userId: id },
    });

    return NextResponse.json(
      {
        data: orders,
        message: "Lấy danh sách đơn hàng theo người dùng thành công",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Không thể lấy danh sách đơn hàng của người dùng",
        status: 500,
      },
      { status: 500 },
    );
  }
}
