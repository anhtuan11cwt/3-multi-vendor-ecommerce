import BrandFilter from "./brand-filter";
import PriceFilter from "./price-filter";

export default function Filters({ slug }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 min-[400px]:gap-4 min-[400px]:p-4 dark:bg-slate-900">
      <PriceFilter slug={slug} />
      <BrandFilter />
    </div>
  );
}
