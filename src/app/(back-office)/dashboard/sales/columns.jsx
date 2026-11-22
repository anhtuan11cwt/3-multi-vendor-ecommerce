"use client";

import DateColumn from "@/components/data-table/data-table-columns/date-column";
import ImageColumn from "@/components/data-table/data-table-columns/image-column";
import SortableColumn from "@/components/data-table/data-table-columns/sortable-column";
import { Checkbox } from "@/components/ui/checkbox";

function formatMoney(value) {
  return Number(value ?? 0).toLocaleString("vi-VN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

// Farmer không được chỉnh sửa/xóa bản ghi doanh số nên không có cột actions
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
    accessorKey: "productTitle",
    header: ({ column }) => <SortableColumn column={column} title="Sản phẩm" />,
  },
  {
    accessorKey: "productImage",
    cell: ({ row }) => <ImageColumn accessorKey="productImage" row={row} />,
    header: "Hình ảnh",
  },
  {
    accessorKey: "productPrice",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {formatMoney(row.getValue("productPrice"))}đ
      </span>
    ),
    header: "Giá sản phẩm",
  },
  {
    accessorKey: "productQuantity",
    header: "Số lượng",
  },
  {
    accessorKey: "total",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {formatMoney(row.getValue("total"))}đ
      </span>
    ),
    header: "Tổng tiền",
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => <DateColumn accessorKey="createdAt" row={row} />,
    header: "Ngày tạo",
  },
];
