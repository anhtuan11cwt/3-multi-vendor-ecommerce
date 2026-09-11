"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ToggleInput({
  label,
  name,
  register,
  trueTitle = "Đang hoạt động",
  falseTitle = "Ngừng hoạt động",
  value = false,
  loading = false,
  disabled = false,
  className,
}) {
  const isDisabled = loading || disabled;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Label className="font-medium text-sm dark:text-slate-300">{label}</Label>
      <div
        className={cn(
          "flex items-center gap-2",
          isDisabled && "pointer-events-none opacity-50",
        )}
      >
        <label className="relative inline-flex cursor-pointer items-center gap-2">
          <input
            className="peer sr-only"
            disabled={isDisabled}
            type="checkbox"
            {...register(name)}
          />
          <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-lime-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-lime-300 peer-focus:ring-offset-2 dark:bg-slate-600 dark:peer-checked:bg-lime-500 dark:after:border-slate-400" />
        </label>
        <span className="text-slate-500 text-sm dark:text-slate-400">
          {value ? trueTitle : falseTitle}
        </span>
      </div>
    </div>
  );
}
