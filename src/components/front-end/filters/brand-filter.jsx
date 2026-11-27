import { Plus } from "lucide-react";
import Link from "next/link";

const brands = [
  "Nông Trại Tươi",
  "Thung Lũng Xanh",
  "Đời Sống Hữu Cơ",
  "Thu Hoạch Nắng",
  "Tốt Nhất Thiên Nhiên",
];

export default function BrandFilter() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="font-semibold text-slate-900 text-sm dark:text-slate-100">
            Thương hiệu
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
        {brands.map((brand) => (
          <li key={brand}>
            <Link
              className="text-slate-600 text-sm transition-colors hover:text-lime-600 dark:text-slate-400"
              href={`?brand=${encodeURIComponent(brand)}`}
            >
              {brand}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
