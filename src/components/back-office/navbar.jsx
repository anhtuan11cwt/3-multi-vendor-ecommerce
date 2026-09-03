"use client";

import { Bell, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="lg:hidden" />

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button size="icon-sm" variant="ghost">
          <Sun size={16} />
          <span className="sr-only">Chuyển đổi giao diện</span>
        </Button>
        <Button className="relative" size="icon-sm" variant="ghost">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Thông báo</span>
        </Button>
        <Button size="icon-sm" variant="ghost">
          <User size={16} />
          <span className="sr-only">Tài khoản</span>
        </Button>
      </div>
    </header>
  );
}
