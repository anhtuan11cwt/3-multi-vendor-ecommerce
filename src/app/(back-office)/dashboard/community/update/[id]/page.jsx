import { redirect } from "next/navigation";
import UpdateTrainingForm from "@/components/back-office/UpdateTrainingForm";
import { getData } from "@/lib/getData";

export default async function UpdateTrainingPage({ params }) {
  const { id } = await params;

  const [training, categoriesData] = await Promise.all([
    getData(`trainings/${id}`),
    getData("categories"),
  ]);

  if (!training?.id) {
    redirect("/dashboard/community");
  }

  const categories = categoriesData.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  return <UpdateTrainingForm categories={categories} training={training} />;
}
