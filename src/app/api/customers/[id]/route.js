import { NextResponse } from "next/server";
import { deleteCloudinaryImages } from "@/lib/cloudinary";
import db from "@/lib/db";

const PROFILE_FIELDS = [
  "address",
  "dateOfBirth",
  "phone",
  "profileImage",
  "province",
  "provinceCode",
  "streetAddress",
  "ward",
  "wardCode",
];

function pickProfileFields(payload = {}) {
  const data = {};

  for (const field of PROFILE_FIELDS) {
    if (payload[field] === undefined) continue;

    if (field === "dateOfBirth") {
      const value = payload[field];
      data.dateOfBirth = value ? new Date(value) : null;
      continue;
    }

    data[field] = payload[field];
  }

  return data;
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    const customer = await db.user.findUnique({
      select: {
        createdAt: true,
        email: true,
        id: true,
        image: true,
        name: true,
        profile: true,
        role: true,
      },
      where: { id },
    });

    if (!customer) {
      return NextResponse.json(
        { data: null, message: "Không tìm thấy khách hàng", status: 404 },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: customer,
      message: "Lấy thông tin khách hàng thành công",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể lấy khách hàng",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = pickProfileFields(body.profile ?? body);

    const existingUser = await db.user.findUnique({ where: { id } });

    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: "Không tìm thấy khách hàng", status: 404 },
        { status: 404 },
      );
    }

    const profile = await db.userProfile.upsert({
      create: { userId: id, ...data },
      update: data,
      where: { userId: id },
    });

    console.log("Đã cập nhật hồ sơ khách hàng:", profile.id);

    return NextResponse.json({
      data: profile,
      message: "Cập nhật khách hàng thành công",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể cập nhật khách hàng",
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    const existingUser = await db.user.findUnique({
      include: { profile: true },
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: "Không tìm thấy khách hàng", status: 404 },
        { status: 404 },
      );
    }

    const orderCount = await db.order.count({ where: { userId: id } });

    if (orderCount > 0) {
      return NextResponse.json(
        {
          data: null,
          message: "Không thể xóa khách hàng đã có đơn hàng",
          status: 400,
        },
        { status: 400 },
      );
    }

    const profile = existingUser.profile;
    const imageUrls = [];

    if (profile) {
      if (profile.profileImage) imageUrls.push(profile.profileImage);
      await db.userProfile.delete({ where: { id: profile.id } });
    }

    const deletedUser = await db.user.delete({ where: { id } });

    await deleteCloudinaryImages(imageUrls);

    console.log("Đã xóa khách hàng:", deletedUser.id);

    return NextResponse.json({
      data: deletedUser,
      message: "Xóa khách hàng thành công",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        message: "Không thể xóa khách hàng",
        status: 500,
      },
      { status: 500 },
    );
  }
}
