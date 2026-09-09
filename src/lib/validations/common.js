import { z } from "zod";

export const vietnameseNameSchema = z
  .string()
  .trim()
  .min(1, "Họ tên không được để trống")
  .min(2, "Họ tên phải có ít nhất 2 ký tự")
  .max(100, "Họ tên tối đa 100 ký tự")
  .regex(
    /^(?:[a-zA-ZÀ-ỹ]|Đ)+(?:\s+(?:[a-zA-ZÀ-ỹ]|Đ)+)*$/,
    "Họ tên chỉ được chứa chữ cái và khoảng trắng giữa các từ",
  );

export const vietnamesePhoneSchema = z
  .string()
  .trim()
  .min(1, "Số điện thoại không được để trống")
  .regex(
    /^0[35789]\d{8}$/,
    "Số điện thoại phải đúng 10 chữ số, bắt đầu bằng 0 và thuộc đầu số di động hợp lệ (03x, 05x, 07x, 08x, 09x)",
  );
