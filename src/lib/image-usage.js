import db from "@/lib/db";

/**
 * Trả về tập hợp các URL trong danh sách còn đang được tham chiếu
 * bởi bất kỳ bản ghi nào trong CSDL (danh mục, sản phẩm, đơn hàng...).
 *
 * Nhiều bản ghi có thể dùng chung1 URL ảnh — nên trước khi xóa file
 * trên Cloudinary phải kiểm tra ở đây để không làm hỏng ảnh bên khác.
 *
 * Nếu không kiểm tra được → coi tất cả là "đang dùng" (không xóa) cho an toàn.
 */
export async function findImagesInUse(urls) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  const inUse = new Set();
  if (uniqueUrls.length === 0) return inUse;

  try {
    const [
      users,
      userProfiles,
      farmerProfiles,
      products,
      categories,
      markets,
      trainings,
      banners,
      orderItems,
      sales,
    ] = await Promise.all([
      db.user.findMany({
        select: { image: true },
        where: { image: { in: uniqueUrls } },
      }),
      db.userProfile.findMany({
        select: { profileImage: true },
        where: { profileImage: { in: uniqueUrls } },
      }),
      db.farmerProfile.findMany({
        select: { profileImageUrl: true },
        where: { profileImageUrl: { in: uniqueUrls } },
      }),
      db.product.findMany({
        select: { imageUrl: true, productImages: true },
        where: {
          OR: [
            { imageUrl: { in: uniqueUrls } },
            { productImages: { hasSome: uniqueUrls } },
          ],
        },
      }),
      db.category.findMany({
        select: { imageUrl: true },
        where: { imageUrl: { in: uniqueUrls } },
      }),
      db.market.findMany({
        select: { imageUrl: true },
        where: { imageUrl: { in: uniqueUrls } },
      }),
      db.training.findMany({
        select: { imageUrl: true },
        where: { imageUrl: { in: uniqueUrls } },
      }),
      db.banner.findMany({
        select: { imageUrl: true },
        where: { imageUrl: { in: uniqueUrls } },
      }),
      db.orderItem.findMany({
        select: { imageUrl: true },
        where: { imageUrl: { in: uniqueUrls } },
      }),
      db.sale.findMany({
        select: { productImage: true },
        where: { productImage: { in: uniqueUrls } },
      }),
    ]);

    const candidates = [
      ...users.map((record) => record.image),
      ...userProfiles.map((record) => record.profileImage),
      ...farmerProfiles.map((record) => record.profileImageUrl),
      ...products.flatMap((record) => [
        record.imageUrl,
        ...(record.productImages || []),
      ]),
      ...categories.map((record) => record.imageUrl),
      ...markets.map((record) => record.imageUrl),
      ...trainings.map((record) => record.imageUrl),
      ...banners.map((record) => record.imageUrl),
      ...orderItems.map((record) => record.imageUrl),
      ...sales.map((record) => record.productImage),
    ];

    candidates.forEach((value) => {
      if (value && uniqueUrls.includes(value)) inUse.add(value);
    });
  } catch (error) {
    console.warn(
      "Không kiểm tra được ảnh đang dùng, bỏ qua việc xóa để an toàn:",
      error.message,
    );
    uniqueUrls.forEach((url) => {
      inUse.add(url);
    });
  }

  return inUse;
}
