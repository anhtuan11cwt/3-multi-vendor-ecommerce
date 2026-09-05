import { Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LargeCard({ data }) {
  return (
    <Card
      className={cn(
        "border-0 bg-slate-50 text-white dark:bg-slate-700",
        data.color,
      )}
    >
      <div className="flex flex-col items-center gap-1 p-2 sm:gap-2">
        <Layers className="size-5 sm:size-7" />
        <span className="text-[10px] opacity-90 sm:text-xs">{data.period}</span>
        <span className="font-bold text-lg sm:text-2xl">{data.sales}</span>
      </div>
    </Card>
  );
}
