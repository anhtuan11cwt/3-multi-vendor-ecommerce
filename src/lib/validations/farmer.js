import { z } from "zod";
import { vietnameseNameSchema, vietnamesePhoneSchema } from "./common";

export const farmerSchema = z.object({
  contactPerson: z.string().trim().optional(),
  contactPersonPhone: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean().default(false),
  landSize: z.coerce
    .number()
    .positive("Diện tích phải lớn hơn 0")
    .optional()
    .or(z.nan()),
  mainCrop: z.string().trim().optional(),
  name: vietnameseNameSchema,
  notes: z.string().trim().optional(),
  paymentTerms: z.string().trim().optional(),
  phone: vietnamesePhoneSchema,
  physicalAddress: z.string().trim().optional(),
  products: z.array(z.string().trim()).default([]),
  profileImageUrl: z.string().trim().optional(),
});

export const farmerApiSchema = farmerSchema.extend({
  code: z.string().min(1, "Mã nông dân không hợp lệ"),
  userId: z.string().min(1, "User ID không hợp lệ"),
});
