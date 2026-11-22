import Navbar from "@/components/back-office/navbar";
import Sidebar from "@/components/back-office/sidebar";
import { SidebarProvider } from "@/components/back-office/sidebar-provider";

export default function BackOfficeLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 print:min-h-0 print:bg-white">
        <div className="print:hidden">
          <Sidebar />
        </div>
        <div className="lg:pl-60 print:pl-0">
          <div className="print:hidden">
            <Navbar />
          </div>
          <main className="p-2 sm:p-4 md:p-6 print:p-0">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
