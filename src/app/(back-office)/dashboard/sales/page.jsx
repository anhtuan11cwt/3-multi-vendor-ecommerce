import { getServerSession } from "next-auth";
import Heading from "@/components/back-office/heading";
import DataTable from "@/components/data-table/data-table";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { columns } from "./columns";

export default async function SalesPage() {
  const session = await getServerSession(authOptions);

  // Không có phiên đăng nhập -> không hiển thị doanh số nào
  if (!session?.user?.id) {
    return (
      <div className="space-y-6">
        <Heading title="Doanh số" />
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Vui lòng đăng nhập để xem doanh số.
        </div>
      </div>
    );
  }

  const { id, role } = session.user;

  const allSales = await db.sale.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Admin thấy toàn bộ doanh số, farmer chỉ thấy doanh số của mình
  const data =
    role === "ADMIN"
      ? allSales
      : allSales.filter((sale) => sale.vendorId === id);

  return (
    <div className="space-y-6">
      <Heading title="Doanh số" />
      <DataTable
        columnLabels={{
          createdAt: "Ngày tạo",
          productImage: "Hình ảnh",
          productPrice: "Giá sản phẩm",
          productQuantity: "Số lượng",
          productTitle: "Sản phẩm",
          total: "Tổng tiền",
        }}
        columns={columns}
        data={data}
        filterKeys={["productTitle"]}
      />
    </div>
  );
}
