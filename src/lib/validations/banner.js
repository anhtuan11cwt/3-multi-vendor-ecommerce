import { z } from "zod";

export const bannerSchema = z.object({
  link: z.string().optional(),
  title: z
    .string()
    .min(1, "Tên banner không được để trống")
    .max(100, "Tên banner tối đa 100 ký tự"),
});

export const bannerApiSchema = bannerSchema.extend({
  imageUrl: z
    .string()
    .url("Ảnh banner là bắt buộc")
    .optional()
    .or(z.literal("")),
});
