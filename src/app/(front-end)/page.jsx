import Categories from "@/components/front-end/Categories";
import CommunityTrainings from "@/components/front-end/CommunityTrainings";
import Hero from "@/components/front-end/Hero";
import MarketList from "@/components/front-end/MarketList";
import { getData } from "@/lib/getData";

export default async function Home() {
  const categoriesData = await getData("categories");
  const categories = (
    Array.isArray(categoriesData) ? categoriesData : []
  ).filter((category) => (category.products?.length ?? 0) > 3);

  return (
    <>
      <Hero />
      <MarketList />
      <Categories categories={categories} />
      <CommunityTrainings />
    </>
  );
}
