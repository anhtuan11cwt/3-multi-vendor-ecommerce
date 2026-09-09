import PageHeader from "@/components/back-office/page-header";
import TableActions from "@/components/back-office/table-actions";

export default function FarmersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        heading="Nông dân"
        href="/dashboard/farmers/new"
        linkTitle="Thêm nông dân"
      />
      <TableActions />
      <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800">
        <p className="text-slate-500 dark:text-slate-400">
          Bảng dữ liệu nông dân sẽ hiển thị ở đây.
        </p>
      </div>
    </div>
  );
}
