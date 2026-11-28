"use client";

import Image from "next/image";
import { useState } from "react";

// next/image có onError: nếu URL ảnh lỗi (404...) thì thay bằng placeholder
export default function SafeImage({
  src,
  alt,
  className,
  fallbackClassName = "",
  fallbackLabel = "Không có ảnh",
  ...props
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        aria-label={alt}
        className={`flex items-center justify-center break-words bg-slate-200 px-2 text-center text-slate-400 text-xs dark:bg-slate-700 ${fallbackClassName}`}
        role="img"
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      src={src}
      {...props}
    />
  );
}
