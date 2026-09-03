"use client";

import { faker } from "@faker-js/faker";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
];

const tabs = [
  {
    data: {
      datasets: [
        {
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgb(75, 192, 192)",
          data: labels.map(() => faker.number.int({ max: 10000, min: 1000 })),
          fill: true,
          label: "Doanh thu",
          tension: 0.5,
        },
      ],
      labels,
    },
    title: "Doanh thu",
    type: "sales",
  },
  {
    data: {
      datasets: [
        {
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderColor: "rgb(255, 159, 64)",
          data: labels.map(() => faker.number.int({ max: 1000, min: 100 })),
          fill: true,
          label: "Đơn hàng",
          tension: 0.5,
        },
      ],
      labels,
    },
    title: "Đơn hàng",
    type: "orders",
  },
];

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
  responsive: true,
};

export default function WeeklySalesChart() {
  const [chartToDisplay, setChartToDisplay] = useState("sales");
  const activeTab = tabs.find((tab) => tab.type === chartToDisplay);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Doanh thu tuần</CardTitle>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.type}
                onClick={() => setChartToDisplay(tab.type)}
                size="sm"
                variant={chartToDisplay === tab.type ? "default" : "ghost"}
              >
                {tab.title}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[250px] w-full sm:h-[300px]">
          <Line data={activeTab.data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
