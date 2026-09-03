import BestSellingProductsChart from "./best-selling-products-chart";
import WeeklySalesChart from "./weekly-sales-chart";

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <WeeklySalesChart />
      <BestSellingProductsChart />
    </div>
  );
}
