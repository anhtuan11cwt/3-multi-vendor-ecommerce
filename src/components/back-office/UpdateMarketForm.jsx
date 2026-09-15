"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import FormHeader from "@/components/back-office/form-header";
import { ImageInput, SelectInput, ToggleInput } from "@/components/form-inputs";
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
import { generateSlug } from "@/lib/generate-slug";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { marketSchema } from "@/lib/validations/market";

export default function UpdateMarketForm({ market, categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentLogoUrl, _setCurrentLogoUrl] = useState(market?.imageUrl || "");
  const [resetKey, setResetKey] = useState(0);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      categoryIds: market?.categoryIds || [],
      description: market?.description || "",
      isActive: market?.isActive ?? true,
      title: market?.title || "",
    },
    resolver: zodResolver(marketSchema),
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      let logoUrl = currentLogoUrl;
      if (imageFile) {
        logoUrl = await uploadFile(imageFile, "markets");
      }

      const slug = generateSlug(data.title);
      const payload = {
        id: market.id,
        ...data,
        isActive,
        logoUrl,
        slug,
      };

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/markets`, {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });

      if (response.ok) {
        toast.success("Cập nhật chợ thành công!", { duration: 2000 });
        router.push("/dashboard/markets");
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật chợ.", { duration: 2000 });
      }
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật chợ.", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader disabled={isLoading} title="Cập nhật chợ" />
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Tên chợ</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập tên chợ"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <ImageInput
                imageUrl={currentLogoUrl}
                key={resetKey}
                label="Logo chợ"
                loading={isLoading}
                maxFileSize={1 * 1024 * 1024}
                onFileChange={setImageFile}
              />

              <Controller
                control={form.control}
                name="categoryIds"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <SelectInput
                      errors={fieldState.invalid}
                      isLoading={isLoading}
                      label="Chọn danh mục"
                      multiple
                      name={field.name}
                      options={categories}
                      register={field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Mô tả chợ</FieldLabel>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        "min-h-[120px] resize-none",
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập mô tả chợ"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <ToggleInput
                label="Trạng thái chợ"
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
                  onClick={() => {
                    form.reset();
                    setImageFile(null);
                    setResetKey((k) => k + 1);
                  }}
                  type="button"
                  variant="outline"
                >
                  Đặt lại
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? "Đang cập nhật..." : "Cập nhật chợ"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
