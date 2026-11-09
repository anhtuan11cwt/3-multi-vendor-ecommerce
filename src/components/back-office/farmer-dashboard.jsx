import Heading from "@/components/back-office/heading";

export default function FarmerDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Heading title="Chào mừng nông dân đến với bảng điều khiển" />
      <p className="text-slate-600 text-sm dark:text-slate-400">
        Bạn đang đăng nhập với vai trò nông dân. Từ đây bạn có thể quản lý đơn
        hàng, sản phẩm, khách hàng và theo dõi hoạt động cửa hàng của mình.
      </p>
    </div>
  );
}
