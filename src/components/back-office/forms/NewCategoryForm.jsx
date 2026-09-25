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
import { Textarea } from "@/components/ui/textarea";
import { makePostRequest, makePutRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { categorySchema } from "@/lib/validations/category";

export default function NewCategoryForm({ updateData = {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const router = useRouter();

  const id = updateData?.id || "";
  const initialImageUrl = updateData?.imageUrl || "";

  const form = useForm({
    defaultValues: {
      description: "",
      isActive: true,
      title: "",
      ...updateData,
      imageUrl: initialImageUrl,
    },
    resolver: zodResolver(categorySchema),
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      let imageUrl = initialImageUrl;
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "categories");
      }

      const slug = generateSlug(data.title);
      const payload = { ...data, imageUrl, isActive, slug };

      const redirect = () => router.push("/dashboard/categories");

      if (id) {
        await makePutRequest({
          data: payload,
          endpoint: `api/categories/${id}`,
          redirect,
          resourceName: "danh mục",
          setLoading: setIsLoading,
        });
      } else {
        await makePostRequest({
          data: payload,
          endpoint: "api/categories",
          redirect,
          reset: () => {
            form.reset();
            setImageFile(null);
            setResetKey((k) => k + 1);
          },
          resourceName: "danh mục",
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
                  <FieldLabel htmlFor={field.name}>Tiêu đề danh mục</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      isLoading &&
                        "pointer-events-none cursor-not-allowed opacity-50",
                    )}
                    disabled={isLoading}
                    id={field.name}
                    placeholder="Nhập tiêu đề danh mục"
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
                  <FieldLabel htmlFor={field.name}>Mô tả danh mục</FieldLabel>
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
                    placeholder="Nhập mô tả danh mục"
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
              label="Ảnh danh mục"
              loading={isLoading}
              onFileChange={setImageFile}
            />

            <ToggleInput
              label="Xuất bản danh mục"
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
                    ? "Cập nhật danh mục"
                    : "Tạo danh mục"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
