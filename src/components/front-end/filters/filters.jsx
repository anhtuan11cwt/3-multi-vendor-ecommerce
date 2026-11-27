import BrandFilter from "./brand-filter";
import PriceFilter from "./price-filter";

export default function Filters() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-slate-900">
      <PriceFilter />
      <BrandFilter />
    </div>
  );
}
