import Image from "next/image";
import Link from "next/link";
import { convertIsoDateToNormalDate } from "@/lib/convert-iso-date-to-normal-date";
import { generateSlug } from "@/lib/generate-slug";

const orderStatusLabels = {
  CANCELLED: "Đã hủy",
  DELIVERED: "Đã giao hàng",
  PROCESSING: "Đang xử lý",
  SHIPPED: "Đã giao cho vận chuyển",
};

const orderStatusStyles = {
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  DELIVERED: "bg-lime-100 text-lime-700 dark:bg-lime-950 dark:text-lime-400",
  PROCESSING:
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  SHIPPED: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
};

function formatMoney(value) {
  return Number(value ?? 0).toLocaleString("vi-VN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export default function OrderCard({ order }) {
  const orderItems = order.orderItems ?? [];

  // Ẩn các đơn hàng lỗi không có sản phẩm
  if (orderItems.length === 0) {
    return null;
  }

  const orderCreationDate = convertIsoDateToNormalDate(order.createdAt);

  const subTotal = orderItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm min-[400px]:p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-2 border-slate-200 border-b pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 dark:border-slate-700">
        <div className="space-y-1">
          <p className="text-slate-800 text-sm dark:text-slate-100">
            Đơn hàng ngày{" "}
            <span className="font-medium">{orderCreationDate}</span>
          </p>
          <p className="break-all text-slate-500 text-sm dark:text-slate-400">
            Mã đơn hàng:{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              #{order.orderNumber ?? order.id}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span
            className={`rounded-full px-3 py-1 font-medium text-xs ${
              orderStatusStyles[order.status] ??
              "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
            }`}
          >
            {orderStatusLabels[order.status] ?? order.status}
          </span>
          <span className="font-semibold text-slate-800 text-sm dark:text-slate-100">
            Tổng tiền: {formatMoney(subTotal)}đ
          </span>
        </div>
      </div>

      <ul className="divide-y divide-slate-100 dark:divide-slate-700">
        {orderItems.map((item) => (
          <li
            className="flex items-center gap-2 py-3 sm:gap-3"
            key={item.id ?? item.productId}
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100 min-[400px]:h-14 min-[400px]:w-14 dark:bg-slate-700">
              <Image
                alt={item.title ?? "Sản phẩm"}
                className="object-cover"
                fill
                sizes="(max-width: 400px) 44px, 56px"
                src={item.imageUrl || "/tomato_image.png"}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-800 text-sm dark:text-slate-100">
                {item.title ?? "Sản phẩm"}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="text-slate-500 text-xs dark:text-slate-400">
                  Số lượng: {item.quantity}
                </p>
                {item.title && (
                  <Link
                    className="text-lime-600 text-xs transition-colors hover:text-lime-700 hover:underline dark:text-lime-400"
                    href={`/products/${generateSlug(item.title)}`}
                  >
                    Xem sản phẩm
                  </Link>
                )}
              </div>
            </div>

            <span className="shrink-0 whitespace-nowrap font-bold text-slate-800 text-sm tabular-nums dark:text-slate-100">
              {formatMoney(item.price)}đ
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 border-slate-200 border-t pt-3 sm:flex-row sm:justify-end dark:border-slate-700">
        <Link
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-center font-medium text-slate-600 text-sm transition-colors hover:border-slate-400 hover:text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
          href={`/dashboard/orders/${order.id}`}
        >
          Xem đơn hàng
        </Link>
        <Link
          className="rounded-lg bg-lime-600 px-4 py-2 text-center font-medium text-sm text-white transition-colors hover:bg-lime-700"
          href={`/dashboard/orders/${order.id}/invoice`}
        >
          Xem hóa đơn
        </Link>
      </div>
    </li>
  );
}
