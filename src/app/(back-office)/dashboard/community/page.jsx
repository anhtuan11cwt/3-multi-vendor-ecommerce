import PageHeader from "@/components/back-office/page-header";
import TableActions from "@/components/back-office/table-actions";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        heading="Cộng đồng"
        href="/dashboard/community/new"
        linkTitle="Thêm bài đào tạo"
      />
      <TableActions />
      <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800">
        <p className="text-slate-500 dark:text-slate-400">
          Bảng dữ liệu bài đào tạo sẽ hiển thị ở đây.
        </p>
      </div>
    </div>
  );
}
