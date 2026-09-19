import Image from "next/image";
import Link from "next/link";
import { getData } from "@/lib/getData";

export default async function SideBarCategories() {
  const categories = await getData("categories");

  return (
    <>
      {categories.map((category) => (
        <Link
          className="flex items-center gap-3 px-4 py-2 text-slate-700 text-sm transition-all duration-300 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
          href={`/category/${category.slug}`}
          key={category.id}
        >
          {category.imageUrl ? (
            <Image
              alt={category.title}
              className="h-10 w-10 rounded-full object-cover"
              height={40}
              src={category.imageUrl}
              width={40}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-600" />
          )}
          <span>{category.title}</span>
        </Link>
      ))}
    </>
  );
}
