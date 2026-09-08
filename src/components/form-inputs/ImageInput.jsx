"use client";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ImageInput({
  label,
  imageUrl,
  onFileChange,
  loading = false,
}) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onFileChange(file);
    },
    [onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop,
  });

  function handleRemove(e) {
    e.stopPropagation();
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    onFileChange(null);
  }

  const displayUrl = preview || imageUrl;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {displayUrl ? (
        <div
          className={cn(
            "space-y-2",
            loading && "pointer-events-none opacity-50",
          )}
        >
          <div className="relative inline-block">
            <Image
              alt="Xem trước"
              className="rounded-lg border object-contain"
              height={192}
              src={displayUrl}
              width={192}
            />
            <button
              className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
              onClick={handleRemove}
              type="button"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
              : "border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500",
            loading && "pointer-events-none opacity-50",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <ImagePlus className="size-8 text-slate-400" />
            <p className="text-slate-600 text-sm dark:text-slate-400">
              {isDragActive
                ? "Thả ảnh vào đây..."
                : "Kéo thả hoặc click để tải ảnh lên"}
            </p>
            <p className="text-slate-400 text-xs">Tối đa 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
}
