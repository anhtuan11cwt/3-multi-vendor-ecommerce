import { z } from "zod";

export const categorySchema = z.object({
  description: z
    .string()
    .min(1, "Mô tả danh mục không được để trống")
    .max(500, "Mô tả danh mục tối đa 500 ký tự"),
  marketIds: z.array(z.string()).optional().default([]),
  title: z
    .string()
    .min(1, "Tên danh mục không được để trống")
    .max(100, "Tên danh mục tối đa 100 ký tự"),
});

export const categoryApiSchema = categorySchema.extend({
  imageUrl: z
    .string()
    .url("Ảnh danh mục là bắt buộc")
    .optional()
    .or(z.literal("")),
  slug: z.string().min(1, "Đường dẫn ngắn không hợp lệ"),
});
