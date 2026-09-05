"use client";

import { Bell, LayoutDashboard, LogOut, Settings, X } from "lucide-react";
import Image from "next/image";
import ThemeSwitcherBtn from "@/components/theme-switcher-btn";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-white pr-4 sm:gap-4 sm:px-6 dark:bg-slate-900">
      <div className="lg:hidden" />

      <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
        <ThemeSwitcherBtn />

        <DropdownMenu>
          <DropdownMenuTrigger className="relative bg-transparent p-2">
            <Bell className="text-lime-600 dark:text-lime-500" size={16} />
            <Badge
              className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]"
              variant="destructive"
            >
              3
            </Badge>
            <span className="sr-only">Thông báo</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[calc(100vw-2rem)] max-w-80"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <div className="flex gap-3 px-2 py-2">
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image
                  alt="avatar"
                  className="h-full w-full object-cover"
                  height={36}
                  src="/profile_icon.png"
                  width={36}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Đơn hàng #1234</span>
                  <span className="rounded bg-red-700 px-2 py-0.5 text-white text-xs">
                    Hết hàng
                  </span>
                  <X className="ml-auto size-4 cursor-pointer text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-xs">
                  Sản phẩm đã hết hàng
                </p>
                <p className="text-muted-foreground text-xs">2 phút trước</p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="flex gap-3 px-2 py-2">
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image
                  alt="avatar"
                  className="h-full w-full object-cover"
                  height={36}
                  src="/profile_icon.png"
                  width={36}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Đơn hàng #1235</span>
                  <span className="rounded bg-red-700 px-2 py-0.5 text-white text-xs">
                    Hết hàng
                  </span>
                  <X className="ml-auto size-4 cursor-pointer text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-xs">
                  Sản phẩm sắp hết hàng
                </p>
                <p className="text-muted-foreground text-xs">10 phút trước</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              alt="ảnh đại diện"
              className="h-8 w-8 rounded-full"
              height={200}
              src="/profile_icon.png"
              width={200}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="flex items-center gap-2" type="button">
                <LayoutDashboard size={16} />
                Bảng điều khiển
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center gap-2" type="button">
                <Settings size={16} />
                Chỉnh sửa hồ sơ
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center gap-2" type="button">
                <LogOut size={16} />
                Đăng xuất
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
