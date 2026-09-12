"use client";

import dynamic from "next/dynamic";
import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "indent",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
];

export default function QuillEditor({
  label,
  value,
  onChange,
  className,
  disabled = false,
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <FieldLabel className="text-slate-900 dark:text-slate-100">
          {label}
        </FieldLabel>
      )}
      <div
        className={cn(
          "rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
        )}
      >
        <ReactQuill
          formats={formats}
          modules={modules}
          onChange={onChange}
          readOnly={disabled}
          theme="snow"
          value={value || ""}
        />
      </div>
    </div>
  );
}
