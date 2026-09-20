"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "@/store/cartSlice";

export default function ProductDetailInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        imageUrl: product.imageUrl,
        price: product.salePrice || product.productPrice,
        quantity,
        slug: product.slug,
        title: product.title,
      }),
    );
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const discountPercent =
    product.salePrice && product.productPrice
      ? Math.round(
          ((product.productPrice - product.salePrice) / product.productPrice) *
            100,
        )
      : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 text-xl dark:text-slate-100">
          {product.title}
        </h2>
      </div>

      {product.description && (
        <p className="text-slate-600 dark:text-slate-300">
          {product.description}
        </p>
      )}

      <div className="flex items-center gap-3 border-slate-200 border-b pb-4 dark:border-slate-700">
        {product.sku && (
          <span className="text-slate-500 text-sm dark:text-slate-400">
            SKU: {product.sku}
          </span>
        )}
        {product.productStock != null && (
          <span className="rounded-full bg-lime-100 px-4 py-1.5 font-medium text-lime-800 text-sm dark:bg-lime-900 dark:text-lime-200">
            Tồn kho: {product.productStock}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between border-slate-200 border-b pb-4 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <span className="font-bold text-2xl text-lime-600 dark:text-lime-400">
            {product.salePrice
              ? product.salePrice.toLocaleString("vi-VN")
              : product.productPrice.toLocaleString("vi-VN")}
            đ
          </span>
          {product.salePrice && (
            <span className="text-slate-400 text-sm line-through">
              {product.productPrice.toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>
        {discountPercent > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 font-medium text-red-600 text-sm dark:bg-red-900 dark:text-red-300">
            <span className="text-xs">🏷</span>-{discountPercent}%
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 border-slate-200 border-b pb-4 sm:flex-row sm:items-center dark:border-slate-700">
        <div className="flex items-center self-start rounded-lg border border-slate-300 dark:border-slate-600">
          <button
            className="flex h-10 w-10 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            onClick={handleDecrease}
            type="button"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-medium text-slate-800 dark:text-slate-100">
            {quantity}
          </span>
          <button
            className="flex h-10 w-10 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            onClick={handleIncrease}
            type="button"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-lime-600 px-6 py-3 font-medium text-white transition-colors hover:bg-lime-700"
          onClick={handleAddToCart}
          type="button"
        >
          <ShoppingCart size={18} />
          <span>Thêm vào giỏ hàng</span>
        </button>
      </div>
    </div>
  );
}
