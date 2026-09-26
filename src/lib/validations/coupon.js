import { z } from "zod";

const minDate = new Date().toISOString().split("T")[0];

export const couponSchema = z.object({
  expiryDate: z
    .string()
    .min(1, "Ngày hết hạn là bắt buộc")
    .refine((val) => val > minDate, "Ngày hết hạn phải lớn hơn ngày hiện tại"),
  isActive: z.boolean().default(true),
  title: z
    .string()
    .min(1, "Tên chiến dịch không được để trống")
    .max(100, "Tên chiến dịch tối đa 100 ký tự"),
});

export const couponApiSchema = couponSchema.extend({
  couponCode: z.string().min(1, "Mã giảm giá không hợp lệ"),
});

export const couponUpdateSchema = couponSchema
  .omit({ expiryDate: true })
  .extend({
    expiryDate: z.string().min(1, "Ngày hết hạn là bắt buộc"),
  });

export const couponUpdateApiSchema = couponUpdateSchema.extend({
  couponCode: z.string().min(1, "Mã giảm giá không hợp lệ"),
});
