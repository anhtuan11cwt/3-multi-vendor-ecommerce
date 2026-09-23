"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/back-office/page-header";
import DataTable from "@/components/data-table/data-table";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default function ProductsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData("products");
        setData(result);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Sản phẩm"
        href="/dashboard/products/new"
        linkTitle="Thêm sản phẩm"
      />
      {loading ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Đang tải dữ liệu...
        </div>
      ) : (
        <DataTable
          columnLabels={{
            createdAt: "Ngày tạo",
            imageUrl: "Hình ảnh",
            isActive: "Trạng thái",
            title: "Tiêu đề",
          }}
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
}
