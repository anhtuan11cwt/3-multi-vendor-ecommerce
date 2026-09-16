import Navbar from "@/components/front-end/Navbar";

export default function FrontEndLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
