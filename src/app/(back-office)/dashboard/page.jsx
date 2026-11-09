import { getServerSession } from "next-auth";
import DashboardCharts from "@/components/back-office/charts/dashboard-charts";
import CustomDataTable from "@/components/back-office/custom-data-table";
import FarmerDashboard from "@/components/back-office/farmer-dashboard";
import Heading from "@/components/back-office/heading";
import LargeCards from "@/components/back-office/large-cards";
import SmallCards from "@/components/back-office/small-cards";
import UserDashboard from "@/components/back-office/user-dashboard";
import { authOptions } from "@/lib/authOptions";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role?.toLowerCase();

  if (role === "user") return <UserDashboard />;
  if (role === "farmer") return <FarmerDashboard />;

  return (
    <div className="space-y-4 sm:space-y-6">
      <Heading title="Tổng quan bảng điều khiển" />
      <LargeCards />
      <SmallCards />
      <DashboardCharts />
      <CustomDataTable />
    </div>
  );
}
