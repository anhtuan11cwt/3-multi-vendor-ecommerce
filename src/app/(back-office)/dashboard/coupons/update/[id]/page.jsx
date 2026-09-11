"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
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
import { generateCouponCode } from "@/lib/generate-coupon-code";
import { couponSchema } from "@/lib/validations/coupon";

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
    resolver: zodResolver(couponSchema),
  });

  const title = useWatch({ control: form.control, name: "title" });
  const expiryDate = useWatch({ control: form.control, name: "expiryDate" });
  const isActive = useWatch({ control: form.control, name: "isActive" });

  const previewCode = useMemo(() => {
    if (!title || !expiryDate) return "";
    return generateCouponCode(title, expiryDate);
  }, [title, expiryDate]);

  const minDate = new Date().toISOString().split("T")[0];

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const payload = { id, ...data, isActive };
      console.log("Dữ liệu cập nhật mã giảm giá:", payload);
      toast.success("Cập nhật mã giảm giá thành công!", { duration: 2000 });
      router.push("/dashboard/coupons");
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật mã giảm giá.", {
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
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
