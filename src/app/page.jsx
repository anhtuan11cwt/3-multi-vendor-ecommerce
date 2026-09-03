import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h2 className="font-bold text-4xl tracking-tight">
        Chào mừng đến với E-Commerce
      </h2>
      <Link className={buttonVariants({ size: "lg" })} href="/dashboard">
        Đến Dashboard
      </Link>
    </div>
  );
}
