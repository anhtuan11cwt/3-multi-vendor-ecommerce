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
import { makePostRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { marketSchema } from "@/lib/validations/market";

export default function NewMarketForm({ categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      categoryIds: [],
      description: "",
      isActive: true,
      title: "",
    },
    resolver: zodResolver(marketSchema),
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "markets");
      }

      const slug = generateSlug(data.title);
      const payload = { ...data, isActive, logoUrl: imageUrl, slug };

      await makePostRequest({
        data: payload,
        endpoint: "api/markets",
        redirect: () => router.push("/dashboard/markets"),
        reset: form.reset,
        resourceName: "Chợ",
        setImageUrl: () => {
          setImageFile(null);
          setResetKey((k) => k + 1);
        },
        setLoading: setIsLoading,
      });
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader disabled={isLoading} title="Tạo chợ mới" />
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
                imageUrl=""
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
                  {isLoading ? "Đang tạo chợ..." : "Tạo chợ"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
