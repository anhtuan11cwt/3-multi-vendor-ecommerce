import { NextResponse } from "next/server";
import db from "@/lib/db";
import { trainingApiSchema } from "@/lib/validations/training";

export async function GET() {
  try {
    const trainings = await db.training.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(trainings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = trainingApiSchema.safeParse(body);

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

    let { title, slug, isActive, imageUrl, description, content, categoryId } =
      parsed.data;

    let existingTraining = await db.training.findUnique({
      where: { slug },
    });

    let counter = 1;
    const baseSlug = slug;
    while (existingTraining) {
      slug = `${baseSlug}-${counter}`;
      existingTraining = await db.training.findUnique({
        where: { slug },
      });
      counter++;
    }

    const newTraining = await db.training.create({
      data: {
        categoryId: categoryId || null,
        content: content || null,
        description: description || null,
        imageUrl: imageUrl || null,
        isActive,
        slug,
        title,
      },
    });

    console.log("Đã tạo bài đào tạo:", newTraining);

    return NextResponse.json(newTraining, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo bài đào tạo thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
