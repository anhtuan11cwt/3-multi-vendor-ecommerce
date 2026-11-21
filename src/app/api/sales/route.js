import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const sales = await db.sale.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        data: sales,
        message: "Lấy danh sách doanh số thành công",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi lấy danh sách doanh số:", error);
    return NextResponse.json(
      {
        error: error.message,
        message: "Lấy danh sách doanh số thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
