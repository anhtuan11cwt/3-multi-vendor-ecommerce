import { NextResponse } from "next/server";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import db from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const training = await db.training.findUnique({
      where: { id },
    });

    if (!training) {
      return NextResponse.json(
        {
          message: "Không tìm thấy bài đào tạo",
          status: 404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(training);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Không thể lấy bài đào tạo",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    const existingTraining = await db.training.findUnique({
      where: { id },
    });

    if (!existingTraining) {
      return NextResponse.json(
        { message: "Không tìm thấy bài đào tạo" },
        { status: 404 },
      );
    }

    const deletedTraining = await db.training.delete({ where: { id } });

    if (deletedTraining.imageUrl) {
      await deleteCloudinaryImage(deletedTraining.imageUrl);
    }

    console.log("Đã xóa bài đào tạo:", deletedTraining);

    return NextResponse.json(deletedTraining);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Không thể xóa bài đào tạo" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingTraining = await db.training.findUnique({
      where: { id },
    });

    if (!existingTraining) {
      return NextResponse.json(
        {
          message: "Không tìm thấy bài đào tạo",
          status: 404,
        },
        { status: 404 },
      );
    }

    const {
      title,
      slug,
      isActive,
      imageUrl,
      description,
      content,
      categoryId,
    } = body;

    const updatedTraining = await db.training.update({
      data: {
        categoryId: categoryId ?? existingTraining.categoryId,
        content: content ?? existingTraining.content,
        description: description ?? existingTraining.description,
        imageUrl: imageUrl ?? existingTraining.imageUrl,
        isActive: isActive ?? existingTraining.isActive,
        slug: slug || existingTraining.slug,
        title: title || existingTraining.title,
      },
      where: { id },
    });

    console.log("Đã cập nhật bài đào tạo:", updatedTraining);

    if (
      existingTraining.imageUrl &&
      existingTraining.imageUrl !== updatedTraining.imageUrl
    ) {
      await deleteCloudinaryImage(existingTraining.imageUrl);
    }

    return NextResponse.json(updatedTraining);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Cập nhật bài đào tạo thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
