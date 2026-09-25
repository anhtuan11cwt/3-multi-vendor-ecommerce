import { Pencil } from "lucide-react";
import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function EditBtn({ title, editEndpoint }) {
  return (
    <Link
      className="flex items-center text-lime-600"
      href={`${baseURL}/dashboard/${editEndpoint}`}
    >
      <Pencil className="mr-2 h-4 w-4" />
      <span>Chỉnh sửa {title}</span>
    </Link>
  );
}
