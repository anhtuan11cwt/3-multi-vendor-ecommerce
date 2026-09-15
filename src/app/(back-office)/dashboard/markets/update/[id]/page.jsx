import { redirect } from "next/navigation";
import UpdateMarketForm from "@/components/back-office/UpdateMarketForm";
import { getData } from "@/lib/getData";

export default async function UpdateMarketPage({ params }) {
  const { id } = await params;

  const [market, categoriesData] = await Promise.all([
    getData(`markets/${id}`),
    getData("categories"),
  ]);

  if (!market?.id) {
    redirect("/dashboard/markets");
  }

  const categories = categoriesData.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  return <UpdateMarketForm categories={categories} market={market} />;
}
