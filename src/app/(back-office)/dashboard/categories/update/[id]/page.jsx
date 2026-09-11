"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
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
import { categorySchema } from "@/lib/validations/category";

const markets = [
  { id: "1", title: "Chợ Bến Thành" },
  { id: "2", title: "Chợ Đông Xuân" },
  { id: "3", title: "Chợ Lớn" },
  { id: "4", title: "Chợ Cần Thơ" },
  { id: "5", title: "Chợ Ratched" },
];

export default function UpdateCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const form = useForm({
    defaultValues: {
      description: "",
      isActive: true,
      marketIds: [],
      title: "",
    },
    resolver: zodResolver(categorySchema),
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      let imageUrl = currentImageUrl;
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "categories");
      }

      const slug = generateSlug(data.title);
      const payload = { id, ...data, imageUrl, isActive, slug };
      console.log("Dữ liệu cập nhật:", payload);
      toast.success("Cập nhật danh mục thành công!", { duration: 2000 });
      router.push("/dashboard/categories");
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật danh mục.", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader title="Cập nhật danh mục" />
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
                      Tiêu đề danh mục
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
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
                name="marketIds"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <SelectInput
                      errors={fieldState.invalid}
                      isLoading={isLoading}
                      label="Chọn chợ"
                      multiple
                      name={field.name}
                      options={markets}
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
                    <FieldLabel htmlFor={field.name}>Mô tả danh mục</FieldLabel>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="min-h-[120px] resize-none"
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
                imageUrl={currentImageUrl}
                key={resetKey}
                label="Ảnh danh mục"
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
                  {isLoading ? "Đang cập nhật..." : "Cập nhật danh mục"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
