import { z } from "zod";

export const bannerSchema = z.object({
  description: z.string().optional(),
  url: z.string().optional(),
});

export const bannerApiSchema = bannerSchema.extend({
  imageUrl: z
    .string()
    .url("Ảnh banner là bắt buộc")
    .optional()
    .or(z.literal("")),
});
