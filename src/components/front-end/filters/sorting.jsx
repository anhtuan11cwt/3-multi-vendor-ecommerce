"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Sorting({ label = "Sản phẩm", slug }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const basePath = slug ? `/category/${slug}` : null;

  const sortingLinks = basePath
    ? [
        { href: basePath, sort: null, title: "A to Z" },
        {
          href: `${basePath}?sort=desc`,
          sort: "desc",
          title: "Giá: Cao đến thấp",
        },
        {
          href: `${basePath}?sort=asc`,
          sort: "asc",
          title: "Giá: Thấp đến cao",
        },
      ]
    : [];

  const currentSort = searchParams.get("sort");

  const isActive = (link) =>
    pathname === basePath && (link.sort ?? null) === (currentSort ?? null);

  return (
    <div className="flex flex-col gap-3 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between min-[400px]:px-4 min-[400px]:py-4 dark:bg-slate-900">
      <h2 className="min-w-0 break-words font-medium text-lg text-slate-900 sm:text-xl dark:text-slate-100">
        {label}
      </h2>
      {sortingLinks.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 min-[400px]:gap-3">
          <p className="text-slate-500 text-xs min-[400px]:text-sm dark:text-slate-400">
            Sắp xếp theo
          </p>
          {sortingLinks.map((link) => (
            <Link
              className={`border px-1.5 py-1 text-sm transition-colors min-[400px]:px-2 ${
                isActive(link)
                  ? "border-lime-500 bg-slate-800 text-lime-400"
                  : "border-slate-500 text-slate-700 hover:border-lime-500 hover:text-lime-600 dark:text-slate-300"
              }`}
              href={link.href}
              key={link.href}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
