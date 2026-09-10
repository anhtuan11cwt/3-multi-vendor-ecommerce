import PageHeader from "@/components/back-office/page-header";
import TableActions from "@/components/back-office/table-actions";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        heading="Sản phẩm"
        href="/dashboard/products/new"
        linkTitle="Thêm sản phẩm"
      />
      <TableActions />
      <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800">
        <p className="text-slate-500 dark:text-slate-400">
          Bảng dữ liệu sản phẩm sẽ hiển thị ở đây.
        </p>
      </div>
    </div>
  );
}
