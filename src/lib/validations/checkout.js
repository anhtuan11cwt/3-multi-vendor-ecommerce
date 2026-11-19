import { z } from "zod";
import { vietnameseNameSchema, vietnamesePhoneSchema } from "./common";

export const shippingOptions = [
  {
    cost: 15000,
    id: "shipping-standard",
    label: "Tiêu chuẩn",
    time: "3 - 5 ngày",
  },
  { cost: 40000, id: "shipping-express", label: "Nhanh", time: "1 - 2 ngày" },
];

const shippingCosts = shippingOptions.map((option) => option.cost);

export const paymentMethodValues = ["cod", "credit-card"];

export const personalDetailsSchema = z.object({
  email: z
    .string({ error: "Email không hợp lệ" })
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  fullName: vietnameseNameSchema,
  phone: vietnamesePhoneSchema,
});

export const shippingDetailsSchema = z.object({
  province: z.string().trim().optional(),
  provinceCode: z
    .string({ error: "Vui lòng chọn tỉnh/thành phố" })
    .min(1, "Vui lòng chọn tỉnh/thành phố"),
  shippingCost: z.coerce
    .number({ error: "Vui lòng chọn phí vận chuyển" })
    .refine((value) => shippingCosts.includes(value), {
      message: "Phí vận chuyển không hợp lệ",
    }),
  streetAddress: z
    .string({ error: "Địa chỉ không hợp lệ" })
    .trim()
    .min(1, "Địa chỉ không được để trống")
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  ward: z.string().trim().optional(),
  wardCode: z
    .string({ error: "Vui lòng chọn phường/xã" })
    .min(1, "Vui lòng chọn phường/xã"),
});

export const paymentMethodSchema = z.object({
  paymentMethod: z
    .string({ error: "Vui lòng chọn phương thức thanh toán" })
    .min(1, "Vui lòng chọn phương thức thanh toán")
    .refine((value) => paymentMethodValues.includes(value), {
      message: "Phương thức thanh toán không hợp lệ",
    }),
});

export const checkoutSchema = z.object({
  ...personalDetailsSchema.shape,
  ...shippingDetailsSchema.shape,
  ...paymentMethodSchema.shape,
});

const orderItemSchema = z.object({
  id: z.union([z.string().min(1), z.number()], {
    error: "Mã sản phẩm không hợp lệ",
  }),
  imageUrl: z.string().trim().optional(),
  price: z.coerce
    .number({ error: "Giá sản phẩm không hợp lệ" })
    .min(15000, "Giá sản phẩm tối thiểu 15.000đ"),
  quantity: z.coerce
    .number({ error: "Số lượng không hợp lệ" })
    .int("Số lượng phải là số nguyên")
    .min(1, "Số lượng không hợp lệ"),
  title: z
    .string({ error: "Tên sản phẩm không hợp lệ" })
    .min(1, "Tên sản phẩm không hợp lệ"),
});

export const orderApiSchema = z.object({
  ...checkoutSchema.shape,
  items: z
    .array(orderItemSchema, { error: "Danh sách sản phẩm không hợp lệ" })
    .min(1, "Đơn hàng phải có ít nhất 1 sản phẩm"),
  subtotal: z.coerce
    .number({ error: "Tạm tính không hợp lệ" })
    .min(0, "Tạm tính không hợp lệ"),
  total: z.coerce
    .number({ error: "Tổng cộng không hợp lệ" })
    .min(0, "Tổng cộng không hợp lệ"),
});
