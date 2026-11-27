import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Breadcrumb({ label = "Trang chủ" }) {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <nav className="flex min-w-0 items-center gap-1 text-[0.75rem]">
        <Link
          className="shrink-0 transition-colors hover:text-lime-600"
          href="/"
        >
          Trang chủ
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
        <span className="truncate font-medium">{label}</span>
      </nav>
    </div>
  );
}
