import { NextResponse } from "next/server";
import { farmerApiSchema } from "@/lib/validations/farmer";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = farmerApiSchema.safeParse(body);

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

    const newFarmer = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    console.log("Đã tạo nông dân:", newFarmer);

    return NextResponse.json(newFarmer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo nông dân thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
