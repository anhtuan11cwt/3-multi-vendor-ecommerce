"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTableViewOptions from "./data-table-view-options";

export default function DataTableToolbar({
  table,
  filterKeys = ["title"],
  searchPlaceholder = "Tìm kiếm...",
  columnLabels = {},
}) {
  const isFiltered = filterKeys.some((key) => {
    const value = table.getColumn(key)?.getFilterValue();
    return value !== undefined && value !== "";
  });

  const handleInputChange = (key, value) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const getPlaceholder = (key) =>
    filterKeys.length === 1
      ? searchPlaceholder
      : `Tìm ${columnLabels[key] ?? key}`;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {filterKeys.map((key) => (
          <Input
            className="h-8 min-w-0 max-w-full sm:max-w-sm"
            key={key}
            onChange={(event) => handleInputChange(key, event.target.value)}
            placeholder={getPlaceholder(key)}
            value={table.getColumn(key)?.getFilterValue() ?? ""}
          />
        ))}
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
