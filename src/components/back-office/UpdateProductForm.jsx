"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import FormHeader from "@/components/back-office/form-header";
import {
  ArrayItemsInput,
  ImageInput,
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
import { generateSlug } from "@/lib/generate-slug";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { productSchema } from "@/lib/validations/product";

const unitOptions = [
  { id: "Kg", title: "Kg" },
  { id: "Gram", title: "Gram" },
  { id: "Lít", title: "Lít" },
  { id: "Cái", title: "Cái" },
  { id: "Hộp", title: "Hộp" },
  { id: "Gói", title: "Gói" },
  { id: "Bó", title: "Bó" },
  { id: "Túi", title: "Túi" },
  { id: "Thùng", title: "Thùng" },
];

export default function UpdateProductForm({ product, categories, farmers }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, _setCurrentImageUrl] = useState(
    product?.imageUrl || "",
  );
  const [resetKey, setResetKey] = useState(0);
  const [tags, setTags] = useState(product?.tags || []);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      barcode: product?.barcode || "",
      categoryId: product?.categoryId || "",
      description: product?.description || "",
      farmerId: product?.farmerId || "",
      isActive: product?.isActive ?? true,
      isWholesale: product?.isWholesale ?? false,
      productPrice: product?.productPrice || "",
      productStock: product?.productStock || "",
      quantity: product?.quantity || 1,
      SKU: product?.sku || "",
      salePrice: product?.salePrice || "",
      title: product?.title || "",
      unit: product?.unit || "",
      wholesalePrice: product?.wholesalePrice || "",
      wholesaleQuantity: product?.wholesaleQuantity || "",
    },
    resolver: zodResolver(productSchema),
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });
  const isWholesale = useWatch({ control: form.control, name: "isWholesale" });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      let imageUrl = currentImageUrl;
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "products");
      }

      const slug = generateSlug(data.title);
      const productData = {
        id: product.id,
        ...data,
        imageUrl,
        isActive,
        slug,
        tags,
      };

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/products`, {
        body: JSON.stringify(productData),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });

      if (response.ok) {
        toast.success("Cập nhật sản phẩm thành công!", { duration: 2000 });
        router.push("/dashboard/products");
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật sản phẩm.", {
          duration: 2000,
        });
      }
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm.", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader disabled={isLoading} title="Cập nhật sản phẩm" />
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field
                    className="col-span-2"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor={field.name}>Tên sản phẩm</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập tên sản phẩm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="SKU"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Mã SKU</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập mã SKU"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="barcode"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Mã vạch</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      placeholder="Nhập mã vạch"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="productPrice"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Giá sản phẩm</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        isLoading &&
                          "pointer-events-none cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading}
                      id={field.name}
                      min="15000"
                      placeholder="0"
                      type="number"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="salePrice"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Giá khuyến mãi</FieldLabel>
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
                      placeholder="0"
                      type="number"
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
                name="farmerId"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <SelectInput
                      errors={fieldState.invalid}
                      isLoading={isLoading}
                      label="Chọn nông dân"
                      name={field.name}
                      options={farmers}
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
                name="unit"
                render={({ field, fieldState }) => (
                  <Field
                    className="col-span-2"
                    data-invalid={fieldState.invalid}
                  >
                    <SelectInput
                      errors={fieldState.invalid}
                      isLoading={isLoading}
                      label="Đơn vị tính"
                      name={field.name}
                      options={unitOptions}
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
                name="productStock"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Tồn kho</FieldLabel>
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
                      placeholder="0"
                      type="number"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <ToggleInput
                label="Hỗ trợ bán buôn"
                loading={isLoading}
                name="isWholesale"
                register={form.register}
                trueTitle="Có"
                value={isWholesale}
              />

              {isWholesale && (
                <>
                  <Controller
                    control={form.control}
                    name="wholesalePrice"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Giá bán buôn
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
                          min="0"
                          placeholder="0"
                          type="number"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="wholesaleQuantity"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Số lượng tối thiểu bán buôn
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
                          min="1"
                          placeholder="0"
                          type="number"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </>
              )}

              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field
                    className="col-span-2"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor={field.name}>Mô tả sản phẩm</FieldLabel>
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
                      placeholder="Nhập mô tả sản phẩm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <ArrayItemsInput
                items={tags}
                itemTitle="Thẻ"
                loading={isLoading}
                setItems={setTags}
              />

              <ToggleInput
                label="Xuất bản sản phẩm"
                loading={isLoading}
                name="isActive"
                register={form.register}
                value={isActive}
              />

              <ImageInput
                imageUrl={currentImageUrl}
                key={resetKey}
                label="Ảnh sản phẩm"
                loading={isLoading}
                maxFileSize={1 * 1024 * 1024}
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
                    setTags(product?.tags || []);
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
                  {isLoading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
