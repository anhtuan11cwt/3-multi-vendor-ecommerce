import { Plus } from "lucide-react";
import Link from "next/link";
import Heading from "./heading";

export default function PageHeader({ heading, linkTitle, href }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Heading title={heading} />
      <Link
        className="flex items-center gap-2 rounded-lg bg-lime-600 px-3 py-2 font-medium text-white transition-colors hover:bg-lime-700 sm:px-4 sm:py-2.5 dark:bg-lime-600 dark:hover:bg-lime-700"
        href={href}
      >
        <Plus className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
        <span className="whitespace-nowrap">{linkTitle}</span>
      </Link>
    </div>
  );
}
