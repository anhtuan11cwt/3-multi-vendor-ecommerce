"use client";

import Image from "next/image";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "@/store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const price = product.salePrice || product.productPrice || 0;

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(
      addToCart({
        id: product.id,
        imageUrl: product.imageUrl,
        price,
        quantity: 1,
        slug: product.slug,
        title: product.title,
        vendorId: product.farmer?.userId,
      }),
    );
    toast.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-slate-900">
      <Link href={`/products/${product.slug}`}>
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
          {price.toLocaleString("vi-VN")}đ
        </p>
        <button
          className="flex items-center gap-1 rounded-md bg-lime-600 px-2 py-1 text-white text-xs transition-all hover:bg-lime-700 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          onClick={handleAddToCart}
          type="button"
        >
          <BsCart3 size={14} />
          <span className="hidden sm:inline">Thêm</span>
        </button>
      </div>
    </div>
  );
}
