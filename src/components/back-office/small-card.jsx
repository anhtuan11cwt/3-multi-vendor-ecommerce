import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SmallCard({ data }) {
  const Icon = data.icon;

  return (
    <Card className="bg-slate-50 p-2 sm:p-4 dark:bg-slate-700">
      <div className="flex items-center gap-2 sm:gap-4">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white sm:h-12 sm:w-12",
            data.iconBg,
          )}
        >
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <span className="block truncate text-slate-800 text-xs dark:text-slate-50">
            {data.title}
          </span>
          <p className="font-bold text-lg text-slate-900 sm:text-2xl dark:text-slate-50">
            {data.number}
          </p>
        </div>
      </div>
    </Card>
  );
}
