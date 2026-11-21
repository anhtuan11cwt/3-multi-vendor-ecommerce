"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { clearCart } from "@/store/cartSlice";
import { resetCheckout, setCurrentStep } from "@/store/checkoutSlice";
import { paymentMethodLabels } from "./payment-method-form";

export default function OrderSummary() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { status: sessionStatus } = useSession();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentStep = useSelector((state) => state.checkout.currentStep);
  const checkoutFormData = useSelector(
    (state) => state.checkout.checkoutFormData,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0,
  );
  const shippingCost = Number(checkoutFormData.shippingCost ?? 0);
  const total = subtotal + shippingCost;

  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const submitData = async () => {
    if (sessionStatus !== "authenticated") {
      toast.error("Vui lòng đăng nhập để đặt hàng");
      return;
    }

    const payload = {
      ...checkoutFormData,
      items: cartItems.map((item) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.quantity,
        title: item.title,
        vendorId: item.vendorId,
      })),
      shippingCost,
      subtotal,
      total,
    };

    console.log("Toàn bộ dữ liệu thanh toán:", payload);

    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok) {
        console.error("Không thể tạo đơn hàng:", result.errors ?? result);
        toast.error(result.message || "Không thể tạo đơn hàng");
        return;
      }

      console.log("API phản hồi:", result);
      toast.success("Tạo đơn hàng thành công");
      dispatch(clearCart());
      dispatch(resetCheckout());
      setRedirecting(true);
      router.push(`/order-confirmation/${result.data.id}`);
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      toast.error("Không thể kết nối máy chủ, vui lòng thử lại");
    } finally {
      if (!redirecting) {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4 font-semibold text-lg text-lime-600 dark:text-lime-400">
        Tóm tắt đơn hàng
      </h2>

      {cartItems.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center sm:p-6 dark:border-slate-700 dark:bg-slate-800">
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
              <li
                className="flex items-center gap-2 py-3 sm:gap-3"
                key={item.id}
              >
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

                <span className="shrink-0 whitespace-nowrap font-bold text-slate-800 text-xs tabular-nums min-[360px]:text-sm dark:text-slate-100">
                  {(Number(item.price) * Number(item.quantity)).toLocaleString(
                    "vi-VN",
                  )}
                  đ
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-slate-200 border-t pt-4 text-xs min-[400px]:text-sm dark:border-slate-700">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">
                Tạm tính
              </span>
              <span className="shrink-0 font-medium text-slate-800 tabular-nums dark:text-slate-100">
                {subtotal.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">
                Phí vận chuyển
              </span>
              <span className="shrink-0 font-medium text-slate-800 tabular-nums dark:text-slate-100">
                {shippingCost.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                Tổng cộng
              </span>
              <span className="shrink-0 font-bold text-lime-600 tabular-nums dark:text-lime-400">
                {total.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm sm:grid-cols-2 sm:p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="min-w-0">
              <p className="font-medium text-slate-800 dark:text-slate-100">
                Thông tin cá nhân
              </p>
              <p className="break-words text-slate-500 dark:text-slate-400">
                {checkoutFormData.fullName}
              </p>
              <p className="break-words text-slate-500 dark:text-slate-400">
                {checkoutFormData.email}
              </p>
              <p className="break-words text-slate-500 dark:text-slate-400">
                {checkoutFormData.phone}
              </p>
            </div>
            <div className="min-w-0">
              <p className="font-medium text-slate-800 dark:text-slate-100">
                Giao hàng
              </p>
              <p className="break-words text-slate-500 dark:text-slate-400">
                {checkoutFormData.streetAddress}
              </p>
              <p className="break-words text-slate-500 dark:text-slate-400">
                {checkoutFormData.province} — {checkoutFormData.ward}
              </p>
              <p className="break-words text-slate-500 dark:text-slate-400">
                Thanh toán:{" "}
                {paymentMethodLabels[checkoutFormData.paymentMethod] ??
                  checkoutFormData.paymentMethod}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <button
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-3 text-center font-medium text-slate-600 text-sm transition-colors hover:border-slate-400 hover:text-slate-800 sm:w-auto sm:px-6 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
              disabled={loading}
              onClick={handlePrevious}
              type="button"
            >
              <ChevronLeft size={16} />
              Quay lại
            </button>

            <button
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-lime-600 px-3 py-3 text-center font-medium text-sm text-white transition-colors hover:bg-lime-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6 dark:bg-lime-600 dark:hover:bg-lime-700"
              disabled={loading || redirecting || sessionStatus === "loading"}
              onClick={submitData}
              type="button"
            >
              {redirecting
                ? "Đơn hàng đã tạo, đang chuyển hướng..."
                : loading
                  ? "Đang xử lý, vui lòng chờ..."
                  : sessionStatus === "loading"
                    ? "Đang tải phiên đăng nhập..."
                    : sessionStatus === "unauthenticated"
                      ? "Vui lòng đăng nhập để đặt hàng"
                      : "Tiến hành thanh toán"}
              {!loading && !redirecting && <ChevronRight size={16} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
