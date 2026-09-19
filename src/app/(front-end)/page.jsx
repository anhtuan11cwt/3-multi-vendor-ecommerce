import Categories from "@/components/front-end/Categories";
import CommunityTrainings from "@/components/front-end/CommunityTrainings";
import Hero from "@/components/front-end/Hero";
import MarketList from "@/components/front-end/MarketList";
import { getData } from "@/lib/getData";

export default async function Home() {
  const categories = await getData("categories");

  return (
    <>
      <Hero />
      <MarketList />
      <Categories categories={categories} />
      <CommunityTrainings />
    </>
  );
}
