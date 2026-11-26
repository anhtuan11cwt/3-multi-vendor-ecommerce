import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const customers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        createdAt: true,
        email: true,
        id: true,
        image: true,
        name: true,
        profile: true,
        role: true,
      },
      where: { role: "USER" },
    });

    return NextResponse.json({
      data: customers,
      message: "Lấy danh sách khách hàng thành công",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể lấy danh sách khách hàng",
        status: 500,
      },
      { status: 500 },
    );
  }
}
