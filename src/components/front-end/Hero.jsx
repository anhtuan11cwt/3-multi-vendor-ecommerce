import CategorySidebar from "./CategorySidebar";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="mb-6 flex flex-col gap-6 md:flex-row">
      <div className="w-full md:w-1/3">
        <CategorySidebar />
      </div>
      <div className="w-full md:w-2/3">
        <HeroCarousel />
      </div>
    </section>
  );
}
