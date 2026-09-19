import { NextResponse } from "next/server";
import db from "@/lib/db";
import { categoryApiSchema } from "@/lib/validations/category";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: { products: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

    const { slug } = parsed.data;

    const existingCategory = await db.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          message: "Danh mục đã tồn tại",
          status: 409,
        },
        { status: 409 },
      );
    }

    const newCategory = await db.category.create({
      data: parsed.data,
    });

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
