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

    let {
      SKU,
      title,
      slug,
      description,
      barcode,
      farmerId,
      imageUrl,
      isActive,
      isWholesale,
      productCode,
      productPrice,
      salePrice,
      tags,
      unit,
      wholesalePrice,
      wholesaleQuantity,
      productStock,
      quantity,
      categoryId,
    } = parsed.data;

    let existingProduct = await db.product.findUnique({
      where: { slug },
    });

    let counter = 1;
    const baseSlug = slug;
    while (existingProduct) {
      slug = `${baseSlug}-${counter}`;
      existingProduct = await db.product.findUnique({
        where: { slug },
      });
      counter++;
    }

    const newProduct = await db.product.create({
      data: {
        barcode: barcode || null,
        categoryId,
        description: description || null,
        farmerId,
        imageUrl: imageUrl || null,
        isActive,
        isWholesale,
        productCode: productCode || null,
        productPrice: Number.parseFloat(productPrice),
        productStock: productStock ? Number.parseInt(productStock, 10) : null,
        quantity: quantity ? Number.parseInt(quantity, 10) : 1,
        salePrice: salePrice ? Number.parseFloat(salePrice) : null,
        sku: SKU || null,
        slug,
        tags: tags || [],
        title,
        unit: unit || null,
        wholesalePrice: wholesalePrice
          ? Number.parseFloat(wholesalePrice)
          : null,
        wholesaleQuantity: wholesaleQuantity
          ? Number.parseInt(wholesaleQuantity, 10)
          : null,
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
