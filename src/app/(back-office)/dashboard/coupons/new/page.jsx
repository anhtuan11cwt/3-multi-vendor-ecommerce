"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
import { makePostRequest } from "@/lib/api-request";
import { generateCouponCode } from "@/lib/generate-coupon-code";
import { cn } from "@/lib/utils";
import { couponSchema } from "@/lib/validations/coupon";

export default function NewCouponPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      couponCode: "",
      expiryDate: "",
      isActive: true,
      title: "",
    },
    resolver: zodResolver(couponSchema),
  });

  const title = useWatch({ control: form.control, name: "title" });
  const expiryDate = useWatch({ control: form.control, name: "expiryDate" });
  const isActive = useWatch({ control: form.control, name: "isActive" });

  const minDate = new Date().toISOString().split("T")[0];

  const previewCode = useMemo(() => {
    if (!title || !expiryDate) return "";
    return generateCouponCode(title, expiryDate);
  }, [title, expiryDate]);

  async function onSubmit(data) {
    const couponCode = generateCouponCode(data.title, data.expiryDate);
    const payload = { ...data, couponCode, isActive };
    await makePostRequest({
      data: payload,
      endpoint: "api/coupons",
      reset: form.reset,
      resourceName: "Mã giảm giá",
      setLoading: setIsLoading,
    });
    router.push("/dashboard/coupons");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader disabled={isLoading} title="Tạo mã giảm giá mới" />
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Tên chiến dịch</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập tên chiến dịch"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Mã giảm giá</FieldLabel>
                  <Input
                    className="bg-muted font-mono"
                    disabled
                    placeholder="Tự động sinh"
                    value={previewCode}
                  />
                  {!previewCode && (
                    <p className="text-muted-foreground text-xs">
                      Nhập tên chiến dịch và ngày hết hạn để sinh mã
                    </p>
                  )}
                </Field>

                <Controller
                  control={form.control}
                  name="expiryDate"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Ngày hết hạn</FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className={cn(
                          isLoading &&
                            "pointer-events-none cursor-not-allowed opacity-50",
                        )}
                        disabled={isLoading}
                        id={field.name}
                        min={minDate}
                        type="date"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <ToggleInput
                label="Xuất bản mã giảm giá"
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
                  {isLoading ? "Đang tạo..." : "Tạo mã giảm giá"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
