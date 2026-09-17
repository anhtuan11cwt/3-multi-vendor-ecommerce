"use client";

import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    links: [
      { text: "Trang chủ", url: "/" },
      { text: "Bán chạy nhất", url: "/best-sellers" },
      { text: "Ưu đãi & Khuyến mãi", url: "/deals" },
      { text: "Liên hệ chúng tôi", url: "/contact" },
      { text: "Câu hỏi thường gặp", url: "/faq" },
    ],
    title: "Liên kết nhanh",
  },
  {
    links: [
      { text: "Thông tin giao hàng", url: "/shipping" },
      { text: "Chính sách đổi trả & hoàn tiền", url: "/returns" },
      { text: "Phương thức thanh toán", url: "/payment" },
      { text: "Theo dõi đơn hàng", url: "/track-order" },
      { text: "Liên hệ chúng tôi", url: "/contact" },
    ],
    title: "Cần hỗ trợ?",
  },
  {
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
    title: "Theo dõi chúng tôi",
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link className="mb-4 block" href="/">
              <Image
                alt="LiLi"
                className="h-8 w-auto"
                height={32}
                src="/logo.svg"
                width={120}
              />
            </Link>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Nền tảng thương mại điện tử đa nhà cung cấp, kết nối người mua và
              người bán nông sản tươi sạch.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-bold text-sm text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      className="text-slate-400 text-sm transition-colors hover:text-white"
                      href={link.url}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-slate-800 border-t pt-8">
          <p className="text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} LiLi. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
