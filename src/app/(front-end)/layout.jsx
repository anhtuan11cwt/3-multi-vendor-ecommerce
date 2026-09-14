import Link from "next/link";

export default function FrontEndLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="border-b bg-white dark:bg-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link className="font-bold text-xl" href="/">
            E-Commerce
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              className="text-slate-600 text-sm hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              href="/register"
            >
              Đăng ký
            </Link>
            <Link
              className="text-slate-600 text-sm hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              href="/register-farmer"
            >
              Trở thành nông dân
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
