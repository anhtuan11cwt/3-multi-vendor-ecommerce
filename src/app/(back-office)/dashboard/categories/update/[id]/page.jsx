"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import FormHeader from "@/components/back-office/form-header";
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

export default function UpdateCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      description: "",
      title: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const slug = generateSlug(data.title);
      const payload = { id, ...data, slug };
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
      <FormHeader backHref="/dashboard/categories" title="Cập nhật danh mục" />
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
                rules={{ required: "Tiêu đề danh mục là bắt buộc." }}
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
                rules={{ required: "Mô tả danh mục là bắt buộc." }}
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
