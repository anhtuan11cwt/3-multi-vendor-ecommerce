import { NextResponse } from "next/server";
import db from "@/lib/db";
import { generateISOFormattedDate } from "@/lib/generate-iso-formatted-date";
import { staffApiSchema } from "@/lib/validations/staff";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Dữ liệu yêu cầu nhân viên:", body);
    const parsed = staffApiSchema.safeParse(body);
    console.log("Kết quả phân tích:", parsed.success, parsed.error?.flatten());

    if (!parsed.success) {
      return NextResponse.json(
        {
          errors: parsed.error.flatten().fieldErrors,
          message: "Dữ liệu không hợp lệ",
          status: 400,
        },
        { status: 400 },
      );
    }

    const { dob, fullName, ...rest } = parsed.data;

    const newStaff = await db.staff.create({
      data: {
        ...rest,
        dob: dob ? generateISOFormattedDate(dob) : null,
        name: fullName,
      },
    });

    console.log("Đã tạo nhân viên:", newStaff);

    return NextResponse.json(newStaff, { status: 201 });
  } catch (error) {
    console.error("Lỗi tạo nhân viên:", error);
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo nhân viên thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
