import { NextResponse } from "next/server";
import db from "@/lib/db";
import { farmerApiSchema } from "@/lib/validations/farmer";

export async function GET() {
  try {
    const farmers = await db.farmerProfile.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      data: farmers,
      message: "Lấy danh sách nông dân thành công",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể lấy danh sách nông dân",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = farmerApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          data: null,
          errors: parsed.error.flatten().fieldErrors,
          message: "Dữ liệu không hợp lệ",
          status: 400,
        },
        { status: 400 },
      );
    }

    const {
      userId,
      code,
      name,
      email,
      phone,
      physicalAddress,
      contactPerson,
      contactPersonPhone,
      paymentTerms,
      notes,
      isActive,
      landSize,
      mainCrop,
      products,
      profileImageUrl,
    } = parsed.data;

    let farmerUserId = userId;

    if (!farmerUserId) {
      const user = await db.user.create({
        data: {
          email: email || `${code}@farmer.local`,
          name,
          role: "FARMER",
        },
      });
      farmerUserId = user.id;
    }

    const newFarmer = await db.farmerProfile.create({
      data: {
        code,
        contactPerson: contactPerson || null,
        contactPersonPhone: contactPersonPhone || null,
        email: email || null,
        isActive: isActive ?? false,
        landSize: landSize ? Number(landSize) : null,
        mainCrop: mainCrop || null,
        name,
        notes: notes || null,
        paymentTerms: paymentTerms || null,
        phone,
        physicalAddress: physicalAddress || null,
        products,
        profileImageUrl: profileImageUrl || null,
        userId: farmerUserId,
      },
    });

    console.log("Đã tạo hồ sơ nông dân:", newFarmer.id);

    return NextResponse.json(
      {
        data: newFarmer,
        message: "Tạo hồ sơ nông dân thành công",
        status: 201,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể tạo hồ sơ nông dân",
        status: 500,
      },
      { status: 500 },
    );
  }
}
