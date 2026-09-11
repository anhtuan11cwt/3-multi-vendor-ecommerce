import { NextResponse } from "next/server";
import { staffApiSchema } from "@/lib/validations/staff";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = staffApiSchema.safeParse(body);

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

    const newStaff = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    console.log("Đã tạo nhân viên:", newStaff);

    return NextResponse.json(newStaff, { status: 201 });
  } catch (error) {
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
