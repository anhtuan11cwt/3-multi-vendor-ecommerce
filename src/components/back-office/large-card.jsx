import { Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LargeCard({ data }) {
  return (
    <Card className={cn("border-0 text-white", data.color)}>
      <div className="flex flex-col items-center gap-2 p-2">
        <Layers size={28} />
        <span className="text-xs opacity-90">{data.period}</span>
        <span className="font-bold text-2xl">{data.sales}</span>
      </div>
    </Card>
  );
}
