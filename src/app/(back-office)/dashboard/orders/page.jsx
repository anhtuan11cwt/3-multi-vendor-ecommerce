import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import OrderCard from "@/components/dashboard/orders/order-card";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function OrdersPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const customerId = params?.customer;

  if (!session?.user?.id) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Vui lòng đăng nhập để xem đơn hàng của bạn.
        </p>
      </div>
    );
  }

  const isAdmin =
    session.user.role === "ADMIN" || session.user.role === "MODERATOR";
  const isViewingOther = Boolean(customerId) && customerId !== session.user.id;
  // Admin mở trang từ sidebar (không chọn khách hàng) → xem tất cả đơn hàng
  const showAllOrders = isAdmin && !customerId;

  if (isViewingOther && !isAdmin) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Bạn không có quyền xem đơn hàng của khách hàng khác.
        </p>
      </div>
    );
  }

  const targetUser = isViewingOther
    ? await db.user.findUnique({
        select: { id: true, name: true },
        where: { id: customerId },
      })
    : null;

  if (isViewingOther && !targetUser) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Không tìm thấy khách hàng.
        </p>
      </div>
    );
  }

  const orders = await db.order.findMany({
    include: {
      orderItems: true,
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    where: showAllOrders
      ? undefined
      : { userId: isViewingOther ? customerId : session.user.id },
  });

  // Ẩn đơn hàng lỗi không có sản phẩm (OrderCard cũng tự ẩn)
  const visibleOrders = orders.filter(
    (order) => (order.orderItems?.length ?? 0) > 0,
  );

  const heading = showAllOrders
    ? "Tất cả đơn hàng"
    : isViewingOther
      ? `Đơn hàng của ${targetUser.name}`
      : "Đơn hàng của tôi";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="min-w-0 break-words font-bold text-slate-800 text-xl sm:text-2xl dark:text-slate-100">
          {heading}
        </h1>
        {(isViewingOther || showAllOrders) && (
          <Link
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-medium text-slate-600 text-sm transition-colors hover:border-lime-500 hover:text-lime-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-lime-500 dark:hover:text-lime-400"
            href="/dashboard/customers"
          >
            {isViewingOther
              ? "Quay lại danh sách khách hàng"
              : "Xem danh sách khách hàng"}
          </Link>
        )}
      </div>

      {visibleOrders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-8 text-center sm:gap-4 sm:px-4 sm:py-10 dark:border-slate-700 dark:bg-slate-800">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
            <PackageSearch size={28} />
          </span>
          <p className="font-medium text-slate-700 text-sm dark:text-slate-300">
            {showAllOrders
              ? "Chưa có đơn hàng nào trong hệ thống"
              : "Chưa có đơn hàng nào"}
          </p>
          {showAllOrders || isViewingOther ? (
            <Link
              className="rounded-lg bg-lime-600 px-5 py-2.5 font-medium text-sm text-white transition-colors hover:bg-lime-700"
              href="/dashboard/customers"
            >
              Xem danh sách khách hàng
            </Link>
          ) : (
            <Link
              className="rounded-lg bg-lime-600 px-5 py-2.5 font-medium text-sm text-white transition-colors hover:bg-lime-700"
              href="/"
            >
              Bắt đầu mua sắm
            </Link>
          )}
        </div>
      ) : (
        <ul className="space-y-4">
          {visibleOrders.map((order) => (
            <OrderCard
              customerName={showAllOrders ? order.user?.name : undefined}
              key={order.id}
              order={order}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
