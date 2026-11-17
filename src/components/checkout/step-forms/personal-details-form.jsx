"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { personalDetailsSchema } from "@/lib/validations/checkout";
import { setCurrentStep, updateCheckoutFormData } from "@/store/checkoutSlice";
import { errorClass, inputClass, labelClass } from "../field-styles";
import NavButtons from "../nav-buttons";

export default function PersonalDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.checkout.currentStep);
  const existingFormData = useSelector(
    (state) => state.checkout.checkoutFormData,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: existingFormData,
    resolver: zodResolver(personalDetailsSchema),
  });

  const { onChange: onPhoneChange, ...phoneField } = register("phone");

  const handlePhoneChange = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 10);
    onPhoneChange(event);
  };

  const processData = (data) => {
    console.log("Bước 1 — Thông tin cá nhân:", data);
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form noValidate onSubmit={handleSubmit(processData)}>
      <h2 className="mb-4 font-semibold text-lg text-lime-600 dark:text-lime-400">
        Thông tin cá nhân
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="fullName">
            Họ và tên
          </label>
          <input
            aria-invalid={Boolean(errors.fullName)}
            className={inputClass}
            id="fullName"
            placeholder="Nguyễn Văn A"
            type="text"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className={errorClass}>{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
            id="email"
            placeholder="ten@email.com"
            type="email"
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Số điện thoại
          </label>
          <input
            {...phoneField}
            aria-invalid={Boolean(errors.phone)}
            className={inputClass}
            id="phone"
            inputMode="numeric"
            maxLength={10}
            onChange={handlePhoneChange}
            placeholder="0912345678"
            type="tel"
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <NavButtons />
    </form>
  );
}
