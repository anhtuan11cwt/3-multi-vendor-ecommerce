import Heading from "@/components/back-office/heading";

export default function UserDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Heading title="Chào mừng bạn đến với bảng điều khiển" />
      <p className="text-slate-600 text-sm dark:text-slate-400">
        Bạn đang đăng nhập với vai trò người dùng. Từ đây bạn có thể theo dõi
        đơn hàng, quản lý hồ sơ cá nhân và mua sắm tại cửa hàng trực tuyến.
      </p>
    </div>
  );
}
