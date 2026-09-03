import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SmallCard({ data }) {
  const Icon = data.icon;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white",
            data.iconBg,
          )}
        >
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <span className="block truncate text-muted-foreground text-xs">
            {data.title}
          </span>
          <p className="font-bold text-2xl">{data.number}</p>
        </div>
      </div>
    </Card>
  );
}
