import { redirect } from "next/navigation";
import UpdateProductForm from "@/components/back-office/UpdateProductForm";
import { getData } from "@/lib/getData";

export default async function UpdateProductPage({ params }) {
  const { id } = await params;

  const [product, categoriesData, farmersData] = await Promise.all([
    getData(`products/${id}`),
    getData("categories"),
    getData("farmers"),
  ]);

  if (!product?.id) {
    redirect("/dashboard/products");
  }

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

  return (
    <UpdateProductForm
      categories={categories}
      farmers={farmers}
      product={product}
    />
  );
}
