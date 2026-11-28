import Link from "next/link";
import Breadcrumb from "@/components/front-end/Breadcrumb";
import SafeImage from "@/components/front-end/SafeImage";
import { getData } from "@/lib/getData";

export default async function CategoryIndexPage() {
  const categories = await getData("categories");

  // Chỉ hiển thị danh mục thực sự có sản phẩm (như sidebar trang chủ)
  const visibleCategories = (
    Array.isArray(categories) ? categories : []
  ).filter((category) => (category.products?.length || 0) > 0);

  return (
    <div>
      <Breadcrumb />

      <h1 className="mb-3 font-bold text-lg text-slate-800 sm:mb-6 sm:text-2xl min-[400px]:text-xl dark:text-slate-100">
        Danh mục sản phẩm
      </h1>

      {visibleCategories.length === 0 ? (
        <p className="py-12 text-center text-slate-500 text-sm dark:text-slate-400">
          Chưa có danh mục nào.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 min-[1024px]:grid-cols-4 min-[640px]:grid-cols-3 min-[400px]:gap-3 min-[640px]:gap-4">
          {visibleCategories.map((category) => (
            <Link
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-lime-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-lime-600"
              href={`/category/${category.slug}`}
              key={category.id}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                <SafeImage
                  alt={category.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackClassName="absolute inset-0"
                  fallbackLabel="Không có ảnh"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  src={category.imageUrl}
                />
              </div>
              <div className="min-w-0 p-2 min-[400px]:p-3">
                <h2 className="break-words font-medium text-slate-800 text-sm min-[400px]:text-base dark:text-slate-100">
                  {category.title}
                </h2>
                <p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
                  {category.products.length} sản phẩm
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
