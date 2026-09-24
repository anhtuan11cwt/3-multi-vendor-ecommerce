import { NextResponse } from "next/server";
import { deleteCloudinaryImages } from "@/lib/cloudinary";
import db from "@/lib/db";

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    const existingFarmer = await db.farmerProfile.findUnique({
      where: { id },
    });

    if (!existingFarmer) {
      return NextResponse.json(
        { message: "Không tìm thấy nông dân" },
        { status: 404 },
      );
    }

    const products = await db.product.findMany({
      select: { imageUrl: true },
      where: { farmerId: id },
    });

    await db.product.deleteMany({ where: { farmerId: id } });

    const deletedFarmer = await db.farmerProfile.delete({ where: { id } });

    await deleteCloudinaryImages([
      deletedFarmer.profileImageUrl,
      ...products.map((product) => product.imageUrl),
    ]);

    console.log("Đã xóa nông dân:", deletedFarmer);

    return NextResponse.json(deletedFarmer);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể xóa nông dân" },
      { status: 500 },
    );
  }
}
