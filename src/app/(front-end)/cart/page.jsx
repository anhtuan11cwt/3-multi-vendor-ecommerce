"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/front-end/Breadcrumb";
import CartItem from "@/components/front-end/CartItem";
import { useAppSelector } from "@/store/hooks";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = cartItems.length > 0 ? 15000 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div>
        <Breadcrumb />
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingCart className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
          <h2 className="mb-2 font-bold text-2xl text-slate-800 dark:text-slate-100">
            Giỏ hàng trống
          </h2>
          <p className="mb-6 text-slate-500 dark:text-slate-400">
            Bạn chưa thêm sản phẩm nào vào giỏ hàng.
          </p>
          <Link
            className="rounded-lg bg-lime-600 px-6 py-3 font-medium text-white transition-colors hover:bg-lime-700"
            href="/"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb />

      <h1 className="mb-6 font-bold text-2xl text-slate-800 dark:text-slate-100">
        Giỏ hàng của bạn
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: cart items */}
        <div className="lg:col-span-8">
          {/* Table - desktop */}
          <div className="hidden rounded-xl border border-slate-200 bg-white p-4 lg:block dark:border-slate-700 dark:bg-slate-800">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-slate-200 border-b dark:border-slate-700">
                  <th className="pb-3 text-left font-semibold text-slate-400 text-xs uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="w-40 pb-3 text-center font-semibold text-slate-400 text-xs uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="w-28 pb-3 text-right font-semibold text-slate-400 text-xs uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="w-10 pb-3" />
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - mobile */}
          <div className="flex flex-col gap-3 lg:hidden">
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} mobile />
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              placeholder="Nhập mã giảm giá"
              type="text"
            />
            <button
              className="shrink-0 rounded-lg bg-orange-500 px-6 py-2.5 font-medium text-sm text-white transition-colors hover:bg-orange-600"
              type="button"
            >
              Áp dụng
            </button>
          </div>
        </div>

        {/* Right: order summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-4 font-semibold text-lg text-slate-800 dark:text-slate-100">
              Tổng đơn hàng
            </h2>

            <div className="space-y-3 border-slate-200 border-b pb-4 dark:border-slate-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Tạm tính
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-100">
                  {subtotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Thuế</span>
                <span className="font-medium text-slate-800 dark:text-slate-100">
                  {tax.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Phí vận chuyển
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-100">
                  {shipping.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                Tổng cộng
              </span>
              <span className="font-bold text-lg text-lime-600 dark:text-lime-400">
                {total.toLocaleString("vi-VN")}đ
              </span>
            </div>

            <Link
              className="block w-full rounded-lg bg-lime-600 py-3 text-center font-medium text-white transition-colors hover:bg-lime-700"
              href="/checkout"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
