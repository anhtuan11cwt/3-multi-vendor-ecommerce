import { NextResponse } from "next/server";
import db from "@/lib/db";
import { productApiSchema } from "@/lib/validations/product";

export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

    const { SKU, ...rest } = parsed.data;

    const slug = rest.slug;

    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          message: "Sản phẩm đã tồn tại",
          status: 409,
        },
        { status: 409 },
      );
    }

    const newProduct = await db.product.create({
      data: {
        ...rest,
        sku: SKU || null,
      },
    });

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
