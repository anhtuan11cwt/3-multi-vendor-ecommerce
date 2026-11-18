"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-lg px-1 py-8 text-center sm:py-12">
      <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-lime-100 text-lime-600 sm:mb-6 sm:h-16 sm:w-16 dark:bg-lime-950 dark:text-lime-400">
        <CheckCircle2 size={32} />
      </span>

      <h1 className="mb-3 font-bold text-lg text-slate-800 sm:text-2xl dark:text-slate-100">
        Đơn hàng đã được xác nhận
      </h1>

      <p className="mb-2 text-slate-600 text-sm dark:text-slate-400">
        Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!
      </p>

      <p className="mb-6 break-words text-slate-500 text-sm sm:mb-8 dark:text-slate-400">
        Chúng tôi đã gửi hóa đơn qua email. Vui lòng kiểm tra hộp thư của bạn.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <Link
          className="w-full rounded-lg bg-lime-600 px-4 py-3 font-medium text-sm text-white transition-colors hover:bg-lime-700 sm:w-auto sm:px-6"
          href="/"
        >
          Tiếp tục mua sắm
        </Link>
        <Link
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-600 text-sm transition-colors hover:border-slate-400 hover:text-slate-800 sm:w-auto sm:px-6 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
          href="/cart"
        >
          Xem giỏ hàng
        </Link>
      </div>
    </div>
  );
}
