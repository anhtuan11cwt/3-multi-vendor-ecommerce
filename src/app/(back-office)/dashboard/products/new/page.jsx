import NewProductForm from "@/components/back-office/NewProductForm";
import { getData } from "@/lib/getData";

// Trang nằm sau proxy đăng nhập — render theo request để luôn lấy
// danh mục/nông dân mới nhất và không fetch server lúc build (prerender).
export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categoriesData, farmersData] = await Promise.all([
    getData("categories"),
    getData("farmers"),
  ]);

  const categories = categoriesData.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  // Product.farmerId là FarmerProfile.id (relation bắt buộc),
  // không phải User.id — lấy từ /api/farmers (kèm farmerProfile).
  const farmers = (farmersData.data || [])
    .filter((f) => f.farmerProfile?.id)
    .map((f) => ({
      id: f.farmerProfile.id,
      title: f.farmerProfile.name || f.name,
    }));

  return <NewProductForm categories={categories} farmers={farmers} />;
}
