import DashboardCharts from "@/components/back-office/charts/dashboard-charts";
import CustomDataTable from "@/components/back-office/custom-data-table";
import Heading from "@/components/back-office/heading";
import LargeCards from "@/components/back-office/large-cards";
import SmallCards from "@/components/back-office/small-cards";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Heading title="Tổng quan Dashboard" />
      <LargeCards />
      <SmallCards />
      <DashboardCharts />
      <CustomDataTable />
    </div>
  );
}
