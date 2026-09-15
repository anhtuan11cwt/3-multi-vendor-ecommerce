import NewMarketForm from "@/components/back-office/NewMarketForm";
import { getData } from "@/lib/getData";

export default async function NewMarketPage() {
  const categoriesData = await getData("categories");

  const categories = categoriesData.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  return <NewMarketForm categories={categories} />;
}
