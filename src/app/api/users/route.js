import { render } from "@react-email/render";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import EmailTemplate from "@/components/EmailTemplate";
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

    const rawToken = uuidv4();
    const encodedToken = Buffer.from(rawToken).toString("base64url");

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        verificationToken: encodedToken,
      },
    });

    console.log("Đã tạo người dùng mới:", newUser.id);

    if (role === "FARMER") {
      try {
        const redirectUrl = `/onboarding/${newUser.id}?token=${encodedToken}`;
        const transporter = nodemailer.createTransport({
          auth: {
            pass: process.env.GMAIL_APP_PASSWORD,
            user: process.env.GMAIL_USER,
          },
          service: "gmail",
        });
        const html = await render(
          EmailTemplate({
            linkText: "Xác thực tài khoản",
            name,
            redirectUrl,
          }),
        );
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
          html,
          subject: "Xác thực tài khoản",
          to: email,
        });
        console.log("Đã gửi email xác thực:", newUser.id);
      } catch (mailError) {
        console.log("Không thể gửi email xác thực:", mailError.message);
      }
    }

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
        emailVerified: true,
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
