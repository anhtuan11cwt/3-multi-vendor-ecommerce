import { Plus } from "lucide-react";
import Link from "next/link";
import Heading from "./heading";

export default function PageHeader({ heading, linkTitle, href }) {
  return (
    <div className="flex items-center justify-between">
      <Heading title={heading} />
      <Link
        className="flex items-center gap-2 rounded-lg bg-lime-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700"
        href={href}
      >
        <Plus size={18} />
        <span>{linkTitle}</span>
      </Link>
    </div>
  );
}
