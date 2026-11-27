import db from "@/lib/db";

/**
 * Trả về FarmerProfile.id hợp lệ cho relation bắt buộc `Product.farmer`.
 *
 * Chấp nhận cả FarmerProfile.id lẫn User.id (role FARMER) để các client
 * gửi sai ID không làm hỏng trang danh sách (Prisma lỗi khi include
 * farmer với farmerId không tồn tại).
 *
 * Trả về null nếu không phân giải được.
 */
export async function resolveFarmerId(farmerId) {
  if (!farmerId || typeof farmerId !== "string") return null;

  try {
    const profile = await db.farmerProfile.findUnique({
      where: { id: farmerId },
    });
    if (profile) return profile.id;

    const user = await db.user.findUnique({ where: { id: farmerId } });
    if (user?.role === "FARMER") {
      const byUser = await db.farmerProfile.findUnique({
        where: { userId: user.id },
      });
      if (byUser) return byUser.id;
    }
  } catch {
    return null;
  }

  return null;
}
