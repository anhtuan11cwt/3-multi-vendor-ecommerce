import { z } from "zod";
import { vietnameseNameSchema, vietnamesePhoneSchema } from "./common";

export const farmerSchema = z.object({
  contactPerson: vietnameseNameSchema.optional().or(z.literal("")),
  contactPersonPhone: vietnamesePhoneSchema.optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean().default(false),
  name: vietnameseNameSchema,
  notes: z.string().trim().optional(),
  paymentTerms: z.string().trim().optional(),
  phone: vietnamesePhoneSchema.min(1, "Số điện thoại là bắt buộc"),
  physicalAddress: z.string().trim().optional(),
});

export const farmerApiSchema = farmerSchema.extend({
  code: z.string().min(1, "Mã nông dân không hợp lệ"),
});
