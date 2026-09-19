import Link from "next/link";
import { getData } from "@/lib/getData";
import TrainingCarousel from "./TrainingCarousel";

export default async function CommunityTrainings() {
  const trainings = await getData("trainings");

  return (
    <section className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-2xl text-lime-600 dark:text-lime-500">
          Đào tạo cộng đồng
        </h2>
        <Link
          className="rounded-md bg-slate-900 px-4 py-2 font-medium text-slate-50 text-sm transition-all hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
          href="/community"
        >
          Xem tất cả
        </Link>
      </div>
      <TrainingCarousel trainings={trainings} />
    </section>
  );
}
