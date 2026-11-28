import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

// Breadcrumb cùng phong cách với components/front-end/Breadcrumb.jsx
// (dùng cho trang Search/Market không có slug danh mục)
export default function Breadcrumb({ label = "Trang chủ" }) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-1 text-slate-500 text-sm min-[400px]:mb-8 dark:text-slate-400">
      <span className="flex items-center gap-1">
        <Link
          className="flex items-center gap-1 transition-colors hover:text-lime-600 dark:hover:text-lime-400"
          href="/"
        >
          <Home className="h-4 w-4" />
          Trang chủ
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0" />
      </span>
      <span className="min-w-0 break-words font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
    </nav>
  );
}
