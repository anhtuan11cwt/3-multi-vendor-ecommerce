import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from "lucide-react";
import SmallCard from "./small-card";

const orderStatus = [
  {
    icon: ShoppingCart,
    iconBg: "bg-orange-500",
    number: 500,
    title: "Tổng đơn hàng",
  },
  {
    icon: Loader2,
    iconBg: "bg-yellow-500",
    number: 150,
    title: "Đơn chờ xử lý",
  },
  {
    icon: RefreshCcw,
    iconBg: "bg-blue-500",
    number: 200,
    title: "Đơn đang xử lý",
  },
  {
    icon: CheckCheck,
    iconBg: "bg-green-500",
    number: 300,
    title: "Đơn đã giao",
  },
];

export default function SmallCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {orderStatus.map((status) => (
        <SmallCard data={status} key={status.title} />
      ))}
    </div>
  );
}
