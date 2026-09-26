"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/back-office/page-header";
import DataTable from "@/components/data-table/data-table";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default function CommunityPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData("trainings");
        setData(result);
      } catch (error) {
        console.error("Lỗi khi tải bài đào tạo:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Cộng đồng"
        href="/dashboard/community/new"
        linkTitle="Thêm bài đào tạo"
      />
      {loading ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Đang tải dữ liệu...
        </div>
      ) : (
        <DataTable
          columnLabels={{
            createdAt: "Ngày tạo",
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
