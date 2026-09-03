import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-extrabold text-7xl tracking-tight lg:text-9xl">
        404
      </h1>
      <p className="font-bold text-2xl tracking-tight">Không tìm thấy trang.</p>
      <p className="text-muted-foreground">
        Xin lỗi, chúng tôi không thể tìm thấy trang này.
      </p>
      <Link className={buttonVariants()} href="/">
        Quay lại trang chủ
      </Link>
    </div>
  );
}
