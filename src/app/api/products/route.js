import { NextResponse } from "next/server";
import { productApiSchema } from "@/lib/validations/product";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = productApiSchema.safeParse(body);

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

    const newProduct = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    console.log("Đã tạo sản phẩm:", newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo sản phẩm thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    console.log("Cập nhật sản phẩm:", { id, ...updateData });

    return NextResponse.json(
      { id, ...updateData, updatedAt: new Date().toISOString() },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Cập nhật sản phẩm thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
