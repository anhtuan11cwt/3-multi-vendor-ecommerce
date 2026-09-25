"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ImageInput, ToggleInput } from "@/components/form-inputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { makePostRequest, makePutRequest } from "@/lib/api-request";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { bannerSchema } from "@/lib/validations/banner";

export default function BannerForm({ updateData = {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const router = useRouter();

  const id = updateData?.id || "";
  const initialImageUrl = updateData?.imageUrl || "";

  const form = useForm({
    defaultValues: {
      isActive: true,
      link: "",
      title: "",
      ...updateData,
      imageUrl: initialImageUrl,
    },
    resolver: zodResolver(bannerSchema),
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      let imageUrl = initialImageUrl;
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "banners");
      }

      const payload = { ...data, imageUrl, isActive };
      const redirect = () => router.push("/dashboard/banners");

      if (id) {
        await makePutRequest({
          data: payload,
          endpoint: `api/banners/${id}`,
          redirect,
          resourceName: "banner",
          setLoading: setIsLoading,
        });
      } else {
        await makePostRequest({
          data: payload,
          endpoint: "api/banners",
          redirect,
          reset: () => {
            form.reset();
            setImageFile(null);
            setResetKey((k) => k + 1);
          },
          resourceName: "Banner",
          setLoading: setIsLoading,
        });
      }
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Tên banner</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      isLoading &&
                        "pointer-events-none cursor-not-allowed opacity-50",
                    )}
                    disabled={isLoading}
                    id={field.name}
                    placeholder="Nhập tên banner"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="link"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Đường dẫn liên kết
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
                    placeholder="/products/example hoặc https://..."
                    type="url"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <ImageInput
              imageUrl={initialImageUrl}
              key={resetKey}
              label="Ảnh banner"
              loading={isLoading}
              maxFileSize={2 * 1024 * 1024}
              onFileChange={setImageFile}
            />

            <ToggleInput
              label="Xuất bản banner"
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
              <Button
                className={cn(
                  isLoading &&
                    "pointer-events-none cursor-not-allowed opacity-50",
                )}
                disabled={isLoading}
                type="submit"
              >
                {isLoading
                  ? id
                    ? "Đang cập nhật..."
                    : "Đang tạo..."
                  : id
                    ? "Cập nhật banner"
                    : "Tạo banner"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
