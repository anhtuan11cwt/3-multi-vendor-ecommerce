import { MoreHorizontal } from "lucide-react";
import DeleteBtn from "@/components/actions/delete-btn";
import EditBtn from "@/components/actions/edit-btn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ActionColumn({
  editEndpoint,
  endpoint,
  row,
  route,
  title,
}) {
  const item = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md p-0 font-medium text-muted-foreground text-sm hover:bg-muted hover:text-foreground">
        <span className="sr-only">Mở menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44 whitespace-nowrap">
        <DropdownMenuItem>
          <EditBtn
            editEndpoint={editEndpoint ?? `${route}/update/${item.id}`}
            title={title}
          />
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <DeleteBtn
            endpoint={endpoint ?? `${route}/${item.id}`}
            id={item.id}
            title={title}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
