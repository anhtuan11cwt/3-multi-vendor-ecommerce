import { z } from "zod";

// Input rỗng ("" ) từ form nên được coi là undefined cho các field optional,
// tránh bị coerce thành 0/enum không hợp lệ và chặn submit âm thầm.
const emptyToUndefined = (value) => (value === "" ? undefined : value);

export const productSchema = z.object({
  barcode: z.string().optional(),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  description: z.string().optional(),
  farmerId: z.string().min(1, "Vui lòng chọn nông dân"),
  isActive: z.boolean().default(true),
  isWholesale: z.boolean().default(false),
  productPrice: z.coerce
    .number()
    .min(15000, "Giá sản phẩm tối thiểu là 15.000đ"),
  productStock: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(0).optional(),
  ),
  quantity: z.coerce.number().min(1).default(1),
  SKU: z.string().optional(),
  salePrice: z.preprocess(
    emptyToUndefined,
    z.coerce
      .number()
      .min(0, "Giá khuyến mãi phải lớn hơn hoặc bằng 0")
      .optional(),
  ),
  tags: z.array(z.string()).optional().default([]),
  title: z
    .string()
    .min(1, "Tên sản phẩm không được để trống")
    .max(100, "Tên sản phẩm tối đa 100 ký tự"),
  unit: z.preprocess(
    emptyToUndefined,
    z
      .enum(["Kg", "Gram", "Lít", "Cái", "Hộp", "Gói", "Bó", "Túi", "Thùng"])
      .optional(),
  ),
  wholesalePrice: z.preprocess(
    emptyToUndefined,
    z.coerce
      .number()
      .min(15000, "Giá bán buôn tối thiểu là 15.000đ")
      .optional(),
  ),
  wholesaleQuantity: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(1).optional(),
  ),
});

export const productApiSchema = productSchema.extend({
  imageUrl: z
    .string()
    .url("Ảnh sản phẩm là bắt buộc")
    .optional()
    .or(z.literal("")),
  productCode: z.string().optional(),
  productImages: z
    .array(z.string().url("Ảnh sản phẩm không hợp lệ"))
    .optional()
    .default([]),
  slug: z.string().min(1, "Đường dẫn ngắn không hợp lệ"),
});
