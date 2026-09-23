export default function DateColumn({ row, accessorKey = "createdAt" }) {
  const date = new Date(row.getValue(accessorKey));
  const day = date.getDate();
  const month = date.toLocaleString("vi-VN", { month: "short" });
  const year = date.getFullYear();
  return <div className="text-xs sm:text-sm">{`${day} ${month} ${year}`}</div>;
}
