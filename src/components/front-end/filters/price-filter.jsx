"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const priceRanges = [
  { displayName: "Dưới 200.000đ", max: 200000, min: undefined },
  { displayName: "200.000đ - 400.000đ", max: 400000, min: 200000 },
  { displayName: "400.000đ - 500.000đ", max: 500000, min: 400000 },
  { displayName: "500.000đ - 700.000đ", max: 700000, min: 500000 },
  { displayName: "Trên 700.000đ", max: undefined, min: 700000 },
];

function buildHref(slug, range) {
  const params = new URLSearchParams();
  params.set("sort", "asc");
  if (range.min !== undefined) params.set("min", String(range.min));
  if (range.max !== undefined) params.set("max", String(range.max));
  return `/category/${slug}?${params.toString()}`;
}

export default function PriceFilter({ slug }) {
  const searchParams = useSearchParams();

  // Bộ lọc giá chỉ có ý nghĩa trên trang danh mục (cần slug để dựng URL)
  if (!slug) return null;

  const currentMin = searchParams.get("min");
  const currentMax = searchParams.get("max");
  const hasActiveFilter = currentMin !== null || currentMax !== null;

  const isActive = (range) => {
    const rangeMin = range.min !== undefined ? String(range.min) : null;
    const rangeMax = range.max !== undefined ? String(range.max) : null;
    return rangeMin === currentMin && rangeMax === currentMax;
  };

  return (
    <div className="flex flex-col gap-2.5 min-[400px]:gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="font-semibold text-slate-900 text-sm dark:text-slate-100">
            Khoảng giá
          </h3>
          <Plus className="h-4 w-4 text-slate-500" />
        </div>
        <Link
          className={`text-xs transition-colors ${
            hasActiveFilter
              ? "font-medium text-lime-600 hover:text-lime-700"
              : "text-slate-400 hover:text-lime-600"
          }`}
          href={`/category/${slug}`}
        >
          Xóa lọc
        </Link>
      </div>

      <ul className="flex flex-col gap-1">
        {priceRanges.map((range) => (
          <li key={range.displayName}>
            <Link
              className={`-mx-2 min-w-0 break-words rounded-md px-2 py-1 text-sm leading-snug transition-colors ${
                isActive(range)
                  ? "bg-slate-800 font-medium text-lime-400"
                  : "text-slate-600 hover:text-lime-600 dark:text-slate-400"
              }`}
              href={buildHref(slug, range)}
            >
              {range.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
