import { NextResponse } from "next/server";
import { categoryApiSchema } from "@/lib/validations/category";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = categoryApiSchema.safeParse(body);

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

    const newCategory = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    console.log("Đã tạo danh mục:", newCategory);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo danh mục thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
