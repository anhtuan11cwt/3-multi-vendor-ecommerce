import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { registerSchema } from "@/lib/validations/user";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

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

    const { name, email, password, role } = parsed.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "Email đã được sử dụng",
          status: 409,
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });

    console.log("Đã tạo người dùng mới:", newUser.id);

    return NextResponse.json(
      {
        data: newUser,
        message: "Tạo tài khoản thành công",
        status: 201,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể tạo tài khoản",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        createdAt: true,
        email: true,
        id: true,
        image: true,
        name: true,
        role: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({
      data: users,
      message: "Lấy danh sách người dùng thành công",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể lấy danh sách người dùng",
        status: 500,
      },
      { status: 500 },
    );
  }
}
