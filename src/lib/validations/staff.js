import { z } from "zod";
import { vietnameseNameSchema, vietnamesePhoneSchema } from "./common";

export const staffSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  fullName: vietnameseNameSchema,
  isActive: z.boolean().default(true),
  notes: z.string().trim().optional(),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  phone: vietnamesePhoneSchema,
  physicalAddress: z.string().trim().optional(),
});

export const staffApiSchema = staffSchema.extend({
  code: z.string().min(1, "Mã nhân viên không hợp lệ"),
});
