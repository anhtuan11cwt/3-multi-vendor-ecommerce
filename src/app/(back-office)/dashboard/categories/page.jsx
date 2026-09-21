"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/back-office/page-header";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function CategoriesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData("categories");
        setData(result);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Danh mục"
        href="/dashboard/categories/new"
        linkTitle="Thêm danh mục"
      />
      {loading ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Đang tải dữ liệu...
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
