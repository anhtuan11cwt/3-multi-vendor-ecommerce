import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { updatePasswordSchema } from "@/lib/validations/user";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = updatePasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          data: null,
          errors: parsed.error.flatten().fieldErrors,
          message: "Dữ liệu không hợp lệ",
          status: 400,
        },
        { status: 400 },
      );
    }

    const { password, id } = parsed.data;

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          data: null,
          message: "Không tìm thấy tài khoản",
          status: 404,
        },
        { status: 404 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      data: { password: hashedPassword },
      where: { id },
    });

    return NextResponse.json({
      data: { id },
      message: "Cập nhật mật khẩu thành công",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể cập nhật mật khẩu",
        status: 500,
      },
      { status: 500 },
    );
  }
}
