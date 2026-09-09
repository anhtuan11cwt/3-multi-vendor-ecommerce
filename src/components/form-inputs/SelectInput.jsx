"use client";

import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export default function SelectInput({
  label,
  name,
  options = [],
  register,
  errors,
  defaultValue = "",
  isLoading = false,
}) {
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white",
          "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50",
          "dark:focus:ring-slate-400",
          errors && "border-red-500",
        )}
        defaultValue={defaultValue}
        disabled={isLoading}
        id={name}
        {...register}
      >
        <option value="">-- Chọn --</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}
