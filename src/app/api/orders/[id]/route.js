import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        {
          message: "Không tìm thấy đơn hàng",
          status: 404,
        },
        { status: 404 },
      );
    }

    const order = await db.order.findUnique({
      include: { orderItems: true },
      where: { id },
    });

    if (!order) {
      return NextResponse.json(
        {
          message: "Không tìm thấy đơn hàng",
          status: 404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Không thể lấy đơn hàng",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        {
          message: "Không tìm thấy đơn hàng",
          status: 404,
        },
        { status: 404 },
      );
    }

    const existingOrder = await db.order.findUnique({ where: { id } });

    if (!existingOrder) {
      return NextResponse.json(
        {
          message: "Không tìm thấy đơn hàng",
          status: 404,
        },
        { status: 404 },
      );
    }

    const deletedOrder = await db.order.delete({ where: { id } });

    console.log("Đã xóa đơn hàng:", deletedOrder);

    return NextResponse.json(deletedOrder);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Không thể xóa đơn hàng",
        status: 500,
      },
      { status: 500 },
    );
  }
}
