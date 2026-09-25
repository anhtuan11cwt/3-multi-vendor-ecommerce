import { NextResponse } from "next/server";
import { deleteCloudinaryImages } from "@/lib/cloudinary";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    const farmer = await db.user.findUnique({
      include: { farmerProfile: true },
      where: { id },
    });

    if (!farmer) {
      return NextResponse.json(
        { message: "Không tìm thấy nông dân" },
        { status: 404 },
      );
    }

    return NextResponse.json(farmer);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể lấy nông dân" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    const existingUser = await db.user.findUnique({
      include: { farmerProfile: true },
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Không tìm thấy nông dân" },
        { status: 404 },
      );
    }

    const profile = existingUser.farmerProfile;
    const imageUrls = [];

    if (profile) {
      const products = await db.product.findMany({
        select: { imageUrl: true },
        where: { farmerId: profile.id },
      });

      await db.product.deleteMany({ where: { farmerId: profile.id } });

      const deletedProfile = await db.farmerProfile.delete({
        where: { id: profile.id },
      });

      imageUrls.push(deletedProfile.profileImageUrl);
      imageUrls.push(...products.map((product) => product.imageUrl));
    }

    const deletedUser = await db.user.delete({ where: { id } });

    await deleteCloudinaryImages(imageUrls);

    console.log("Đã xóa nông dân:", deletedUser.id);

    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể xóa nông dân" },
      { status: 500 },
    );
  }
}
