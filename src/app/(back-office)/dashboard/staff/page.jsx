import PageHeader from "@/components/back-office/page-header";

export default function StaffPage() {
  return (
    <div>
      <PageHeader href="/dashboard/staff/new" title="Nhân viên" />
      <div className="mt-4">
        <p className="text-muted-foreground text-sm">
          Bảng dữ liệu nhân viên sẽ hiển thị ở đây.
        </p>
      </div>
    </div>
  );
}
