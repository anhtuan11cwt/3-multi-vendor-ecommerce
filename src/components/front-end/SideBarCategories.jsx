import Link from "next/link";
import SafeImage from "@/components/front-end/SafeImage";
import { getData } from "@/lib/getData";

export default async function SideBarCategories() {
  const categories = await getData("categories");

  // Chỉ hiển thị danh mục thực sự có sản phẩm để tránh link rỗng
  const visibleCategories = (
    Array.isArray(categories) ? categories : []
  ).filter((category) => (category.products?.length || 0) > 0);

  return (
    <>
      {visibleCategories.map((category) => (
        <Link
          className="flex items-center gap-2 px-2 py-2 text-slate-700 text-sm transition-all duration-300 hover:bg-slate-50 min-[400px]:gap-3 min-[400px]:px-4 dark:text-slate-300 dark:hover:bg-slate-700"
          href={`/category/${category.slug}`}
          key={category.id}
        >
          <SafeImage
            alt={category.title}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
            fallbackClassName="h-10 w-10 shrink-0 rounded-full"
            height={40}
            src={category.imageUrl}
            width={40}
          />
          <span className="min-w-0 break-words">{category.title}</span>
        </Link>
      ))}
    </>
  );
}
