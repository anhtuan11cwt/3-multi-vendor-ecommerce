"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import FormHeader from "@/components/back-office/form-header";
import { ToggleInput } from "@/components/form-inputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { makePostRequest } from "@/lib/api-request";
import { cn } from "@/lib/utils";
import { staffSchema } from "@/lib/validations/staff";

export default function UpdateStaffPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const form = useForm({
    defaultValues: {
      cccd: "",
      dob: "",
      email: "",
      fullName: "",
      isActive: true,
      notes: "",
      password: "",
      phone: "",
      physicalAddress: "",
    },
    resolver: zodResolver(staffSchema),
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  async function onSubmit(data) {
    const payload = { id, ...data, isActive };
    console.log("Dữ liệu cập nhật:", payload);
    await makePostRequest({
      data: payload,
      endpoint: "api/staff",
      reset: form.reset,
      resourceName: "Nhân viên",
      setLoading: setIsLoading,
    });
    router.push("/dashboard/staff");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader disabled={isLoading} title="Cập nhật nhân viên" />
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Họ và tên</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập họ và tên"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="cccd"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Số CCCD</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      inputMode="numeric"
                      maxLength={12}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                      pattern="[0-9]*"
                      placeholder="Nhập số CCCD (12 số)"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="dob"
                render={({ field, fieldState }) => {
                  const maxDate = new Date();
                  maxDate.setFullYear(maxDate.getFullYear() - 18);
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Ngày sinh</FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className={cn(
                          isLoading &&
                            "pointer-events-none cursor-not-allowed opacity-50",
                        )}
                        disabled={isLoading}
                        id={field.name}
                        max={maxDate.toISOString().split("T")[0]}
                        type="date"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />

              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Mật khẩu</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className={cn(
                          "pr-10",
                          isLoading &&
                            "pointer-events-none cursor-not-allowed opacity-50",
                        )}
                        disabled={isLoading}
                        id={field.name}
                        placeholder="Tối thiểu 8 ký tự, gồm chữ hoa, thường, số và ký tự đặc biệt"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        onClick={() => setShowPassword((p) => !p)}
                        type="button"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập địa chỉ email"
                      type="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Số điện thoại</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      inputMode="numeric"
                      maxLength={10}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                      pattern="[0-9]*"
                      placeholder="Nhập số điện thoại"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="physicalAddress"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Địa chỉ</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập địa chỉ"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="notes"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Ghi chú</FieldLabel>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        "min-h-[100px] resize-none",
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập ghi chú"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <ToggleInput
                label="Trạng thái nhân viên"
                loading={isLoading}
                name="isActive"
                register={form.register}
                value={isActive}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  className={cn(
                    isLoading &&
                      "pointer-events-none cursor-not-allowed opacity-50",
                  )}
                  disabled={isLoading}
                  onClick={() => form.reset()}
                  type="button"
                  variant="outline"
                >
                  Đặt lại
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? "Đang cập nhật..." : "Cập nhật nhân viên"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
