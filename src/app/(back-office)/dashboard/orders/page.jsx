import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import OrderCard from "@/components/dashboard/orders/order-card";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Vui lòng đăng nhập để xem đơn hàng của bạn.
        </p>
      </div>
    );
  }

  const userId = session.user.id;

  // Lấy toàn bộ đơn hàng của người dùng hiện tại kèm sản phẩm
  const userOrders = await db.order.findMany({
    include: { orderItems: true },
    orderBy: { createdAt: "desc" },
    where: { userId },
  });

  console.log("Đơn hàng của người dùng:", userId, userOrders);

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-slate-800 text-xl sm:text-2xl dark:text-slate-100">
        Đơn hàng của tôi
      </h1>

      {userOrders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-8 text-center sm:gap-4 sm:px-4 sm:py-10 dark:border-slate-700 dark:bg-slate-800">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
            <PackageSearch size={28} />
          </span>
          <p className="font-medium text-slate-700 text-sm dark:text-slate-300">
            Chưa có đơn hàng nào
          </p>
          <Link
            className="rounded-lg bg-lime-600 px-5 py-2.5 font-medium text-sm text-white transition-colors hover:bg-lime-700"
            href="/"
          >
            Bắt đầu mua sắm
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {userOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      )}
    </div>
  );
}
