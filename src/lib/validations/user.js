import { z } from "zod";
import { passwordSchema, vietnameseNameSchema } from "./common";

export const registerSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  name: vietnameseNameSchema,
  password: passwordSchema,
  role: z.enum(["USER", "FARMER"]).default("USER"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
});

export const updatePasswordSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Mã người dùng không được để trống")
    .regex(/^[0-9a-f]{24}$/i, "Mã người dùng không hợp lệ"),
  password: passwordSchema,
});

export const resetPasswordSchema = z
  .object({
    confirmPassword: z.string().trim().min(1, "Vui lòng xác nhận mật khẩu"),
    password: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });
