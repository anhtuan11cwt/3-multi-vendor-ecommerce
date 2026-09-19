import Link from "next/link";
import CategoryCarousel from "./CategoryCarousel";

export default function Categories({ categories = [] }) {
  return (
    <section className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-2xl text-lime-600 dark:text-lime-500">
          Danh mục sản phẩm
        </h2>
        <Link
          className="rounded-md bg-slate-900 px-4 py-2 font-medium text-slate-50 text-sm transition-all hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
          href="/category"
        >
          Xem tất cả
        </Link>
      </div>
      {categories.map((category, index) => (
        <div className="mb-8" key={category.id ?? index}>
          <h3 className="mb-3 font-semibold text-lg text-slate-800 dark:text-slate-200">
            {category.title}
          </h3>
          <CategoryCarousel products={category.products} />
        </div>
      ))}
    </section>
  );
}
