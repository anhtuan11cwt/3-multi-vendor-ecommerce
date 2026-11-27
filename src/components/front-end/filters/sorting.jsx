import Link from "next/link";

const sortOptions = [
  { label: "Liên quan", value: "relevance" },
  { label: "Giá cao đến thấp", value: "price-desc" },
  { label: "Giá thấp đến cao", value: "price-asc" },
];

export default function Sorting({ label = "Sản phẩm" }) {
  return (
    <div className="flex flex-col gap-3 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-900">
      <h2 className="font-semibold text-lg text-slate-900 sm:text-xl dark:text-slate-100">
        {label}
      </h2>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <p className="text-slate-500 text-sm dark:text-slate-400">
          Sắp xếp theo
        </p>
        {sortOptions.map((option) => (
          <Link
            className="border border-slate-500 px-2 py-1 text-slate-700 text-sm transition-colors hover:border-lime-500 hover:text-lime-600 dark:text-slate-300"
            href={`?sort=${option.value}`}
            key={option.value}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
