"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    id: "select",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Tiêu đề
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl");
      return imageUrl ? (
        <Image
          alt="Banner"
          className="rounded-md object-cover"
          height={40}
          src={imageUrl}
          width={40}
        />
      ) : null;
    },
    header: "Hình ảnh banner",
  },
  {
    accessorKey: "link",
    cell: ({ row }) => (
      <div className="max-w-[120px] truncate text-xs sm:max-w-[200px] sm:text-sm">
        {row.getValue("link")}
      </div>
    ),
    header: "Liên kết banner",
  },
  {
    accessorKey: "isActive",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
            isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </span>
      );
    },
    header: "Trạng thái",
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const day = date.getDate();
      const month = date.toLocaleString("vi-VN", { month: "short" });
      const year = date.getFullYear();
      return (
        <div className="text-xs sm:text-sm">{`${day} ${month} ${year}`}</div>
      );
    },
    header: "Ngày tạo",
  },
  {
    cell: ({ row }) => {
      const banner = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md p-0 font-medium text-muted-foreground text-sm hover:bg-muted hover:text-foreground">
            <span className="sr-only">Mở menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(banner.id)}
            >
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/dashboard/banners/update/${banner.id}`}>
                Chỉnh sửa
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    id: "actions",
  },
];
