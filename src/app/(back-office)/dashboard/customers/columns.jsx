"use client";

import ActionColumn from "@/components/data-table/data-table-columns/action-column";
import DateColumn from "@/components/data-table/data-table-columns/date-column";
import SortableColumn from "@/components/data-table/data-table-columns/sortable-column";
import { Checkbox } from "@/components/ui/checkbox";

const ROLE_LABELS = {
  ADMIN: "Quản trị viên",
  FARMER: "Nông dân",
  MODERATOR: "Điều hành viên",
  USER: "Khách hàng",
};

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
      <SortableColumn column={column} title="Họ và tên" />
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      return ROLE_LABELS[role] ?? "Không xác định";
    },
    header: "Vai trò",
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => <DateColumn accessorKey="createdAt" row={row} />,
    header: "Ngày đăng ký",
  },
  {
    cell: ({ row }) => (
      <ActionColumn
        editEndpoint={`customers/update/${row.original.id}`}
        endpoint={`customers/${row.original.id}`}
        route="customers"
        row={row}
        title="khách hàng"
        viewEndpoint={`orders?customer=${row.original.id}`}
      />
    ),
    enableHiding: false,
    id: "actions",
  },
];
