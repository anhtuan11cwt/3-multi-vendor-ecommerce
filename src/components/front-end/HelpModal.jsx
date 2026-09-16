"use client";

import {
  CornerDownLeft,
  Headphones,
  MessageSquare,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";

const supportLinks = [
  {
    description: "0123-456-789",
    href: "tel:0123456789",
    icon: Headphones,
    label: "Gọi điện",
  },
  {
    description: "Theo dõi đơn hàng của bạn",
    href: "/track",
    icon: Truck,
    label: "Theo dõi đơn hàng",
  },
  {
    description: "Chính sách đổi trả",
    href: "/returns",
    icon: CornerDownLeft,
    label: "Đổi trả & hoàn tiền",
  },
  {
    description: "Chat với chúng tôi",
    href: "/chat",
    icon: MessageSquare,
    label: "Chat hỗ trợ",
  },
];

export default function HelpModal({ onClose, open }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        aria-label="Đóng"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        type="button"
      />

      <div className="relative mx-4 w-full max-w-lg rounded-lg bg-white shadow-xl dark:bg-slate-800">
        <div className="flex items-center justify-between border-b px-6 py-4 dark:border-gray-600">
          <div>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
              Cần trợ giúp về mua sắm?
            </h2>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Liên hệ bộ phận hỗ trợ của chúng tôi
            </p>
          </div>
          <button
            aria-label="Đóng"
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6">
          {supportLinks.map((link) => (
            <Link
              className="flex items-center gap-3 rounded-md p-3 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700"
              href={link.href}
              key={link.label}
              onClick={onClose}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900/30">
                <link.icon className="h-5 w-5 text-lime-800 dark:text-lime-400" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-900 text-sm dark:text-slate-100">
                  {link.label}
                </p>
                <p className="truncate text-slate-500 text-xs dark:text-slate-400">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
