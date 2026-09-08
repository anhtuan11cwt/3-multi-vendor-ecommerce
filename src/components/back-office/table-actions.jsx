import { Download, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TableActions() {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
      <Button className="gap-2" variant="outline">
        <Download size={16} />
        <span>Xuất file</span>
      </Button>

      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder="Tìm kiếm..." />
      </div>

      <Button className="gap-2" variant="destructive">
        <Trash size={16} />
        <span>Xóa hàng loạt</span>
      </Button>
    </div>
  );
}
