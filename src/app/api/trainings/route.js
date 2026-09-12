import { NextResponse } from "next/server";
import db from "@/lib/db";
import { trainingApiSchema } from "@/lib/validations/training";

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

    const { imageUrl, ...rest } = parsed.data;

    const newTraining = await db.training.create({
      data: {
        ...rest,
        imageUrl: imageUrl || null,
      },
    });

    console.log("Đã tạo training:", newTraining);

    return NextResponse.json(newTraining, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo training thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
