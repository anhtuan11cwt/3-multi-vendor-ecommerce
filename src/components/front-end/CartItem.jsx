"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";

export default function CartItem({ item, mobile = false }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    setOpen(false);
    toast.success(`Đã xóa "${item.title}" khỏi giỏ hàng`);
  };

  if (mobile) {
    return (
      <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
        <div className="flex gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
            {item.imageUrl ? (
              <Image
                alt={item.title}
                className="object-cover"
                fill
                sizes="64px"
                src={item.imageUrl}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                <span className="text-slate-400 text-xs">Không có ảnh</span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-slate-800 text-sm dark:text-slate-100">
              {item.title}
            </p>
            <p className="mt-1 font-bold text-lime-600 text-sm dark:text-lime-400">
              {item.price.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <AlertDialog onOpenChange={setOpen} open={open}>
            <AlertDialogTrigger
              className="h-8 w-8 shrink-0 self-start rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
              render={<button type="button" />}
            >
              <Trash2 size={14} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xóa sản phẩm?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn xóa &quot;{item.title}&quot; khỏi giỏ
                  hàng?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={handleRemove}
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center rounded-lg border border-slate-300 dark:border-slate-600">
            <button
              className="flex h-8 w-8 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={handleDecrease}
              type="button"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center font-medium text-slate-800 text-sm dark:text-slate-100">
              {item.quantity}
            </span>
            <button
              className="flex h-8 w-8 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={handleIncrease}
              type="button"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="font-bold text-slate-800 text-sm dark:text-slate-100">
            {(item.price * item.quantity).toLocaleString("vi-VN")}đ
          </span>
        </div>
      </div>
    );
  }

  return (
    <tr className="border-slate-200 border-b dark:border-slate-700">
      {/* Cột 1: Ảnh + Tên */}
      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
            {item.imageUrl ? (
              <Image
                alt={item.title}
                className="object-cover"
                fill
                sizes="64px"
                src={item.imageUrl}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                <span className="text-slate-400 text-xs">Không có ảnh</span>
              </div>
            )}
          </div>
          <span className="font-medium text-slate-800 text-sm dark:text-slate-100">
            {item.title}
          </span>
        </div>
      </td>

      {/* Cột 2: Số lượng */}
      <td className="py-4 text-center">
        <div className="inline-flex items-center rounded-lg border border-slate-300 dark:border-slate-600">
          <button
            className="flex h-8 w-8 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            onClick={handleDecrease}
            type="button"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-medium text-slate-800 text-sm dark:text-slate-100">
            {item.quantity}
          </span>
          <button
            className="flex h-8 w-8 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            onClick={handleIncrease}
            type="button"
          >
            <Plus size={14} />
          </button>
        </div>
      </td>

      {/* Cột 3: Giá */}
      <td className="py-4 text-right">
        <span className="font-bold text-slate-800 text-sm dark:text-slate-100">
          {(item.price * item.quantity).toLocaleString("vi-VN")}đ
        </span>
      </td>

      {/* Cột 4: Xóa */}
      <td className="py-4 pl-3 text-center">
        <AlertDialog onOpenChange={setOpen} open={open}>
          <AlertDialogTrigger
            className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
            render={<button type="button" />}
          >
            <Trash2 size={16} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa sản phẩm?</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa &quot;{item.title}&quot; khỏi giỏ
                hàng?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleRemove}
              >
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
}
