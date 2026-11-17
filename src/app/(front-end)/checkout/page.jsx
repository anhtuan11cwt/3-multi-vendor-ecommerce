"use client";

import CartBanner from "@/components/checkout/cart-banner";
import StepForm from "@/components/checkout/step-form";
import Steps from "@/components/checkout/steps";

const steps = [
  { number: 1, title: "Thông tin cá nhân" },
  { number: 2, title: "Thông tin giao hàng" },
  { number: 3, title: "Phương thức thanh toán" },
  { number: 4, title: "Tóm tắt đơn hàng" },
];

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="mb-6 font-bold text-slate-800 text-xl sm:text-2xl dark:text-slate-100">
        Thanh toán
      </h1>

      <Steps steps={steps} />

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-700 dark:bg-slate-800">
        <CartBanner />
        <StepForm />
      </div>
    </div>
  );
}
