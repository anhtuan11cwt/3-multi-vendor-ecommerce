import { PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

const paymentMethodLabels = {
  cod: "Thanh toán khi nhận hàng",
  "credit-card": "Thẻ tín dụng",
};

const orderStatusLabels = {
  CANCELLED: "Đã hủy",
  DELIVERED: "Đã giao hàng",
  PROCESSING: "Đang xử lý",
  SHIPPED: "Đã giao cho vận chuyển",
};

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

function formatMoney(value) {
  return Number(value ?? 0).toLocaleString("vi-VN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

function NotFoundState({ message }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-8 text-center sm:px-4 sm:py-10 dark:border-slate-700 dark:bg-slate-800">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
        <PackageSearch size={28} />
      </span>
      <p className="font-medium text-slate-700 text-sm dark:text-slate-300">
        {message}
      </p>
      <Link
        className="rounded-lg bg-lime-600 px-5 py-2.5 font-medium text-sm text-white transition-colors hover:bg-lime-700"
        href="/dashboard/orders"
      >
        Quay lại đơn hàng của tôi
      </Link>
    </div>
  );
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Vui lòng đăng nhập để xem đơn hàng.
        </p>
      </div>
    );
  }

  if (!OBJECT_ID_REGEX.test(id)) {
    return <NotFoundState message="Không tìm thấy đơn hàng" />;
  }

  const order = await db.order.findUnique({
    include: { orderItems: true },
    where: { id },
  });

  // Chỉ chủ đơn hàng mới được xem chi tiết
  if (!order || order.userId !== session.user.id) {
    return <NotFoundState message="Không tìm thấy đơn hàng" />;
  }

  const orderItems = order.orderItems ?? [];
  const subTotal = orderItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-bold text-slate-800 text-xl sm:text-2xl dark:text-slate-100">
          Chi tiết đơn hàng
        </h1>
        <span
          className={`w-fit rounded-full px-3 py-1 font-medium text-xs ${
            {
              CANCELLED:
                "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
              DELIVERED:
                "bg-lime-100 text-lime-700 dark:bg-lime-950 dark:text-lime-400",
              PROCESSING:
                "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
              SHIPPED:
                "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
            }[order.status] ??
            "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
          }`}
        >
          {orderStatusLabels[order.status] ?? order.status}
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm sm:p-4 dark:border-slate-700 dark:bg-slate-800">
        <p className="break-all text-slate-500 dark:text-slate-400">
          Mã đơn hàng:{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            #{order.orderNumber ?? order.id}
          </span>
        </p>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Thanh toán:{" "}
          {paymentMethodLabels[order.paymentMethod] ?? order.paymentMethod}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm sm:grid-cols-2 sm:p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="min-w-0">
          <p className="mb-1 font-medium text-slate-800 dark:text-slate-100">
            Địa chỉ giao hàng
          </p>
          <p className="break-words text-slate-500 dark:text-slate-400">
            {order.fullName}
          </p>
          <p className="break-words text-slate-500 dark:text-slate-400">
            {order.streetAddress}
          </p>
          <p className="break-words text-slate-500 dark:text-slate-400">
            {order.ward ? `${order.ward}, ` : ""}
            {order.province}
          </p>
          <p className="break-words text-slate-500 dark:text-slate-400">
            {order.email} — {order.phone}
          </p>
        </div>
        <div className="min-w-0">
          <p className="mb-1 font-medium text-slate-800 dark:text-slate-100">
            Thông tin đơn hàng
          </p>
          <p className="break-words text-slate-500 dark:text-slate-400">
            Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
          </p>
          <p className="break-words text-slate-500 dark:text-slate-400">
            Số sản phẩm: {orderItems.length}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 dark:border-slate-700 dark:bg-slate-800">
        <p className="mb-3 font-medium text-slate-800 text-sm dark:text-slate-100">
          Sản phẩm trong đơn hàng
        </p>

        {orderItems.length > 0 ? (
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {orderItems.map((item) => (
              <li
                className="flex items-center gap-2 py-3 sm:gap-3"
                key={item.id}
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-14 sm:w-14 dark:bg-slate-800">
                  <Image
                    alt={item.title ?? "Sản phẩm"}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 48px, 56px"
                    src={item.imageUrl || "/tomato_image.png"}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-800 text-sm dark:text-slate-100">
                    {item.title ?? "Sản phẩm"}
                  </p>
                  <p className="text-slate-500 text-xs dark:text-slate-400">
                    Số lượng: {item.quantity}
                  </p>
                </div>

                <span className="shrink-0 whitespace-nowrap font-bold text-slate-800 text-sm tabular-nums dark:text-slate-100">
                  {formatMoney(item.price)}đ
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-sm dark:text-slate-400">
            Không có sản phẩm nào trong đơn hàng.
          </p>
        )}

        <div className="mt-4 space-y-2 border-slate-200 border-t pt-4 text-sm dark:border-slate-700">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 dark:text-slate-400">Tạm tính</span>
            <span className="shrink-0 font-medium text-slate-800 tabular-nums dark:text-slate-100">
              {formatMoney(subTotal)}đ
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 dark:text-slate-400">
              Phí vận chuyển
            </span>
            <span className="shrink-0 font-medium text-slate-800 tabular-nums dark:text-slate-100">
              {formatMoney(order.shippingCost)}đ
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              Tổng cộng
            </span>
            <span className="shrink-0 font-bold text-lime-600 tabular-nums dark:text-lime-400">
              {formatMoney(order.total)}đ
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center font-medium text-slate-600 text-sm transition-colors hover:border-slate-400 hover:text-slate-800 sm:px-6 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
          href="/dashboard/orders"
        >
          Quay lại danh sách
        </Link>
        <Link
          className="rounded-lg bg-lime-600 px-4 py-2.5 text-center font-medium text-sm text-white transition-colors hover:bg-lime-700 sm:px-6"
          href={`/dashboard/orders/${order.id}/invoice`}
        >
          Xem hóa đơn
        </Link>
      </div>
    </div>
  );
}
