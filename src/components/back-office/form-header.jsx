import { X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FormHeader({
  title,
  backHref = "..",
  disabled = false,
}) {
  return (
    <div className="flex items-center justify-between rounded-t-lg bg-white px-6 py-4 shadow-sm dark:bg-slate-800">
      <h2 className="font-bold text-slate-800 text-xl dark:text-slate-50">
        {title}
      </h2>
      <Link
        aria-disabled={disabled}
        className={cn(
          "flex size-8 items-center justify-center rounded-full bg-slate-600 text-white transition-colors hover:bg-slate-700",
          disabled &&
            "pointer-events-none cursor-not-allowed opacity-50 hover:bg-slate-600",
        )}
        href={disabled ? "#" : backHref}
        tabIndex={disabled ? -1 : 0}
      >
        <X size={16} />
      </Link>
    </div>
  );
}
