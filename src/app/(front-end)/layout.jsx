import Footer from "@/components/front-end/Footer";
import Navbar from "@/components/front-end/Navbar";
import ReduxProvider from "@/store/provider";

export default function FrontEndLayout({ children }) {
  return (
    <ReduxProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        <Footer />
      </div>
    </ReduxProvider>
  );
}
