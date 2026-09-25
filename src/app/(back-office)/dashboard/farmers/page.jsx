"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/back-office/page-header";
import DataTable from "@/components/data-table/data-table";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default function FarmersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData("farmers");
        setData(result.data ?? []);
      } catch (error) {
        console.error("Lỗi khi tải nông dân:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Nông dân"
        href="/dashboard/farmers/new"
        linkTitle="Thêm nông dân"
      />
      {loading ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Đang tải dữ liệu...
        </div>
      ) : (
        <DataTable
          columnLabels={{
            code: "Mã nông dân",
            createdAt: "Ngày tạo",
            email: "Email",
            isActive: "Trạng thái",
            name: "Tên nông dân",
            phone: "Số điện thoại",
            role: "Vai trò",
          }}
          columns={columns}
          data={data}
          filterKeys={["name"]}
        />
      )}
    </div>
  );
}
