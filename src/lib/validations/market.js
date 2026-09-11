import { z } from "zod";

export const marketSchema = z.object({
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  title: z
    .string()
    .min(1, "Tên chợ không được để trống")
    .max(100, "Tên chợ tối đa 100 ký tự"),
});

export const marketApiSchema = marketSchema.extend({
  logoUrl: z.string().url("Logo chợ là bắt buộc").optional().or(z.literal("")),
  slug: z.string().min(1, "Slug không hợp lệ"),
});
