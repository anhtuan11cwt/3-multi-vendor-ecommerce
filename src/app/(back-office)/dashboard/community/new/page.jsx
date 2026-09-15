import NewTrainingForm from "@/components/back-office/NewTrainingForm";
import { getData } from "@/lib/getData";

export default async function NewTrainingPage() {
  const categoriesData = await getData("categories");

  const categories = categoriesData.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  return <NewTrainingForm categories={categories} />;
}
