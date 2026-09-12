import { z } from "zod";
import { vietnameseNameSchema, vietnamesePhoneSchema } from "./common";

const maxDob = new Date();
maxDob.setFullYear(maxDob.getFullYear() - 18);
const maxDobString = maxDob.toISOString().split("T")[0];

const passwordSchema = z
  .string()
  .trim()
  .min(1, "Mật khẩu không được để trống")
  .min(8, "Mật khẩu tối thiểu 8 ký tự")
  .max(20, "Mật khẩu tối đa 20 ký tự")
  .regex(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
  .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
  .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số")
  .regex(
    /[^a-zA-Z0-9]/,
    "Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*...)",
  );

export const staffSchema = z.object({
  cccd: z.string().length(12, "CCCD phải đúng 12 số"),
  dob: z
    .string()
    .min(1, "Ngày sinh là bắt buộc")
    .refine((val) => val <= maxDobString, "Nhân viên phải từ 18 tuổi trở lên"),
  email: z.string().trim().email("Email không hợp lệ"),
  fullName: vietnameseNameSchema,
  isActive: z.boolean().default(true),
  notes: z.string().trim().optional(),
  password: passwordSchema,
  phone: vietnamesePhoneSchema,
  physicalAddress: z.string().trim().optional(),
});

export const staffApiSchema = staffSchema.extend({
  code: z.string().min(1, "Mã nhân viên không hợp lệ"),
});
