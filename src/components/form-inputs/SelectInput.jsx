"use client";

import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export default function SelectInput({
  label,
  name,
  options = [],
  register,
  errors,
  isLoading = false,
  multiple = false,
}) {
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <select
        className={cn(
          "flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white",
          "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50",
          "dark:focus:ring-slate-400",
          multiple ? "min-h-[120px]" : "h-10",
          errors && "border-red-500",
        )}
        disabled={isLoading}
        id={name}
        multiple={multiple}
        size={multiple ? options.length + 1 : undefined}
        {...register}
      >
        {!multiple && <option value="">-- Chọn --</option>}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}
