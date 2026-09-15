import { NextResponse } from "next/server";
import db from "@/lib/db";
import { marketApiSchema } from "@/lib/validations/market";

export async function GET() {
  try {
    const markets = await db.market.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(markets);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = marketApiSchema.safeParse(body);

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

    let { title, slug, logoUrl, isActive, description, categoryIds } =
      parsed.data;

    let existingMarket = await db.market.findUnique({
      where: { slug },
    });

    let counter = 1;
    const baseSlug = slug;
    while (existingMarket) {
      slug = `${baseSlug}-${counter}`;
      existingMarket = await db.market.findUnique({
        where: { slug },
      });
      counter++;
    }

    const newMarket = await db.market.create({
      data: {
        categoryIds: categoryIds || [],
        description: description || null,
        imageUrl: logoUrl || null,
        isActive,
        slug,
        title,
      },
    });

    console.log("Đã tạo chợ:", newMarket);

    return NextResponse.json(newMarket, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo chợ thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
