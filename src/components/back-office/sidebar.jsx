"use client";

import {
  ChevronDown,
  FolderTree,
  Image,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sliders,
  Store,
  Tags,
  Ticket,
  Truck,
  UserCog,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-provider";

const catalogLinks = [
  { href: "/dashboard/products", icon: Package, label: "Sản phẩm" },
  { href: "/dashboard/categories", icon: Tags, label: "Danh mục" },
  { href: "/dashboard/attributes", icon: Sliders, label: "Thuộc tính" },
  { href: "/dashboard/coupons", icon: Ticket, label: "Mã giảm giá" },
  { href: "/dashboard/banners", icon: Image, label: "Banner" },
];

const navLinks = [
  { href: "/dashboard/customers", icon: Users, label: "Khách hàng" },
  { href: "/dashboard/markets", icon: Store, label: "Chợ" },
  { href: "/dashboard/farmers", icon: Truck, label: "Nông dân" },
  { href: "/dashboard/orders", icon: ShoppingBag, label: "Đơn hàng" },
  { href: "/dashboard/staff", icon: UserCog, label: "Nhân viên" },
  { href: "/dashboard/settings", icon: Settings, label: "Cài đặt" },
  { href: "/", icon: ShoppingCart, label: "Cửa hàng trực tuyến" },
];

function SidebarContent() {
  const pathname = usePathname();
  const [catalogOpen, setCatalogOpen] = useState(
    catalogLinks.some((link) => pathname.startsWith(link.href)),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 py-5">
        <h1 className="font-bold text-xl">LIMME</h1>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          <li>
            <Button
              className="w-full justify-start gap-3"
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
            >
              <Link className="flex items-center gap-3" href="/dashboard">
                <LayoutDashboard size={18} />
                Bảng điều khiển
              </Link>
            </Button>
          </li>

          <li>
            <Button
              className="w-full justify-between"
              onClick={() => setCatalogOpen((p) => !p)}
              variant={
                catalogLinks.some((l) => pathname.startsWith(l.href))
                  ? "secondary"
                  : "ghost"
              }
            >
              <span className="flex items-center gap-3">
                <FolderTree size={18} />
                Danh mục
              </span>
              <ChevronDown
                className={cn(
                  "transition-transform duration-200",
                  catalogOpen && "rotate-180",
                )}
                size={14}
              />
            </Button>
            {catalogOpen && (
              <ul className="mt-1 ml-4 space-y-0.5 border-l pl-3">
                {catalogLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Button
                        className="w-full justify-start gap-2"
                        size="sm"
                        variant={isActive ? "secondary" : "ghost"}
                      >
                        <Link
                          className="flex items-center gap-2"
                          href={link.href}
                        >
                          <Icon size={14} />
                          {link.label}
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Button
                  className="w-full justify-start gap-3"
                  variant={isActive ? "secondary" : "ghost"}
                >
                  <Link className="flex items-center gap-3" href={link.href}>
                    <Icon size={18} />
                    {link.label}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default function Sidebar() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden border-r bg-background lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet onOpenChange={(open) => (open ? toggle() : close())} open={isOpen}>
        <Button
          className="fixed top-3 left-3 z-40 lg:hidden"
          onClick={toggle}
          size="icon-sm"
          variant="ghost"
        >
          <Menu size={20} />
          <span className="sr-only">Chuyển đổi menu</span>
        </Button>
        <SheetContent className="w-60 p-0" side="left">
          <SheetTitle className="sr-only">Điều hướng</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
