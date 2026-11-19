import { CheckCircle2, PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getData } from "@/lib/getData";

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

function formatMoney(value) {
  return Number(value ?? 0).toLocaleString("vi-VN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export default async function OrderConfirmationPage({ params }) {
  const { id } = await params;

  let order = null;
  try {
    order = await getData(`orders/${id}`);
  } catch (error) {
    console.error("Không thể lấy đơn hàng:", error);
  }

  if (!order?.id) {
    return (
      <div className="mx-auto max-w-lg px-3 py-8 text-center sm:py-12">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 sm:mb-6 sm:h-16 sm:w-16 dark:bg-slate-800 dark:text-slate-400">
          <PackageSearch size={32} />
        </span>
        <h1 className="mb-3 text-balance font-bold text-lg text-slate-800 sm:text-2xl dark:text-slate-100">
          Không tìm thấy đơn hàng
        </h1>
        <p className="mb-6 text-slate-600 text-sm dark:text-slate-400">
          Đơn hàng không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại.
        </p>
        <Link
          className="inline-flex w-full max-w-xs rounded-lg bg-lime-600 px-6 py-3 font-medium text-sm text-white transition-colors hover:bg-lime-700 sm:w-auto"
          href="/"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  const orderItems = order.orderItems ?? [];
  const subTotal = orderItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  return (
    <div className="mx-auto my-4 max-w-2xl rounded-lg border border-slate-200 bg-white px-3 py-6 shadow-sm sm:my-8 sm:px-8 sm:py-12 dark:border-slate-700 dark:bg-slate-900">
      <div className="text-center">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-lime-100 text-lime-600 sm:mb-6 sm:h-16 sm:w-16 dark:bg-lime-950 dark:text-lime-400">
          <CheckCircle2 size={32} />
        </span>

        <h1 className="mb-3 text-balance font-bold text-lg text-slate-800 sm:text-2xl dark:text-slate-100">
          Đơn hàng đã được xác nhận
        </h1>

        <p className="mb-2 text-balance text-slate-600 text-sm dark:text-slate-400">
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!
        </p>

        <p className="mb-2 flex flex-wrap items-center justify-center gap-x-1.5 break-words text-slate-500 text-sm dark:text-slate-400">
          <span>Mã đơn hàng:</span>
          <span className="break-all font-semibold text-slate-700 dark:text-slate-200">
            #{order.orderNumber ?? order.id}
          </span>
        </p>

        <p className="mb-6 break-words text-slate-500 text-sm sm:mb-8 dark:text-slate-400">
          Chúng tôi đã gửi hóa đơn qua email. Vui lòng kiểm tra hộp thư của bạn.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm sm:grid-cols-2 sm:p-4 dark:border-slate-700 dark:bg-slate-800">
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
              Thông tin thanh toán
            </p>
            <p className="break-words text-slate-500 dark:text-slate-400">
              {paymentMethodLabels[order.paymentMethod] ?? order.paymentMethod}
            </p>
            <p className="break-words text-slate-500 dark:text-slate-400">
              Trạng thái:{" "}
              <span className="font-medium text-lime-600 dark:text-lime-400">
                {orderStatusLabels[order.status] ?? order.status}
              </span>
            </p>
          </div>
        </div>

        <div>
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
              <span className="text-slate-500 dark:text-slate-400">
                Tạm tính
              </span>
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
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <Link
          className="w-full rounded-lg bg-lime-600 px-4 py-3 font-medium text-sm text-white transition-colors hover:bg-lime-700 sm:w-auto sm:px-6"
          href="/"
        >
          Tiếp tục mua sắm
        </Link>
        <Link
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-600 text-sm transition-colors hover:border-slate-400 hover:text-slate-800 sm:w-auto sm:px-6 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
          href="/dashboard/orders"
        >
          Xem đơn hàng của tôi
        </Link>
      </div>
    </div>
  );
}
