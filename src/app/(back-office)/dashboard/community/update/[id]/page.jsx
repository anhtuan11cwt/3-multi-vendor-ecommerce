"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import FormHeader from "@/components/back-office/form-header";
import {
  ImageInput,
  QuillEditor,
  SelectInput,
  ToggleInput,
} from "@/components/form-inputs";
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
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { trainingSchema } from "@/lib/validations/training";

const categories = [
  { id: "1", title: "Rau củ quả" },
  { id: "2", title: "Trái cây" },
  { id: "3", title: "Thực phẩm chế biến" },
];

export default function EditTrainingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [content, setContent] = useState("");
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      categoryId: "",
      description: "",
      isActive: true,
      title: "",
    },
    resolver: zodResolver(trainingSchema),
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "trainings");
      }

      const payload = { ...data, content, imageUrl };

      await makePostRequest({
        data: payload,
        endpoint: "api/trainings",
        reset: form.reset,
        resourceName: "Bài đào tạo",
        setImageUrl: () => {
          setImageFile(null);
          setResetKey((k) => k + 1);
        },
        setLoading: setIsLoading,
      });
      router.push("/dashboard/community");
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader disabled={isLoading} title="Cập nhật bài đào tạo" />
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Tiêu đề đào tạo
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
                      placeholder="Nhập tiêu đề đào tạo"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="categoryId"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <SelectInput
                      errors={fieldState.invalid}
                      isLoading={isLoading}
                      label="Chọn danh mục"
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
                    <FieldLabel htmlFor={field.name}>Mô tả đào tạo</FieldLabel>
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
                      placeholder="Nhập mô tả đào tạo"
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
                label="Ảnh thu nhỏ"
                loading={isLoading}
                onFileChange={setImageFile}
              />

              <QuillEditor
                className="pt-2"
                disabled={isLoading}
                label="Nội dung đào tạo"
                onChange={setContent}
                value={content}
              />

              <ToggleInput
                label="Xuất bản đào tạo"
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
                    setContent("");
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
                  {isLoading ? "Đang cập nhật..." : "Cập nhật đào tạo"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
