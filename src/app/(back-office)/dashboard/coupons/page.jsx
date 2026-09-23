"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/back-office/page-header";
import DataTable from "@/components/data-table/data-table";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default function CouponsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData("coupons");
        setData(result);
      } catch (error) {
        console.error("Lỗi khi tải mã giảm giá:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Mã giảm giá"
        href="/dashboard/coupons/new"
        linkTitle="Thêm mã giảm giá"
      />
      {loading ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Đang tải dữ liệu...
        </div>
      ) : (
        <DataTable
          columnLabels={{
            couponCode: "Mã giảm giá",
            createdAt: "Ngày tạo",
            expiryDate: "Ngày hết hạn",
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
