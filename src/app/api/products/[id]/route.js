import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Không tìm thấy sản phẩm",
          status: 404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Không thể lấy sản phẩm",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          message: "Không tìm thấy sản phẩm",
          status: 404,
        },
        { status: 404 },
      );
    }

    const {
      title,
      slug,
      description,
      sku,
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
    } = body;

    const updatedProduct = await db.product.update({
      data: {
        barcode: barcode ?? existingProduct.barcode,
        categoryId: categoryId || existingProduct.categoryId,
        description: description ?? existingProduct.description,
        farmerId: farmerId || existingProduct.farmerId,
        imageUrl: imageUrl ?? existingProduct.imageUrl,
        isActive: isActive ?? existingProduct.isActive,
        isWholesale: isWholesale ?? existingProduct.isWholesale,
        productCode: productCode ?? existingProduct.productCode,
        productPrice: productPrice
          ? Number.parseFloat(productPrice)
          : existingProduct.productPrice,
        productStock: productStock
          ? Number.parseInt(productStock, 10)
          : existingProduct.productStock,
        quantity: quantity
          ? Number.parseInt(quantity, 10)
          : existingProduct.quantity,
        salePrice: salePrice
          ? Number.parseFloat(salePrice)
          : existingProduct.salePrice,
        sku: sku ?? existingProduct.sku,
        slug: slug || existingProduct.slug,
        tags: tags || existingProduct.tags,
        title: title || existingProduct.title,
        unit: unit ?? existingProduct.unit,
        wholesalePrice: wholesalePrice
          ? Number.parseFloat(wholesalePrice)
          : existingProduct.wholesalePrice,
        wholesaleQuantity: wholesaleQuantity
          ? Number.parseInt(wholesaleQuantity, 10)
          : existingProduct.wholesaleQuantity,
      },
      where: { id },
    });

    console.log("Đã cập nhật sản phẩm:", updatedProduct);

    return NextResponse.json(updatedProduct);
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
