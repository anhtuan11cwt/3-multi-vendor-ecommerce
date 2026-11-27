import Breadcrumb from "./breadcrumb";
import FilteredProducts from "./filtered-products";
import Filters from "./filters";
import Sorting from "./sorting";

export default function Filter({ label = "Sản phẩm", products, searchQuery }) {
  return (
    <div className="space-y-6">
      <Breadcrumb label={label} />
      <Sorting label={label} />

      <div className="grid grid-cols-12 gap-3 sm:gap-4">
        <aside className="col-span-12 md:col-span-3">
          <Filters />
        </aside>
        <section className="col-span-12 md:col-span-9">
          <FilteredProducts products={products} searchQuery={searchQuery} />
        </section>
      </div>
    </div>
  );
}
