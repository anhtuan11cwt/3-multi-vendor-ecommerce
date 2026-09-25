"use client";

import { Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getColumnLabel(column, columnLabels) {
  const id = column.id;
  const key = id.includes(".") ? id.slice(id.lastIndexOf(".") + 1) : id;
  const header = column.columnDef?.header;
  return (
    columnLabels[id] ??
    columnLabels[key] ??
    (typeof header === "string" ? header : undefined) ??
    key
  );
}

export default function DataTableViewOptions({ table, columnLabels = {} }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-8 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-transparent bg-clip-padding px-2 font-medium text-xs shadow-xs outline-none transition-all hover:bg-muted hover:text-foreground data-[state=open]:bg-muted sm:ml-auto sm:px-2.5 sm:text-sm">
        <Settings2 className="mr-2 h-4 w-4" />
        Hiển thị
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44 whitespace-nowrap">
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                checked={column.getIsVisible()}
                key={column.id}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {getColumnLabel(column, columnLabels)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
