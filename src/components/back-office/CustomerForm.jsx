"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import addressData from "vietnam-address-database";
import FormHeader from "@/components/back-office/form-header";
import { ImageInput } from "@/components/form-inputs";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { makePutRequest } from "@/lib/api-request";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { customerProfileSchema } from "@/lib/validations/customer";

const provinces = addressData.find((d) => d.name === "provinces")?.data || [];
const allWards = addressData.find((d) => d.name === "wards")?.data || [];

const selectClass =
  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30";

function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

// Ngày hôm nay theo giờ máy (để đặt max cho ô chọn ngày sinh)
function getTodayInputValue() {
  const now = new Date();
  const pad = (number) => String(number).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export default function CustomerForm({ customer }) {
  const profile = customer?.profile ?? {};
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const form = useForm({
    defaultValues: {
      dateOfBirth: toDateInputValue(profile.dateOfBirth),
      email: customer?.email ?? "",
      fullName: customer?.name ?? "",
      phone: profile.phone ?? "",
      provinceCode: profile.provinceCode ?? "",
      streetAddress: profile.streetAddress ?? "",
      wardCode: profile.wardCode ?? "",
    },
    resolver: zodResolver(customerProfileSchema),
  });

  const provinceCode = useWatch({
    control: form.control,
    name: "provinceCode",
  });

  const wards = useMemo(() => {
    if (!provinceCode) return [];
    return allWards.filter((ward) => ward.province_code === provinceCode);
  }, [provinceCode]);

  const loadingClass = cn(
    isLoading && "pointer-events-none cursor-not-allowed opacity-50",
  );

  const selectClassName = cn(selectClass, loadingClass);

  async function onSubmit(data) {
    setIsLoading(true);

    try {
      let profileImage = profile.profileImage ?? "";

      if (imageFile) {
        profileImage = await uploadFile(imageFile, "customers");
      }

      const provinceName =
        provinces.find((p) => p.province_code === data.provinceCode)?.name ||
        "";
      const wardName =
        allWards.find((w) => w.ward_code === data.wardCode)?.name || "";

      await makePutRequest({
        data: {
          profile: {
            ...data,
            profileImage,
            province: provinceName,
            ward: wardName,
          },
        },
        endpoint: `api/customers/${customer.id}`,
        redirect: () => router.push("/dashboard/customers"),
        resourceName: "hồ sơ khách hàng",
        setLoading: setIsLoading,
      });
    } catch {
      toast.error("Tải ảnh đại diện thất bại", { duration: 2000 });
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader disabled={isLoading} title="Cập nhật khách hàng" />

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-700 dark:bg-slate-800">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Thông tin cá nhân */}
          <div className="border-slate-200 border-b pb-10 dark:border-slate-700">
            <h2 className="mb-4 font-semibold text-lg text-lime-600 dark:text-lime-400">
              Thông tin cá nhân
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Controller
                  control={form.control}
                  name="fullName"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Họ và tên</FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className={loadingClass}
                        disabled={isLoading}
                        id={field.name}
                        placeholder="Nhập họ và tên"
                        readOnly
                        title="Họ tên lấy từ tài khoản đăng ký"
                        type="text"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className={loadingClass}
                        disabled={isLoading}
                        id={field.name}
                        placeholder="Nhập địa chỉ email"
                        readOnly
                        title="Email lấy từ tài khoản đăng ký"
                        type="email"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Số điện thoại</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={loadingClass}
                      disabled={isLoading}
                      id={field.name}
                      inputMode="numeric"
                      maxLength={10}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Nhập số điện thoại"
                      type="tel"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="dateOfBirth"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Ngày sinh</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={loadingClass}
                      disabled={isLoading}
                      id={field.name}
                      max={getTodayInputValue()}
                      type="date"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="sm:col-span-2">
                <ImageInput
                  imageUrl={profile.profileImage ?? ""}
                  label="Ảnh đại diện"
                  loading={isLoading}
                  onFileChange={setImageFile}
                />
              </div>
            </div>
          </div>

          {/* Địa chỉ giao hàng */}
          <div className="pt-10">
            <h2 className="mb-4 font-semibold text-lg text-lime-600 dark:text-lime-400">
              Địa chỉ giao hàng
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Controller
                  control={form.control}
                  name="streetAddress"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Địa chỉ đường phố
                      </FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className={loadingClass}
                        disabled={isLoading}
                        id={field.name}
                        placeholder="Số nhà, tên đường..."
                        type="text"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="provinceCode"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Tỉnh / Thành phố
                    </FieldLabel>
                    <select
                      aria-invalid={fieldState.invalid}
                      className={selectClassName}
                      disabled={isLoading}
                      id={field.name}
                      onChange={(event) => {
                        field.onChange(event);
                        form.setValue("wardCode", "");
                      }}
                      value={field.value ?? ""}
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {provinces.map((province) => (
                        <option
                          key={province.id}
                          value={province.province_code}
                        >
                          {province.name}
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="wardCode"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phường / Xã</FieldLabel>
                    <select
                      aria-invalid={fieldState.invalid}
                      className={selectClassName}
                      disabled={isLoading || !provinceCode}
                      id={field.name}
                      onChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <option value="">
                        {provinceCode ? "Chọn phường/xã" : "Chọn tỉnh trước"}
                      </option>
                      {wards.map((ward) => (
                        <option key={ward.id} value={ward.ward_code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-slate-200 border-t pt-6 sm:flex-row sm:justify-end dark:border-slate-700">
            <Button
              className={cn("w-full sm:w-auto", loadingClass)}
              disabled={isLoading}
              onClick={() => form.reset()}
              type="button"
              variant="outline"
            >
              Đặt lại
            </Button>
            <Button
              className="w-full sm:w-auto"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật khách hàng"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
