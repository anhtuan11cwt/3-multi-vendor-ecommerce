import { z } from "zod";

// Ngày sinh không được sau ngày hôm nay (so sánh theo ngày trên lịch)
function isNotInFuture(value) {
  if (!value) return true;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  // Kiểm tra ngày hợp lệ (ví dụ 2026-02-30 không tồn tại)
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return false;
  }

  const now = new Date();
  const pad = (number) => String(number).padStart(2, "0");
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  return value <= today;
}

export const customerProfileSchema = z.object({
  dateOfBirth: z
    .string()
    .optional()
    .refine(isNotInFuture, "Ngày sinh không được là ngày trong tương lai"),
  email: z.string().trim().email("Email không hợp lệ"),
  fullName: z
    .string()
    .trim()
    .min(1, "Họ và tên không được để trống")
    .max(100, "Họ và tên tối đa 100 ký tự"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(|0[35789]\d{8})$/,
      "Số điện thoại phải đúng 10 chữ số và bắt đầu bằng 0",
    ),
  provinceCode: z.string().optional(),
  streetAddress: z.string().trim().optional(),
  wardCode: z.string().optional(),
});
