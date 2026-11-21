import { FileText } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export default async function InvoicePage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Vui lòng đăng nhập để xem hóa đơn.
        </p>
      </div>
    );
  }

  const order = OBJECT_ID_REGEX.test(id)
    ? await db.order.findUnique({ where: { id } })
    : null;

  if (!order || order.userId !== session.user.id) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Không tìm thấy hóa đơn.
        </p>
        <Link
          className="mt-4 inline-block rounded-lg bg-lime-600 px-5 py-2.5 font-medium text-sm text-white transition-colors hover:bg-lime-700"
          href="/dashboard/orders"
        >
          Quay lại đơn hàng của tôi
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white px-3 py-6 shadow-sm sm:px-8 sm:py-10 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-3 border-slate-200 border-b pb-4 dark:border-slate-700">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-100 text-lime-600 dark:bg-lime-950 dark:text-lime-400">
          <FileText size={24} />
        </span>
        <div>
          <h1 className="font-bold text-slate-800 text-xl sm:text-2xl dark:text-slate-100">
            Hóa đơn
          </h1>
          <p className="break-all text-slate-500 text-sm dark:text-slate-400">
            Mã đơn hàng: #{order.orderNumber ?? order.id}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center font-medium text-slate-600 text-sm transition-colors hover:border-slate-400 hover:text-slate-800 sm:px-6 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
          href={`/dashboard/orders/${order.id}`}
        >
          Xem chi tiết đơn hàng
        </Link>
        <Link
          className="rounded-lg bg-lime-600 px-4 py-2.5 text-center font-medium text-sm text-white transition-colors hover:bg-lime-700 sm:px-6"
          href="/dashboard/orders"
        >
          Quay lại danh sách
        </Link>
      </div>
    </div>
  );
}
