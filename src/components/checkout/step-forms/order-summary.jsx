"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { paymentMethodLabels } from "./payment-method-form";

export default function OrderSummary() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const checkoutFormData = useSelector(
    (state) => state.checkout.checkoutFormData,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0,
  );
  const shippingCost = Number(checkoutFormData.shippingCost ?? 0);
  const total = subtotal + shippingCost;

  const submitData = async () => {
    const payload = {
      ...checkoutFormData,
      items: cartItems.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        title: item.title,
      })),
      shippingCost,
      subtotal,
      total,
    };

    console.log("Toàn bộ dữ liệu thanh toán:", payload);

    try {
      const response = await fetch("/api/orders", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok) {
        console.error("Dữ liệu đơn hàng không hợp lệ:", result.errors);
        toast.error(result.message || "Dữ liệu đơn hàng không hợp lệ");
        return;
      }

      console.log("API phản hồi:", result);
      toast.success("Đơn hàng hợp lệ — sẵn sàng chuyển sang cổng thanh toán");
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      toast.error("Không thể kết nối máy chủ, vui lòng thử lại");
    }
  };

  return (
    <div>
      <h2 className="mb-4 font-semibold text-lg text-lime-600 dark:text-lime-400">
        Tóm tắt đơn hàng
      </h2>

      {cartItems.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <p className="mb-4 text-slate-500 text-sm dark:text-slate-400">
            Giỏ hàng của bạn đang trống.
          </p>
          <Link
            className="inline-flex rounded-lg bg-lime-600 px-5 py-2.5 font-medium text-sm text-white transition-colors hover:bg-lime-700"
            href="/cart"
          >
            Quay lại giỏ hàng
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {cartItems.map((item) => (
              <li className="flex items-center gap-3 py-3" key={item.id}>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  {item.imageUrl ? (
                    <Image
                      alt={item.title}
                      className="object-cover"
                      fill
                      sizes="48px"
                      src={item.imageUrl}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">
                        Không có ảnh
                      </span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-800 text-sm dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="text-slate-500 text-xs dark:text-slate-400">
                    Số lượng: {item.quantity}
                  </p>
                </div>

                <span className="whitespace-nowrap font-bold text-slate-800 text-sm dark:text-slate-100">
                  {(Number(item.price) * Number(item.quantity)).toLocaleString(
                    "vi-VN",
                  )}
                  đ
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-slate-200 border-t pt-4 dark:border-slate-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Tạm tính
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-100">
                {subtotal.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Phí vận chuyển
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-100">
                {shippingCost.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                Tổng cộng
              </span>
              <span className="font-bold text-lime-600 dark:text-lime-400">
                {total.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2 dark:border-slate-700 dark:bg-slate-800">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">
                Thông tin cá nhân
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {checkoutFormData.fullName}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {checkoutFormData.email}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {checkoutFormData.phone}
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">
                Giao hàng
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {checkoutFormData.streetAddress}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {checkoutFormData.province} — {checkoutFormData.ward}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Thanh toán:{" "}
                {paymentMethodLabels[checkoutFormData.paymentMethod] ??
                  checkoutFormData.paymentMethod}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-lime-600 px-6 py-3 font-medium text-sm text-white transition-colors hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700"
              onClick={submitData}
              type="button"
            >
              Tiến hành thanh toán
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
