"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { makePutRequest } from "@/lib/api-request";
import { generateCouponCode } from "@/lib/generate-coupon-code";
import { getData } from "@/lib/getData";
import { couponUpdateSchema } from "@/lib/validations/coupon";
import { convertISODateToNormal } from "../../convert-iso-date-to-normal";

export default function UpdateCouponPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      couponCode: "",
      expiryDate: "",
      isActive: true,
      title: "",
    },
    resolver: zodResolver(couponUpdateSchema),
  });

  useEffect(() => {
    async function fetchCoupon() {
      try {
        const coupon = await getData(`coupons/${id}`);
        if (!coupon?.id) {
          router.push("/dashboard/coupons");
          return;
        }

        form.reset({
          couponCode: coupon.couponCode || "",
          expiryDate: convertISODateToNormal(coupon.expiryDate),
          isActive: coupon.isActive ?? true,
          title: coupon.title || "",
        });
      } catch {
        router.push("/dashboard/coupons");
      }
    }
    if (id) fetchCoupon();
  }, [id, form, router]);

  const title = useWatch({ control: form.control, name: "title" });
  const expiryDate = useWatch({ control: form.control, name: "expiryDate" });
  const isActive = useWatch({ control: form.control, name: "isActive" });

  const previewCode = useMemo(() => {
    if (!title || !expiryDate) return "";
    return generateCouponCode(title, expiryDate);
  }, [title, expiryDate]);

  async function onSubmit(data) {
    const payload = {
      ...data,
      couponCode: previewCode || data.couponCode,
      id,
      isActive,
    };

    await makePutRequest({
      data: payload,
      endpoint: `api/coupons/${id}`,
      redirect: () => router.push("/dashboard/coupons"),
      resourceName: "mã giảm giá",
      setLoading: setIsLoading,
    });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader title="Cập nhật mã giảm giá" />
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
                        id={field.name}
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
                  disabled={isLoading}
                  onClick={() => form.reset()}
                  type="button"
                  variant="outline"
                >
                  Đặt lại
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? "Đang cập nhật..." : "Cập nhật mã giảm giá"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
