import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SortableColumn({ column, title }) {
  return (
    <Button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      variant="ghost"
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
