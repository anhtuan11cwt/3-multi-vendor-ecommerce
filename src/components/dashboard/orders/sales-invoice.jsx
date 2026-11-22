"use client";

import { Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { convertIsoDateToNormalDate } from "@/lib/convert-iso-date-to-normal-date";

function formatMoney(value) {
  return Number(value ?? 0).toLocaleString("vi-VN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

// Font dự phòng khi chưa đọc được --font-sans của app
const FALLBACK_FONT_SANS =
  "ui-sans-serif, system-ui, sans-serif, 'Segoe UI', Arial";

export default function SalesInvoice({ order }) {
  const invoiceRef = useRef(null);

  // react-to-print clone nội dung hóa đơn vào iframe nhưng KHÔNG clone thẻ
  // <html> (nơi đặt class chứa biến --font-sans của next/font) nên phải
  // sao chép biến font này vào pageStyle để bản in/PDF dùng đúng font app
  const [fontSans, setFontSans] = useState("");
  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-sans")
      .trim();
    if (value) setFontSans(value);
  }, []);

  // react-to-print v3 nhận ref qua contentRef (không còn option content như v2)
  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `hoa-don-${order.orderNumber ?? order.id}`,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 15mm 20mm;
      }
      :root {
        --font-sans: ${fontSans || FALLBACK_FONT_SANS};
      }
      @media print {
        html, body {
          width: 100% !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
  });

  const orderItems = order.orderItems ?? [];

  // Tổng tiền hàng: cộng dồn (số lượng * đơn giá) của từng sản phẩm
  const subTotal = orderItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  // Phí vận chuyển và tổng cộng phải định dạng bằng parseFloat + toFixed(2)
  // để tránh lỗi cộng chuỗi (subTotal là chuỗi sau khi toFixed)
  const shippingCost = Number.parseFloat(
    Number(order.shippingCost ?? 0).toFixed(2),
  );
  const total = (Number.parseFloat(subTotal.toFixed(2)) + shippingCost).toFixed(
    2,
  );

  const invoiceDate = convertIsoDateToNormalDate(order.createdAt);

  return (
    <div className="space-y-4">
      <div className="flex justify-center sm:justify-end print:hidden">
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 font-medium text-slate-200 text-sm transition-colors hover:bg-slate-900 sm:w-auto dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          onClick={handlePrint}
          type="button"
        >
          <Printer size={16} />
          Tải / In hóa đơn
        </button>
      </div>

      <div
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-5 shadow-sm sm:px-4 sm:py-6 md:px-8 md:py-10 dark:border-slate-700 dark:bg-slate-800 print:m-0 print:w-full print:max-w-none print:rounded-none print:border-none print:bg-white print:p-0 print:text-slate-900 print:shadow-none"
        ref={invoiceRef}
      >
        <div className="flex flex-col gap-4 border-slate-200 border-b pb-6 sm:flex-row sm:items-start sm:justify-between dark:border-slate-700 print:flex-row print:items-start print:justify-between print:border-slate-300">
          <div>
            <h1 className="font-bold text-slate-800 text-xl sm:text-2xl dark:text-slate-200 print:text-2xl print:text-slate-900">
              Hóa đơn bán hàng
            </h1>
            <p className="mt-1 text-slate-500 text-sm dark:text-slate-200 print:text-slate-600">
              Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.
            </p>
          </div>
          <div className="sm:text-right print:text-right">
            <p className="font-semibold text-slate-800 text-sm dark:text-slate-200 print:text-slate-900">
              Số hóa đơn: {order.orderNumber ?? order.id}
            </p>
            <p className="mt-1 text-slate-500 text-sm dark:text-slate-200 print:text-slate-600">
              Ngày tạo: {invoiceDate}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 print:grid-cols-2">
          <div>
            <p className="font-semibold text-slate-800 text-sm dark:text-slate-200 print:text-slate-900">
              Người mua
            </p>
            <p className="mt-2 text-slate-600 text-sm dark:text-slate-200 print:text-slate-700">
              {order.fullName}
            </p>
            <p className="break-words text-slate-600 text-sm dark:text-slate-200 print:text-slate-700">
              {order.streetAddress}
            </p>
            <p className="break-words text-slate-600 text-sm dark:text-slate-200 print:text-slate-700">
              {order.ward ? `${order.ward}, ` : ""}
              {order.province}
            </p>
            <p className="break-words text-slate-600 text-sm dark:text-slate-200 print:text-slate-700">
              {order.email}
            </p>
          </div>
          <div className="sm:text-right print:text-right">
            <p className="font-semibold text-slate-800 text-sm dark:text-slate-200 print:text-slate-900">
              Giao đến
            </p>
            <p className="mt-2 text-slate-600 text-sm dark:text-slate-200 print:text-slate-700">
              {order.fullName}
            </p>
            <p className="break-words text-slate-600 text-sm dark:text-slate-200 print:text-slate-700">
              {order.streetAddress}
            </p>
            <p className="break-words text-slate-600 text-sm dark:text-slate-200 print:text-slate-700">
              {order.ward ? `${order.ward}, ` : ""}
              {order.province}
            </p>
            <p className="break-words text-slate-600 text-sm dark:text-slate-200 print:text-slate-700">
              {order.email}
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto print:overflow-visible">
          <table className="w-full min-w-[260px] border-collapse text-xs sm:text-sm print:text-sm">
            <thead>
              <tr className="border-slate-200 border-b dark:border-slate-700 print:border-slate-300">
                <th className="whitespace-nowrap py-2 pr-2 text-left font-semibold text-slate-800 sm:pr-3 dark:text-slate-200 print:text-slate-900">
                  Sản phẩm
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-right font-semibold text-slate-800 sm:px-3 dark:text-slate-200 print:text-slate-900">
                  Số lượng
                </th>
                <th className="whitespace-nowrap px-2 py-2 text-right font-semibold text-slate-800 sm:px-3 dark:text-slate-200 print:text-slate-900">
                  Đơn giá
                </th>
                <th className="whitespace-nowrap py-2 pl-2 text-right font-semibold text-slate-800 sm:pl-3 dark:text-slate-200 print:text-slate-900">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => {
                const itemSubTotal = (
                  Number(item.quantity) * Number(item.price)
                ).toFixed(2);

                return (
                  <tr
                    className="border-slate-100 border-b dark:border-slate-700 print:border-slate-200"
                    key={item.id ?? index}
                  >
                    <td className="break-words py-2 pr-2 text-slate-700 sm:py-3 sm:pr-3 dark:text-slate-200 print:text-slate-800">
                      {item.title}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-right text-slate-700 tabular-nums sm:px-3 sm:py-3 dark:text-slate-200 print:text-slate-800">
                      {item.quantity}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-right text-slate-700 tabular-nums sm:px-3 sm:py-3 dark:text-slate-200 print:text-slate-800">
                      {formatMoney(item.price)}đ
                    </td>
                    <td className="whitespace-nowrap py-2 pl-2 text-right font-medium text-slate-800 tabular-nums sm:py-3 sm:pl-3 dark:text-slate-200 print:text-slate-900">
                      {formatMoney(itemSubTotal)}đ
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:ml-auto sm:w-72 print:ml-auto print:w-72">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 text-sm dark:text-slate-200 print:text-slate-600">
              Tổng tiền hàng
            </span>
            <span className="font-medium text-slate-800 text-sm tabular-nums dark:text-slate-200 print:text-slate-900">
              {formatMoney(subTotal.toFixed(2))}đ
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 text-sm dark:text-slate-200 print:text-slate-600">
              Phí vận chuyển
            </span>
            <span className="font-medium text-slate-800 text-sm tabular-nums dark:text-slate-200 print:text-slate-900">
              {formatMoney(shippingCost)}đ
            </span>
          </div>
          <div className="border-slate-200 border-t pt-3 dark:border-slate-700 print:border-slate-300">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-slate-800 text-sm dark:text-slate-200 print:text-slate-900">
                Tổng cộng
              </span>
              <span className="font-bold text-slate-800 text-sm tabular-nums dark:text-slate-200 print:text-slate-900">
                {formatMoney(total)}đ
              </span>
            </div>
          </div>
        </div>

        <p className="mt-8 border-slate-200 border-t pt-4 text-center text-slate-500 text-xs dark:border-slate-700 dark:text-slate-200 print:border-slate-300 print:text-slate-500">
          Hóa đơn này được tạo tự động và không cần chữ ký.
        </p>
      </div>
    </div>
  );
}
