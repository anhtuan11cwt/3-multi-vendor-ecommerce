"use client";

import { CircleCheck, ImagePlus, Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/lib/upload-file";
import { cn } from "@/lib/utils";

const DEFAULT_MAX_FILE_SIZE = 8 * 1024 * 1024;
const DEFAULT_MAX_FILE_COUNT = 4;

export default function MultipleImageInput({
  label,
  imageUrls = [],
  setImageUrls,
  loading = false,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  maxFileCount = DEFAULT_MAX_FILE_COUNT,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const isFull = imageUrls.length >= maxFileCount;
  const disabled = loading || isUploading;

  const onDrop = useCallback(
    async (acceptedFiles, fileRejections) => {
      if (fileRejections.length) {
        const hasTooLarge = fileRejections.some((rejection) =>
          rejection.errors.some((error) => error.code === "file-too-large"),
        );
        if (hasTooLarge) {
          toast.error(
            `Mỗi ảnh tối đa ${Math.round(maxFileSize / (1024 * 1024))}MB`,
          );
        }
      }

      if (!acceptedFiles.length || !setImageUrls) return;

      const remaining = maxFileCount - imageUrls.length;
      if (remaining <= 0) {
        toast.error(`Chỉ được tải lên tối đa ${maxFileCount} ảnh`);
        return;
      }

      const files = acceptedFiles.slice(0, remaining);
      if (acceptedFiles.length > files.length) {
        toast.warning(
          `Chỉ thêm được ${files.length} ảnh nữa (tối đa ${maxFileCount} ảnh)`,
        );
      }

      setIsUploading(true);
      try {
        const response = [];
        for (const file of files) {
          response.push(await uploadFile(file, "products"));
        }

        const urls = response.filter(Boolean);
        setImageUrls((prev) => [...prev, ...urls]);
      } catch {
        toast.error("Tải ảnh lên thất bại");
      } finally {
        setIsUploading(false);
      }
    },
    [imageUrls.length, maxFileCount, maxFileSize, setImageUrls],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    disabled: disabled || isFull,
    maxSize: maxFileSize,
    multiple: true,
    onDrop,
  });

  function handleImageRemove(imageIndex) {
    if (!setImageUrls) return;
    setImageUrls((prev) => prev.filter((_, index) => index !== imageIndex));
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {imageUrls.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {imageUrls.map((url, index) => (
            <div className="relative" key={url}>
              <Image
                alt={`Ảnh sản phẩm ${index + 1}`}
                className="h-32 w-full rounded-lg border object-cover"
                height={128}
                src={url}
                width={192}
              />
              <button
                aria-label="Xóa ảnh"
                className={cn(
                  "absolute -top-1 -right-0.5 flex size-6 items-center justify-center rounded-full bg-white text-slate-900 shadow transition-colors hover:bg-slate-100",
                  disabled && "pointer-events-none opacity-50",
                )}
                disabled={disabled}
                onClick={() => handleImageRemove(index)}
                type="button"
              >
                <XCircle size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors sm:p-8",
          isFull
            ? "cursor-not-allowed border-lime-300 bg-lime-50/60 dark:border-lime-900 dark:bg-lime-950/30"
            : isDragActive
              ? "cursor-pointer border-blue-500 bg-blue-50 dark:bg-blue-950"
              : "cursor-pointer border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500",
          isUploading && "pointer-events-none opacity-60",
          loading && "pointer-events-none opacity-50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center">
          {isUploading ? (
            <Loader2 className="size-8 animate-spin text-lime-500" />
          ) : isFull ? (
            <CircleCheck className="size-8 text-lime-500" />
          ) : (
            <ImagePlus className="size-8 text-slate-400" />
          )}
          <p className="text-slate-600 text-sm dark:text-slate-400">
            {isUploading
              ? "Đang tải ảnh lên..."
              : isFull
                ? "Đã tải đủ ảnh"
                : isDragActive
                  ? "Thả ảnh vào đây..."
                  : "Kéo thả hoặc click để tải nhiều ảnh lên"}
          </p>
          <p className="text-slate-400 text-xs">
            {isFull
              ? `Đã tải đủ ${maxFileCount}/${maxFileCount} ảnh — xóa bớt để thay thế`
              : imageUrls.length > 0
                ? `Đã thêm ${imageUrls.length}/${maxFileCount} ảnh, mỗi ảnh tối đa ${Math.round(maxFileSize / (1024 * 1024))}MB`
                : `Tối đa ${maxFileCount} ảnh, mỗi ảnh ${Math.round(maxFileSize / (1024 * 1024))}MB`}
          </p>
        </div>
      </div>
    </div>
  );
}
