import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import EmailTemplate from "@/components/EmailTemplate";
import db from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validations/user";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

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

    const { email } = parsed.data;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          data: null,
          message: "Không tìm thấy tài khoản với email này",
          status: 404,
        },
        { status: 404 },
      );
    }

    const token = uuidv4();
    const redirectUrl = `/reset-password?id=${user.id}&token=${token}`;
    const description =
      "Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu. Vui lòng bấm vào nút bên dưới để đặt lại mật khẩu:";
    const subject = "Khôi phục mật khẩu";

    try {
      const transporter = nodemailer.createTransport({
        auth: {
          pass: process.env.GMAIL_APP_PASSWORD,
          user: process.env.GMAIL_USER,
        },
        service: "gmail",
      });
      const html = await render(
        EmailTemplate({
          description,
          linkText: "Đặt lại mật khẩu",
          name: user.name,
          redirectUrl,
          subject,
        }),
      );
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
        html,
        subject,
        to: email,
      });
    } catch (mailError) {
      console.log("Không thể gửi email đặt lại mật khẩu:", mailError.message);
      return NextResponse.json(
        {
          data: null,
          message: "Không thể gửi email đặt lại mật khẩu",
          status: 500,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: { email },
      message: "Đã gửi email đặt lại mật khẩu",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể xử lý yêu cầu quên mật khẩu",
        status: 500,
      },
      { status: 500 },
    );
  }
}
