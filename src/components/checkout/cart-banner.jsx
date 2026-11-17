"use client";

import { Pencil, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function CartBanner() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0,
  );

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/40">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600 dark:bg-lime-950 dark:text-lime-400">
          <ShoppingBag size={20} />
        </span>
        <div>
          <p className="font-medium text-slate-800 text-sm dark:text-slate-100">
            Giỏ hàng của bạn
          </p>
          <p className="text-slate-500 text-xs dark:text-slate-400">
            {totalQuantity} sản phẩm trong giỏ
          </p>
        </div>
      </div>

      <Link
        className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 font-medium text-slate-600 text-xs transition-colors hover:border-lime-500 hover:text-lime-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-lime-400"
        href="/cart"
      >
        <Pencil size={14} />
        Chỉnh sửa giỏ hàng
      </Link>
    </div>
  );
}
