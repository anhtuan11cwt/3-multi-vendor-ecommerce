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
