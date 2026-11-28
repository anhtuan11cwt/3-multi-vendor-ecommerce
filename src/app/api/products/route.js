import { NextResponse } from "next/server";
import db from "@/lib/db";
import { resolveFarmerId } from "@/lib/resolve-farmer-id";
import { productApiSchema } from "@/lib/validations/product";

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    const catId = searchParams.get("catId");
    const sort = searchParams.get("sort");
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    const where = {};
    if (catId) where.categoryId = catId;

    let products = await db.product.findMany({
      include: { farmer: { select: { userId: true } } },
      orderBy: { createdAt: "desc" },
      where,
    });

    // Giá hiển thị trên giao diện = salePrice (nếu có) hoặc productPrice
    const priceOf = (product) =>
      typeof product.salePrice === "number"
        ? product.salePrice
        : (product.productPrice ?? 0);

    const parsePrice = (value) => {
      if (value === null || value === "") return null;
      const parsed = Number.parseFloat(value);
      return Number.isNaN(parsed) ? null : parsed;
    };

    const minPrice = parsePrice(min);
    const maxPrice = parsePrice(max);

    if (minPrice !== null || maxPrice !== null) {
      products = products.filter((product) => {
        const price = priceOf(product);
        if (minPrice !== null && price < minPrice) return false;
        if (maxPrice !== null && price > maxPrice) return false;
        return true;
      });
    }

    if (sort === "asc" || sort === "desc") {
      const factor = sort === "asc" ? 1 : -1;
      products.sort((a, b) => (priceOf(a) - priceOf(b)) * factor);
    } else {
      // Mặc định: A to Z theo tiêu đề
      products.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", "vi"),
      );
    }

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
      productImages,
    } = parsed.data;

    const images = Array.isArray(productImages) ? productImages : [];
    const coverImage = images[0] || imageUrl || null;

    const resolvedFarmerId = await resolveFarmerId(farmerId);
    if (!resolvedFarmerId) {
      return NextResponse.json(
        {
          message: "Vui lòng chọn nông dân hợp lệ",
          status: 400,
        },
        { status: 400 },
      );
    }

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
        farmerId: resolvedFarmerId,
        imageUrl: coverImage,
        isActive,
        isWholesale,
        productCode: productCode || null,
        productImages: images,
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
