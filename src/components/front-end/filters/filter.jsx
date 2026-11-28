import { Suspense } from "react";
import PageBreadcrumb from "@/components/front-end/Breadcrumb";
import Breadcrumb from "./breadcrumb";
import FilteredProducts from "./filtered-products";
import Filters from "./filters";
import Sorting from "./sorting";

export default function Filter({
  category,
  label = "Sản phẩm",
  products,
  searchQuery,
}) {
  const title = category?.title ?? label;
  const slug = category?.slug ?? null;
  const list = Array.isArray(products)
    ? products
    : Array.isArray(category?.products)
      ? category.products
      : [];

  return (
    <div className="space-y-4 min-[400px]:space-y-6">
      {slug ? (
        // Trang danh mục: dùng chung Breadcrumb với trang chi tiết sản phẩm / giỏ hàng
        // → Trang chủ › Danh mục › Tên danh mục
        <PageBreadcrumb items={{ [slug]: title }} />
      ) : (
        <Breadcrumb label={title} />
      )}

      <Suspense
        fallback={
          <div className="h-14 rounded-lg bg-white dark:bg-slate-900" />
        }
      >
        <Sorting label={title} slug={slug} />
      </Suspense>

      <div className="grid grid-cols-12 gap-3 sm:gap-4">
        <aside className="col-span-12 md:col-span-3">
          <Suspense
            fallback={
              <div className="h-40 rounded-lg bg-white dark:bg-slate-900" />
            }
          >
            <Filters slug={slug} />
          </Suspense>
        </aside>
        <section className="col-span-12 md:col-span-9">
          <FilteredProducts products={list} searchQuery={searchQuery} />
        </section>
      </div>
    </div>
  );
}
