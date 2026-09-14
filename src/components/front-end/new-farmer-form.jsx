"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ArrayItemsInput from "@/components/form-inputs/ArrayItemsInput";
import ImageInput from "@/components/form-inputs/ImageInput";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { vietnameseNameSchema } from "@/lib/validations/common";

const farmerProfileSchema = z.object({
  contactPerson: z.string().trim().optional(),
  contactPersonPhone: z.string().trim().optional(),
  email: z.string().trim().email("Email không hợp lệ"),
  landSize: z.coerce
    .number()
    .positive("Diện tích phải lớn hơn 0")
    .optional()
    .or(z.nan()),
  mainCrop: z.string().trim().optional(),
  name: vietnameseNameSchema,
  notes: z.string().trim().optional(),
  paymentTerms: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(
      /^0[35789]\d{8}$/,
      "Số điện thoại phải đúng 10 chữ số, bắt đầu bằng 0",
    ),
  physicalAddress: z.string().trim().optional(),
});

export default function NewFarmerForm({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      contactPerson: "",
      contactPersonPhone: "",
      email: user?.email || "",
      landSize: "",
      mainCrop: "",
      name: user?.name || "",
      notes: "",
      paymentTerms: "",
      phone: "",
      physicalAddress: "",
    },
    resolver: zodResolver(farmerProfileSchema),
  });

  async function onSubmit(data) {
    setIsLoading(true);

    try {
      let profileImageUrl = imageUrl;
      if (imageUrl && typeof imageUrl === "object") {
        profileImageUrl = await uploadFile(imageUrl, "image");
      }

      const initials = (data.name || "U")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
      const now = new Date();
      const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
      const code = `LFF-${initials}-${ts}`;

      const payload = {
        ...data,
        code,
        isActive: true,
        products,
        profileImageUrl: profileImageUrl || "",
        userId: user?.id,
      };

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseURL}/api/farmers`, {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.ok) {
        toast.success("Hồ sơ nông dân đã được tạo thành công", {
          duration: 2000,
        });
        router.push("/dashboard/farmers");
      } else {
        toast.error("Tạo hồ sơ thất bại", { duration: 2000 });
      }
    } catch {
      toast.error("Đã xảy ra lỗi", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="name"
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
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                placeholder="Nhập số điện thoại"
                type="tel"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="contactPerson"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Người liên hệ</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                className={cn(
                  isLoading &&
                    "pointer-events-none cursor-not-allowed opacity-50",
                )}
                disabled={isLoading}
                id={field.name}
                placeholder="Nhập tên người liên hệ"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="contactPersonPhone"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Số điện thoại liên hệ
              </FieldLabel>
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
                placeholder="Nhập SĐT liên hệ"
                type="tel"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="landSize"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Diện tích đất (ha)</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                className={cn(
                  isLoading &&
                    "pointer-events-none cursor-not-allowed opacity-50",
                )}
                disabled={isLoading}
                id={field.name}
                min="0"
                placeholder="Nhập diện tích đất"
                type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="mainCrop"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Cây trồng chính</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                className={cn(
                  isLoading &&
                    "pointer-events-none cursor-not-allowed opacity-50",
                )}
                disabled={isLoading}
                id={field.name}
                placeholder="Nhập cây trồng chính"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <ArrayItemsInput
          items={products}
          itemTitle="Sản phẩm"
          loading={isLoading}
          setItems={setProducts}
        />

        <Controller
          control={form.control}
          name="paymentTerms"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Điều khoản thanh toán
              </FieldLabel>
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
                placeholder="Nhập điều khoản thanh toán"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <ImageInput
          imageUrl={typeof imageUrl === "string" ? imageUrl : null}
          label="Ảnh đại diện"
          loading={isLoading}
          onFileChange={setImageUrl}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            className={cn(
              isLoading && "pointer-events-none cursor-not-allowed opacity-50",
            )}
            disabled={isLoading}
            onClick={() => form.reset()}
            type="button"
            variant="outline"
          >
            Đặt lại
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading ? "Đang lưu..." : "Hoàn tất"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
