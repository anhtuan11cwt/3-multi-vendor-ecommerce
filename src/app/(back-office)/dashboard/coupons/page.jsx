import { getServerSession } from "next-auth";
import PageHeader from "@/components/back-office/page-header";
import DataTable from "@/components/data-table/data-table";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { columns } from "./columns";

export default async function CouponsPage() {
  const session = await getServerSession(authOptions);

  // Không có phiên đăng nhập -> không hiển thị mã giảm giá nào
  if (!session?.user?.id) {
    return (
      <div className="space-y-6">
        <PageHeader
          heading="Mã giảm giá"
          href="/dashboard/coupons/new"
          linkTitle="Thêm mã giảm giá"
        />
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Vui lòng đăng nhập để xem mã giảm giá.
        </div>
      </div>
    );
  }

  const { id, role } = session.user;

  const allCoupons = await db.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Admin thấy toàn bộ mã, farmer chỉ thấy mã do mình tạo
  const data =
    role === "ADMIN"
      ? allCoupons
      : allCoupons.filter((coupon) => coupon.vendorId === id);

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Mã giảm giá"
        href="/dashboard/coupons/new"
        linkTitle="Thêm mã giảm giá"
      />
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
    </div>
  );
}
