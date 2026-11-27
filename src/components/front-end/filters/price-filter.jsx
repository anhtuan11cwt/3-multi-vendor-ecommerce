import { Plus } from "lucide-react";
import Link from "next/link";

const priceRanges = [
  { displayName: "Dưới 200.000đ", max: 200000, min: undefined },
  { displayName: "200.000đ - 400.000đ", max: 400000, min: 200000 },
  { displayName: "400.000đ - 500.000đ", max: 500000, min: 400000 },
  { displayName: "500.000đ - 700.000đ", max: 700000, min: 500000 },
  { displayName: "Trên 700.000đ", max: undefined, min: 700000 },
];

function buildHref(range) {
  const params = new URLSearchParams();
  if (range.min !== undefined) params.set("min", String(range.min));
  if (range.max !== undefined) params.set("max", String(range.max));
  const query = params.toString();
  return query ? `?${query}` : "?";
}

export default function PriceFilter() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="font-semibold text-slate-900 text-sm dark:text-slate-100">
            Khoảng giá
          </h3>
          <Plus className="h-4 w-4 text-slate-500" />
        </div>
        <button
          className="text-slate-400 text-xs transition-colors hover:text-lime-600"
          type="button"
        >
          Xóa lọc
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {priceRanges.map((range) => (
          <li key={range.displayName}>
            <Link
              className="text-slate-600 text-sm transition-colors hover:text-lime-600 dark:text-slate-400"
              href={buildHref(range)}
            >
              {range.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
