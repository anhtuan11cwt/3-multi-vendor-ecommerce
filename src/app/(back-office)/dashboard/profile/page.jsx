import { getServerSession } from "next-auth";
import Heading from "@/components/back-office/heading";
import { authOptions } from "@/lib/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const name = session.user?.name;

  return (
    <div className="space-y-4 sm:space-y-6">
      <Heading title="Hồ sơ cá nhân" />
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm min-[400px]:p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="break-words font-semibold text-xl">
          Chào mừng {name || "bạn"} đến với trang hồ sơ
        </h2>
        <p className="mt-2 text-slate-600 text-sm dark:text-slate-400">
          Thông tin tài khoản của bạn hiển thị tại đây.
        </p>
      </div>
    </div>
  );
}
