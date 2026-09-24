"use client";

import ActionColumn from "@/components/data-table/data-table-columns/action-column";
import DateColumn from "@/components/data-table/data-table-columns/date-column";
import SortableColumn from "@/components/data-table/data-table-columns/sortable-column";
import { Checkbox } from "@/components/ui/checkbox";

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
    accessorKey: "name",
    header: ({ column }) => (
      <SortableColumn column={column} title="Tên nông dân" />
    ),
  },
  {
    accessorKey: "code",
    header: "Mã nông dân",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
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
    cell: ({ row }) => <DateColumn accessorKey="createdAt" row={row} />,
    header: "Ngày tạo",
  },
  {
    cell: ({ row }) => (
      <ActionColumn
        endpoint={`farmers/${row.original.id}`}
        route="farmers"
        row={row}
        title="nông dân"
      />
    ),
    enableHiding: false,
    id: "actions",
  },
];
