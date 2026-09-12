import { z } from "zod";

export const trainingSchema = z.object({
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  title: z
    .string()
    .min(1, "Tiêu đề training không được để trống")
    .max(200, "Tiêu đề training tối đa 200 ký tự"),
});

export const trainingApiSchema = trainingSchema.extend({
  content: z.string().optional(),
  imageUrl: z
    .string()
    .url("Ảnh thumbnail là bắt buộc")
    .optional()
    .or(z.literal("")),
  slug: z.string().min(1, "Slug không hợp lệ"),
});
