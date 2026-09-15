import { redirect } from "next/navigation";
import UpdateProductForm from "@/components/back-office/UpdateProductForm";
import { getData } from "@/lib/getData";

export default async function UpdateProductPage({ params }) {
  const { id } = await params;

  const [product, categoriesData, usersData] = await Promise.all([
    getData(`products/${id}`),
    getData("categories"),
    getData("users"),
  ]);

  if (!product?.id) {
    redirect("/dashboard/products");
  }

  const categories = categoriesData.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  const farmers = (usersData.data || [])
    .filter((u) => u.role === "FARMER")
    .map((f) => ({
      id: f.id,
      title: f.name,
    }));

  return (
    <UpdateProductForm
      categories={categories}
      farmers={farmers}
      product={product}
    />
  );
}
