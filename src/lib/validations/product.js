import { z } from "zod";

export const productSchema = z.object({
  barcode: z.string().optional(),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  description: z.string().optional(),
  farmerId: z.string().min(1, "Vui lòng chọn nông dân"),
  productPrice: z.coerce
    .number()
    .min(15000, "Giá sản phẩm tối thiểu là 15.000đ"),
  SKU: z.string().optional(),
  salePrice: z.coerce
    .number()
    .min(0, "Giá khuyến mãi phải lớn hơn hoặc bằng 0")
    .optional(),
  tags: z.array(z.string()).optional().default([]),
  title: z
    .string()
    .min(1, "Tên sản phẩm không được để trống")
    .max(100, "Tên sản phẩm tối đa 100 ký tự"),
});

export const productApiSchema = productSchema.extend({
  imageUrl: z
    .string()
    .url("Ảnh sản phẩm là bắt buộc")
    .optional()
    .or(z.literal("")),
  slug: z.string().min(1, "Đường dẫn ngắn không hợp lệ"),
});
