"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/back-office/page-header";
import DataTable from "@/components/data-table/data-table";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default function BannersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData("banners");
        setData(result);
      } catch (error) {
        console.error("Lỗi khi tải banner:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Banner"
        href="/dashboard/banners/new"
        linkTitle="Thêm banner"
      />
      {loading ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Đang tải dữ liệu...
        </div>
      ) : (
        <DataTable
          columnLabels={{
            createdAt: "Ngày tạo",
            imageUrl: "Hình ảnh banner",
            isActive: "Trạng thái",
            link: "Liên kết banner",
            title: "Tiêu đề",
          }}
          columns={columns}
          data={data}
          searchPlaceholder="Tìm banner..."
        />
      )}
    </div>
  );
}
