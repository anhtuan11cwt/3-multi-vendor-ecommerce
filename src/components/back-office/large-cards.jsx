import LargeCard from "./large-card";

const orderStats = [
  {
    color: "bg-green-600",
    period: "Doanh thu hôm nay",
    sales: "110K",
  },
  {
    color: "bg-blue-600",
    period: "Doanh thu hôm qua",
    sales: "130K",
  },
  {
    color: "bg-orange-600",
    period: "Tháng này",
    sales: "300K",
  },
  {
    color: "bg-purple-600",
    period: "Doanh thu tổng cộng",
    sales: "500K",
  },
];

export default function LargeCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {orderStats.map((stat) => (
        <LargeCard data={stat} key={stat.period} />
      ))}
    </div>
  );
}
