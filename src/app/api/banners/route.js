import { NextResponse } from "next/server";
import { bannerApiSchema } from "@/lib/validations/banner";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = bannerApiSchema.safeParse(body);

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

    const newBanner = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    console.log("Đã tạo banner:", newBanner);

    return NextResponse.json(newBanner, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo banner thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
