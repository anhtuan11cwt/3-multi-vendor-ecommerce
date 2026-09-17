import Categories from "@/components/front-end/Categories";
import CommunityTrainings from "@/components/front-end/CommunityTrainings";
import Hero from "@/components/front-end/Hero";
import MarketList from "@/components/front-end/MarketList";

export default function Home() {
  return (
    <>
      <Hero />
      <MarketList />
      <Categories />
      <CommunityTrainings />
    </>
  );
}
