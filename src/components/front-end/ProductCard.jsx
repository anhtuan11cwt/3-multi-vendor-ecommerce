import Image from "next/image";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";

export default function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-slate-900">
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-32 w-full overflow-hidden sm:h-40 md:h-48">
          <Image
            alt={product.title}
            className="object-cover"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            src={product.imageUrl}
          />
        </div>
        <div className="px-2 pt-1 pb-2 sm:px-4 sm:pt-2 sm:pb-3">
          <h4 className="line-clamp-2 text-slate-800 text-xs sm:text-sm dark:text-slate-200">
            {product.title}
          </h4>
        </div>
      </Link>
      <div className="flex items-center justify-between px-2 pb-2 sm:px-4 sm:pb-3">
        <p className="font-bold text-lime-600 text-xs sm:text-sm">
          {product.salePrice?.toLocaleString("vi-VN")}đ
        </p>
        <button
          className="flex items-center gap-1 rounded-md bg-lime-600 px-2 py-1 text-white text-xs transition-all hover:bg-lime-700 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          type="button"
        >
          <BsCart3 size={14} />
          <span className="hidden sm:inline">Thêm</span>
        </button>
      </div>
    </div>
  );
}
