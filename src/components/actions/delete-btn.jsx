"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useRowDelete } from "@/components/data-table/row-delete-context";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function DeleteBtn({ id, endpoint, title }) {
  const [loading, setLoading] = useState(false);
  const rowDelete = useRowDelete();

  const handleDelete = async () => {
    const result = await Swal.fire({
      cancelButtonText: "Hủy",
      confirmButtonText: "Có, xóa!",
      icon: "warning",
      showCancelButton: true,
      text: `Bạn có chắc chắn muốn xóa ${title} này?`,
      title: "Bạn có chắc chắn?",
    });

    if (!result.isConfirmed) return;

    if (rowDelete) {
      rowDelete.removeRow(id);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch(`${baseURL}/api/${endpoint}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success(`Đã xóa ${title} thành công`, { duration: 2000 });
        if (!rowDelete) {
          window.location.reload();
        }
      } else {
        const data = await response.json().catch(() => ({}));
        if (rowDelete) {
          rowDelete.restoreRow(id);
        } else {
          setLoading(false);
        }
        toast.error(data.message || `Xóa ${title} thất bại`, {
          duration: 2000,
        });
      }
    } catch {
      if (rowDelete) {
        rowDelete.restoreRow(id);
      } else {
        setLoading(false);
      }
      toast.error("Đã xảy ra lỗi", { duration: 2000 });
    }
  };

  return (
    <button
      className="flex items-center gap-2 font-medium"
      data-id={id}
      disabled={loading}
      onClick={handleDelete}
      type="button"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Đang xóa...</span>
        </>
      ) : (
        `Xóa ${title}`
      )}
    </button>
  );
}
