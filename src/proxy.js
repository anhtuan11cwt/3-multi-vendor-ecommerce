import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Các đường dẫn cần đăng nhập trước khi truy cập.
// dashboard/:path* bảo vệ toàn bộ trang con của dashboard,
// có thể mở rộng thêm API route ở đây sau này.
export async function proxy(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", request.url);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/checkout"],
};
