"use client";

import Heading from "@/components/back-office/heading";
import DataTable from "@/components/data-table/data-table";
import { columns } from "./columns";

export default function CustomersTable({ customers }) {
  return (
    <div className="space-y-6">
      <Heading title="Khách hàng" />
      <DataTable
        columnLabels={{
          createdAt: "Ngày đăng ký",
          email: "Email",
          name: "Họ và tên",
          role: "Vai trò",
        }}
        columns={columns}
        data={customers}
        filterKeys={["name", "email"]}
      />
    </div>
  );
}
