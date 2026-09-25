import { NextResponse } from "next/server";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const market = await db.market.findUnique({
      where: { id },
    });

    if (!market) {
      return NextResponse.json(
        {
          message: "Không tìm thấy chợ",
          status: 404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(market);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Không thể lấy chợ",
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

    const existingMarket = await db.market.findUnique({
      where: { id },
    });

    if (!existingMarket) {
      return NextResponse.json(
        {
          message: "Không tìm thấy chợ",
          status: 404,
        },
        { status: 404 },
      );
    }

    const { title, slug, logoUrl, isActive, description, categoryIds } = body;

    const updatedMarket = await db.market.update({
      data: {
        categoryIds: categoryIds || existingMarket.categoryIds,
        description: description ?? existingMarket.description,
        imageUrl: logoUrl ?? existingMarket.imageUrl,
        isActive: isActive ?? existingMarket.isActive,
        slug: slug || existingMarket.slug,
        title: title || existingMarket.title,
      },
      where: { id },
    });

    console.log("Đã cập nhật chợ:", updatedMarket);

    if (
      existingMarket.imageUrl &&
      existingMarket.imageUrl !== updatedMarket.imageUrl
    ) {
      await deleteCloudinaryImage(existingMarket.imageUrl);
    }

    return NextResponse.json(updatedMarket);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Cập nhật chợ thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
