import Navbar from "@/components/back-office/navbar";
import Sidebar from "@/components/back-office/sidebar";
import { SidebarProvider } from "@/components/back-office/sidebar-provider";

export default function BackOfficeLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="lg:pl-60">
          <Navbar />
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
