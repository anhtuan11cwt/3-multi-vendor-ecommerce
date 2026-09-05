"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      backgroundColor: [
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(255, 159, 64, 0.7)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      data: [50, 10, 20, 20],
    },
  ],
  labels: ["Bắp cải", "Dưa hấu", "Bông cải xanh", "Ngô"],
};

const options = {
  maintainAspectRatio: true,
  responsive: true,
};

export default function BestSellingProductsChart() {
  return (
    <Card className="bg-white shadow-xl dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-800 dark:text-slate-50">
          Sản phẩm bán chạy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mx-auto w-full max-w-[280px]">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
