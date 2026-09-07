import PageHeader from "@/components/back-office/page-header";
import TableActions from "@/components/back-office/table-actions";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        heading="Danh mục"
        href="/dashboard/categories/new"
        linkTitle="Thêm danh mục"
      />
      <TableActions />
      <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800">
        <p className="text-slate-500 dark:text-slate-400">
          Bảng dữ liệu danh mục sẽ hiển thị ở đây.
        </p>
      </div>
    </div>
  );
}
