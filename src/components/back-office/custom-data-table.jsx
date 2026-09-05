"use client";

import { useState } from "react";

import data from "@/app/data.json";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAGE_SIZE = 10;

export default function CustomDataTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDisplayedData = data.slice(startIndex, endIndex);

  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data.length);

  return (
    <div className="p-2 sm:p-4 md:p-8">
      <h2 className="mt-4 mb-4 px-2 font-bold text-lg text-slate-800 tracking-tight sm:mt-8 sm:px-4 sm:text-2xl dark:text-slate-50">
        Đơn Hàng Gần Đây
      </h2>

      <div className="overflow-x-auto">
        <Table className="min-w-[500px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Mã</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">Giới tính</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDisplayedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.full_name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.email}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.gender}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">
                    Sửa
                  </Button>
                  <Button size="sm" variant="ghost">
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm sm:text-xl">
          <span className="hidden sm:inline">
            Hiển thị {itemStartIndex} đến {itemEndIndex} trong tổng số{" "}
            {data.length} bản ghi
          </span>
          <span className="sm:hidden">
            {itemStartIndex}-{itemEndIndex} / {data.length}
          </span>
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            size="sm"
            variant="outline"
          >
            Trước
          </Button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isActive = currentPage === pageNum;
            const isNearCurrent = Math.abs(pageNum - currentPage) <= 1;
            const isFirst = pageNum === 1;
            const isLast = pageNum === totalPages;

            if (!isActive && !isNearCurrent && !isFirst && !isLast) {
              if (pageNum === 2 || pageNum === totalPages - 1) {
                return (
                  <span
                    className="hidden px-1 text-muted-foreground sm:inline"
                    key={pageNum}
                  >
                    ...
                  </span>
                );
              }
              return null;
            }

            return (
              <Button
                className={isActive ? "bg-primary text-primary-foreground" : ""}
                disabled={isActive}
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                size="sm"
                variant={isActive ? "default" : "outline"}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            size="sm"
            variant="outline"
          >
            Tiếp
          </Button>
        </nav>
      </div>
    </div>
  );
}
