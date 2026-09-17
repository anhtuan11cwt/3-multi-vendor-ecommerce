"use client";

import { HelpCircle, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeSwitcherBtn from "@/components/theme-switcher-btn";
import { Badge } from "@/components/ui/badge";
import { categories } from "./CategorySidebar";
import HelpModal from "./HelpModal";

export default function Navbar() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-white dark:bg-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-2 sm:gap-4 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2">
            <Link
              className="shrink-0"
              href="/"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                alt="GreenCart"
                className="h-8 w-auto md:hidden"
                height={32}
                priority
                src="/logo.svg"
                width={120}
              />
            </Link>

            <Link className="hidden shrink-0 md:block" href="/">
              <Image
                alt="GreenCart"
                className="h-8 w-auto"
                height={32}
                priority
                src="/logo.svg"
                width={120}
              />
            </Link>
          </div>

          <form className="hidden flex-1 items-center gap-2 md:flex">
            <div className="relative flex flex-1 items-center">
              <input
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pr-10 pl-3 text-sm outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 dark:border-gray-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400"
                placeholder="Tìm kiếm sản phẩm, danh mục..."
                type="text"
              />
              <button
                className="absolute right-0 flex items-center justify-center rounded-r-md bg-lime-500 px-3 py-2 text-white hover:bg-lime-600"
                type="submit"
              >
                <Search size={16} />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-0 sm:gap-1">
            <ThemeSwitcherBtn />

            <button
              className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 sm:p-2 md:hidden dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={() => setMobileOpen((prev) => !prev)}
              type="button"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              <span className="sr-only">Menu</span>
            </button>

            <Link
              className="relative hidden rounded-md p-2 text-slate-600 hover:bg-slate-100 sm:block dark:text-slate-300 dark:hover:bg-slate-700"
              href="/login"
            >
              <User size={20} />
              <span className="sr-only">Đăng nhập</span>
            </Link>

            <button
              className="relative hidden rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 sm:block dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              onClick={() => setHelpOpen(true)}
              type="button"
            >
              <HelpCircle size={20} />
              <span className="sr-only">Trợ giúp</span>
            </button>

            <Link
              className="relative hidden rounded-md p-2 text-slate-600 hover:bg-slate-100 sm:block dark:text-slate-300 dark:hover:bg-slate-700"
              href="/cart"
            >
              <ShoppingCart size={20} />
              <Badge
                className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]"
                variant="destructive"
              >
                0
              </Badge>
              <span className="sr-only">Giỏ hàng</span>
            </Link>
          </div>
        </div>

        <form className="flex items-center gap-2 px-2 pb-3 sm:px-4 md:hidden">
          <div className="relative flex flex-1 items-center">
            <input
              className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pr-10 pl-3 text-sm outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 dark:border-gray-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400"
              placeholder="Tìm kiếm sản phẩm, danh mục..."
              type="text"
            />
            <button
              className="absolute right-0 flex items-center justify-center rounded-r-md bg-lime-500 px-3 py-2 text-white hover:bg-lime-600"
              type="submit"
            >
              <Search size={16} />
            </button>
          </div>
        </form>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="Đóng menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            type="button"
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl sm:w-3/4 dark:bg-slate-800">
            <div className="flex items-center justify-between border-gray-200 border-b p-4 dark:border-gray-600">
              <Image
                alt="GreenCart"
                className="h-8 w-auto"
                height={32}
                src="/logo.svg"
                width={120}
              />
              <button
                className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                onClick={() => setMobileOpen(false)}
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            <div className="h-full overflow-y-auto p-2 sm:p-4">
              <div className="mb-6">
                <h3 className="mb-3 font-bold text-slate-800 dark:text-slate-100">
                  Danh mục
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all duration-300 hover:bg-slate-50 sm:gap-3 sm:px-3 sm:py-2 sm:text-sm dark:text-slate-300 dark:hover:bg-slate-700"
                      href={`/category/${category.path}`}
                      key={category.path}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Image
                        alt={category.text}
                        className="h-6 w-6 rounded-full object-cover sm:h-8 sm:w-8"
                        height={40}
                        src={category.image}
                        width={40}
                      />
                      <span>{category.text}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-gray-200 border-t pt-4 dark:border-gray-600">
                <div className="space-y-2">
                  <button
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-slate-700 text-sm hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    onClick={() => {
                      setMobileOpen(false);
                      setHelpOpen(true);
                    }}
                    type="button"
                  >
                    <HelpCircle size={20} />
                    <span>Trợ giúp</span>
                  </button>
                  <Link
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-700 text-sm hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User size={20} />
                    <span>Đăng nhập</span>
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-700 text-sm hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User size={20} />
                    <span>Đăng ký</span>
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-700 text-sm hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    href="/cart"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ShoppingCart size={20} />
                    <span>Giỏ hàng</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <HelpModal onClose={() => setHelpOpen(false)} open={helpOpen} />
    </>
  );
}
