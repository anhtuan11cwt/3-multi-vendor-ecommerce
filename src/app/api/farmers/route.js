import { NextResponse } from "next/server";
import db from "@/lib/db";
import { farmerApiSchema } from "@/lib/validations/farmer";

export async function GET() {
  try {
    const farmers = await db.farmerProfile.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(farmers);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

    const { code, contactPersonPhone, isActive, ...profileData } = parsed.data;

    const user = await db.user.create({
      data: {
        email: profileData.email || `${code}@farmer.local`,
        name: profileData.name,
        role: "FARMER",
      },
    });

    const newFarmer = await db.farmerProfile.create({
      data: {
        ...profileData,
        code,
        isActive: isActive ?? false,
        userId: user.id,
      },
    });

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
