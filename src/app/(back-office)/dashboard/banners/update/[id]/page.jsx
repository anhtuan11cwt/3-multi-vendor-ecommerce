"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormHeader from "@/components/back-office/form-header";
import { ImageInput } from "@/components/form-inputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { makePostRequest } from "@/lib/api-request";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { bannerSchema } from "@/lib/validations/banner";

export default function UpdateBannerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const form = useForm({
    defaultValues: {
      link: "",
      title: "",
    },
    resolver: zodResolver(bannerSchema),
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      let imageUrl = currentImageUrl;
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "banners");
      }

      const payload = { id, ...data, imageUrl };
      console.log("Dữ liệu cập nhật:", payload);
      await makePostRequest({
        data: payload,
        endpoint: "api/banners",
        reset: form.reset,
        resourceName: "Banner",
        setImageUrl: () => {
          setImageFile(null);
          setResetKey((k) => k + 1);
        },
        setLoading: setIsLoading,
      });
      router.push("/dashboard/banners");
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader disabled={isLoading} title="Cập nhật banner" />
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
                imageUrl={currentImageUrl}
                key={resetKey}
                label="Ảnh banner"
                loading={isLoading}
                maxFileSize={2 * 1024 * 1024}
                onFileChange={setImageFile}
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
                  {isLoading ? "Đang cập nhật..." : "Cập nhật banner"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
