import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          data: null,
          message: "Không tìm thấy người dùng",
          status: 404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: user,
      message: "Lấy người dùng thành công",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể lấy người dùng",
        status: 500,
      },
      { status: 500 },
    );
  }
}
