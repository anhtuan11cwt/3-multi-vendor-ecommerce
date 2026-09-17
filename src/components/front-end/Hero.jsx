import CategorySidebar from "./CategorySidebar";
import HeroCarousel from "./HeroCarousel";
import SupportLinks from "./SupportLinks";

export default function Hero() {
  return (
    <section className="mb-6 grid grid-cols-12 gap-4">
      <div className="hidden lg:col-span-3 lg:block">
        <CategorySidebar />
      </div>
      <div className="col-span-full lg:col-span-6">
        <HeroCarousel />
      </div>
      <div className="hidden lg:col-span-3 lg:block">
        <SupportLinks />
      </div>
    </section>
  );
}
