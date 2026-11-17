"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, CreditCard, Handshake } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { paymentMethodSchema } from "@/lib/validations/checkout";
import { setCurrentStep, updateCheckoutFormData } from "@/store/checkoutSlice";
import { errorClass } from "../field-styles";
import NavButtons from "../nav-buttons";

const paymentOptions = [
  {
    description: "Trực tiếp bằng tiền mặt khi nhận hàng",
    icon: Handshake,
    id: "payment-cod",
    label: "Thanh toán khi nhận hàng",
    value: "cod",
  },
  {
    description: "Visa, Mastercard, JCB...",
    icon: CreditCard,
    id: "payment-credit-card",
    label: "Thẻ tín dụng",
    value: "credit-card",
  },
];

export const paymentMethodLabels = Object.fromEntries(
  paymentOptions.map((option) => [option.value, option.label]),
);

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.checkout.currentStep);
  const existingFormData = useSelector(
    (state) => state.checkout.checkoutFormData,
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentMethod: existingFormData.paymentMethod ?? "",
    },
    resolver: zodResolver(paymentMethodSchema),
  });

  const paymentMethod = useWatch({ control, name: "paymentMethod" }) ?? "";

  const processData = (data) => {
    console.log("Bước 3 — Phương thức thanh toán:", data);
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form noValidate onSubmit={handleSubmit(processData)}>
      <h2 className="mb-4 font-semibold text-lg text-lime-600 dark:text-lime-400">
        Phương thức thanh toán
      </h2>

      <p className="mb-3 font-medium text-slate-700 text-sm dark:text-slate-300">
        Bạn muốn thanh toán bằng cách nào?
      </p>

      <div className="flex flex-col gap-3">
        {paymentOptions.map((option) => {
          const isSelected = paymentMethod === option.value;
          const Icon = option.icon;

          return (
            <label
              className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors sm:gap-3 sm:p-4 ${
                isSelected
                  ? "border-lime-500 bg-lime-50 dark:bg-lime-950/40"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500"
              }`}
              key={option.id}
            >
              <input
                checked={isSelected}
                className="sr-only"
                id={option.id}
                type="radio"
                {...register("paymentMethod")}
                value={option.value}
              />
              <Icon
                className="shrink-0 text-slate-500 dark:text-slate-400"
                size={20}
              />
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-slate-800 text-sm dark:text-slate-100">
                  {option.label}
                </span>
                <span className="block text-slate-500 text-xs dark:text-slate-400">
                  {option.description}
                </span>
              </span>
              <Circle
                className={`shrink-0 ${
                  isSelected
                    ? "fill-lime-500 text-lime-500"
                    : "text-slate-300 dark:text-slate-600"
                }`}
                size={18}
              />
            </label>
          );
        })}
      </div>

      {errors.paymentMethod && (
        <p className={errorClass}>{errors.paymentMethod.message}</p>
      )}

      <NavButtons />
    </form>
  );
}
