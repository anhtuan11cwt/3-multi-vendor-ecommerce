import { NextResponse } from "next/server";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const banner = await db.banner.findUnique({ where: { id } });

    if (!banner) {
      return NextResponse.json(
        { message: "Không tìm thấy banner" },
        { status: 404 },
      );
    }

    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể lấy banner" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    const existingBanner = await db.banner.findUnique({ where: { id } });

    if (!existingBanner) {
      return NextResponse.json(
        { message: "Không tìm thấy banner" },
        { status: 404 },
      );
    }

    const deletedBanner = await db.banner.delete({ where: { id } });

    await deleteCloudinaryImage(deletedBanner.imageUrl);

    console.log("Đã xóa banner:", deletedBanner);

    return NextResponse.json(deletedBanner);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể xóa banner" },
      { status: 500 },
    );
  }
}
