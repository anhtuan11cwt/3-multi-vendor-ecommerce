import { getData } from "@/lib/getData";
import MarketCarousel from "./MarketCarousel";

export default async function MarketList() {
  const markets = await getData("markets");

  return (
    <section className="py-8">
      <MarketCarousel markets={markets} />
    </section>
  );
}
