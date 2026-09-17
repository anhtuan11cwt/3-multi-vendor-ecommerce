import { CircleDollarSign, HelpCircle, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const supportLinks = [
  {
    description: "Hướng dẫn chăm sóc khách hàng",
    href: "/help",
    icon: HelpCircle,
    title: "Trung tâm hỗ trợ",
  },
  {
    description: "Đổi trả nhanh",
    href: "/returns",
    icon: RefreshCw,
    title: "Đổi trả dễ dàng",
  },
  {
    description: "Hàng triệu lượt truy cập",
    href: "/register-farmer",
    icon: CircleDollarSign,
    title: "Bán hàng trên LiLi",
  },
];

export default function SupportLinks() {
  return (
    <div className="flex flex-col gap-3">
      {supportLinks.map((link) => (
        <Link
          className="flex items-center gap-3 rounded-lg bg-white p-4 transition-all hover:shadow-md dark:bg-slate-800"
          href={link.href}
          key={link.href}
        >
          <div className="flex shrink-0 items-center justify-center rounded-lg bg-slate-100 p-3 text-slate-900 dark:bg-slate-700 dark:text-slate-100">
            <link.icon size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 text-sm uppercase tracking-wider dark:text-slate-100">
              {link.title}
            </h2>
            <p className="text-slate-500 text-xs dark:text-slate-400">
              {link.description}
            </p>
          </div>
        </Link>
      ))}

      <div className="overflow-hidden rounded-lg">
        <Image
          alt="Khuyến mãi"
          className="h-auto w-full rounded-lg object-cover"
          height={200}
          src="/bottom_banner_image.png"
          width={400}
        />
      </div>
    </div>
  );
}
