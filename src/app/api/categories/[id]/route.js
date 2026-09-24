import { NextResponse } from "next/server";
import { deleteCloudinaryImages } from "@/lib/cloudinary";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const category = await db.category.findUnique({
      include: { products: true },
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Không tìm thấy danh mục" },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    const existingCategory = await db.category.findUnique({ where: { id } });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Không tìm thấy danh mục" },
        { status: 404 },
      );
    }

    const trainingCount = await db.training.count({
      where: { categoryId: id },
    });

    if (trainingCount > 0) {
      return NextResponse.json(
        {
          message:
            "Danh mục đang được liên kết với khóa đào tạo. Hãy gỡ liên kết trước khi xóa.",
        },
        { status: 409 },
      );
    }

    const products = await db.product.findMany({
      select: { imageUrl: true },
      where: { categoryId: id },
    });

    await db.product.deleteMany({ where: { categoryId: id } });

    const deletedCategory = await db.category.delete({ where: { id } });

    await deleteCloudinaryImages([
      deletedCategory.imageUrl,
      ...products.map((product) => product.imageUrl),
    ]);

    console.log("Đã xóa danh mục:", deletedCategory);

    return NextResponse.json(deletedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể xóa danh mục" },
      { status: 500 },
    );
  }
}
