"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTableViewOptions from "./data-table-view-options";

export default function DataTableToolbar({
  table,
  searchColumn = "title",
  searchPlaceholder = "Tìm kiếm...",
  columnLabels = {},
}) {
  const isFiltered = table.state.columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          className="h-8 max-w-full sm:max-w-sm"
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          placeholder={searchPlaceholder}
          value={table.getColumn(searchColumn)?.getFilterValue() ?? ""}
        />
        {isFiltered && (
          <Button
            className="h-8 shrink-0 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
            variant="ghost"
          >
            Đặt lại
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions columnLabels={columnLabels} table={table} />
    </div>
  );
}
