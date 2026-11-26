import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ViewOrdersBtn({ title, viewEndpoint }) {
  return (
    <Link
      className="flex items-center text-lime-600"
      href={`${baseURL}/dashboard/${viewEndpoint}`}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      <span>Xem đơn hàng {title}</span>
    </Link>
  );
}
