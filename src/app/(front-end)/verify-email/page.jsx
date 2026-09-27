import { Info } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="mx-auto mt-4 max-w-3xl sm:mt-8">
      <div
        className="flex gap-2 rounded-lg border border-green-300 bg-green-50 p-3 text-green-800 sm:gap-3 sm:p-4 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
        role="alert"
      >
        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
          <Info className="h-5 w-5" />
        </div>
        <div className="min-w-0 break-words text-sm">
          <p className="font-semibold">Đã gửi email — Xác thực tài khoản</p>
          <p className="mt-1">
            Cảm ơn bạn đã tạo tài khoản cùng chúng tôi. Chúng tôi đã gửi một
            email để xác thực tài khoản của bạn. Vui lòng kiểm tra hộp thư đến
            và bấm vào liên kết trong email để hoàn tất quá trình đăng ký.
          </p>
        </div>
      </div>
    </div>
  );
}
