"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, Truck } from "lucide-react";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import addressData from "vietnam-address-database";
import {
  shippingDetailsSchema,
  shippingOptions,
} from "@/lib/validations/checkout";
import { setCurrentStep, updateCheckoutFormData } from "@/store/checkoutSlice";
import { errorClass, inputClass, labelClass } from "../field-styles";
import NavButtons from "../nav-buttons";

const provinces = addressData.find((d) => d.name === "provinces")?.data || [];
const allWards = addressData.find((d) => d.name === "wards")?.data || [];

export default function ShippingDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.checkout.currentStep);
  const existingFormData = useSelector(
    (state) => state.checkout.checkoutFormData,
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData,
      shippingCost: String(
        existingFormData.shippingCost ?? shippingOptions[0].cost,
      ),
    },
    resolver: zodResolver(shippingDetailsSchema),
  });

  const provinceCode = useWatch({ control, name: "provinceCode" }) ?? "";
  const shippingCost = useWatch({ control, name: "shippingCost" });

  const wards = useMemo(() => {
    if (!provinceCode) return [];
    return allWards.filter((w) => w.province_code === provinceCode);
  }, [provinceCode]);

  const processData = (data) => {
    const provinceName =
      provinces.find((p) => p.province_code === data.provinceCode)?.name || "";
    const wardName =
      allWards.find((w) => w.ward_code === data.wardCode)?.name || "";

    const payload = {
      ...data,
      province: provinceName,
      shippingCost: Number(data.shippingCost),
      ward: wardName,
    };
    console.log("Bước 2 — Thông tin giao hàng:", payload);
    dispatch(updateCheckoutFormData(payload));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form noValidate onSubmit={handleSubmit(processData)}>
      <h2 className="mb-4 font-semibold text-lg text-lime-600 dark:text-lime-400">
        Thông tin giao hàng
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="streetAddress">
            Địa chỉ đường phố
          </label>
          <input
            aria-invalid={Boolean(errors.streetAddress)}
            className={inputClass}
            id="streetAddress"
            placeholder="Số nhà, tên đường..."
            type="text"
            {...register("streetAddress")}
          />
          {errors.streetAddress && (
            <p className={errorClass}>{errors.streetAddress.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="province">
            Tỉnh / Thành phố
          </label>
          <select
            aria-invalid={Boolean(errors.provinceCode)}
            className={inputClass}
            id="province"
            {...register("provinceCode", {
              onChange: () => setValue("wardCode", ""),
            })}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.province_code}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.provinceCode && (
            <p className={errorClass}>{errors.provinceCode.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="ward">
            Phường / Xã
          </label>
          <select
            aria-invalid={Boolean(errors.wardCode)}
            className={inputClass}
            disabled={!provinceCode}
            id="ward"
            {...register("wardCode", {
              onChange: () => clearErrors("wardCode"),
            })}
          >
            <option value="">
              {provinceCode ? "Chọn phường/xã" : "Chọn tỉnh trước"}
            </option>
            {wards.map((w) => (
              <option key={w.id} value={w.ward_code}>
                {w.name}
              </option>
            ))}
          </select>
          {errors.wardCode && (
            <p className={errorClass}>{errors.wardCode.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 font-medium text-slate-700 text-sm dark:text-slate-300">
            Phí vận chuyển
          </p>
          <div className="flex flex-col gap-3">
            {shippingOptions.map((option) => {
              const isSelected = String(shippingCost) === String(option.cost);

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
                    {...register("shippingCost")}
                    value={option.cost}
                  />
                  <Truck
                    className="shrink-0 text-slate-500 dark:text-slate-400"
                    size={20}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-slate-800 text-sm dark:text-slate-100">
                      Giao hàng {option.label}
                    </span>
                    <span className="block text-slate-500 text-xs dark:text-slate-400">
                      Thời gian: {option.time}
                    </span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-semibold text-slate-800 text-sm dark:text-slate-100">
                    {option.cost.toLocaleString("vi-VN")}đ
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
          {errors.shippingCost && (
            <p className={errorClass}>{errors.shippingCost.message}</p>
          )}
        </div>
      </div>

      <NavButtons />
    </form>
  );
}
