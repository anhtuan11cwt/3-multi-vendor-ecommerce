"use client";

import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateInitials } from "@/lib/generateInitials";

export default function UserAvatar({ user = {} }) {
  const { image = null, name = "" } = user;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initials = generateInitials(name);

  async function handleLogout() {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Tài khoản"
        className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
        type="button"
      >
        {image ? (
          <Image
            alt={name || "Ảnh đại diện"}
            className="h-8 w-8 rounded-full object-cover"
            height={32}
            src={image}
            width={32}
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-800 p-2 font-medium text-white text-xs shadow-md">
            {initials}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{name || "Tài khoản"}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="flex items-center gap-2" href="/dashboard">
            <LayoutDashboard size={16} />
            Bảng điều khiển
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="flex items-center gap-2" href="/dashboard/profile">
            <Settings size={16} />
            Chỉnh sửa hồ sơ
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2"
            disabled={isLoading}
            onClick={handleLogout}
            type="button"
          >
            <LogOut size={16} />
            {isLoading ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
