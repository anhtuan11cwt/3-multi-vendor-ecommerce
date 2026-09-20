"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const segmentLabels = {
  cart: "Giỏ hàng",
  category: "Danh mục",
  checkout: "Thanh toán",
  login: "Đăng nhập",
  products: "Sản phẩm",
  register: "Đăng ký",
};

export default function Breadcrumb({ items: customItems }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const defaultItems = [
    { href: "/", icon: Home, label: "Trang chủ" },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;
      const label =
        (isLast && customItems?.[segment]) ||
        segmentLabels[segment] ||
        segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return { href, label };
    }),
  ];

  const items = customItems
    ? [
        { href: "/", icon: Home, label: "Trang chủ" },
        ...segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = isLast
            ? customItems[segment] || segment.replace(/-/g, " ")
            : segmentLabels[segment] ||
              segment
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
          return { href, label };
        }),
      ]
    : defaultItems;

  return (
    <nav className="mb-8 flex items-center gap-1 text-slate-500 text-sm dark:text-slate-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className="flex items-center gap-1" key={item.href}>
            {index > 0 && <ChevronRight className="h-4 w-4 shrink-0" />}
            {isLast ? (
              <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200">
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </span>
            ) : (
              <Link
                className="flex items-center gap-1 transition-colors hover:text-lime-600 dark:hover:text-lime-400"
                href={item.href}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
