import NewProductForm from "@/components/back-office/NewProductForm";
import { getData } from "@/lib/getData";

export default async function NewProductPage() {
  const categoriesData = await getData("categories");
  const usersData = await getData("users");

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

  return <NewProductForm categories={categories} farmers={farmers} />;
}
