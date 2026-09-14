import NewFarmerForm from "@/components/front-end/new-farmer-form";
import { getData } from "@/lib/getData";

export default async function OnboardingPage({ params }) {
  const { id } = await params;
  const response = await getData(`users/${id}`);
  const user = response.data;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="font-bold text-2xl">Cho chúng tôi biết thêm về bạn</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Hoàn tất hồ sơ nông dân của bạn
        </p>
      </div>
      {user && (
        <p className="text-center text-lg">
          Xin chào <span className="font-semibold">{user.name}</span>
        </p>
      )}
      {user && <NewFarmerForm user={user} />}
    </div>
  );
}
