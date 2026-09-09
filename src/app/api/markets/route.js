import { NextResponse } from "next/server";
import { marketApiSchema } from "@/lib/validations/market";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = marketApiSchema.safeParse(body);

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

    const newMarket = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    console.log("Đã tạo chợ:", newMarket);

    return NextResponse.json(newMarket, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Tạo chợ thất bại",
        status: 500,
      },
      { status: 500 },
    );
  }
}
