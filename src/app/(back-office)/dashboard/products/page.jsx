import { getServerSession } from "next-auth";
import PageHeader from "@/components/back-office/page-header";
import DataTable from "@/components/data-table/data-table";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { columns } from "./columns";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  // Không có phiên đăng nhập -> không hiển thị sản phẩm nào
  if (!session?.user?.id) {
    return (
      <div className="space-y-6">
        <PageHeader
          heading="Sản phẩm"
          href="/dashboard/products/new"
          linkTitle="Thêm sản phẩm"
        />
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Vui lòng đăng nhập để xem sản phẩm.
        </div>
      </div>
    );
  }

  const { id, role } = session.user;

  const allProducts = await db.product.findMany({
    include: { farmer: { select: { userId: true } } },
    orderBy: { createdAt: "desc" },
  });

  // Admin thấy toàn bộ sản phẩm, farmer chỉ thấy sản phẩm của mình
  const data =
    role === "ADMIN"
      ? allProducts
      : allProducts.filter((product) => product.farmer?.userId === id);

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Sản phẩm"
        href="/dashboard/products/new"
        linkTitle="Thêm sản phẩm"
      />
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
    </div>
  );
}
