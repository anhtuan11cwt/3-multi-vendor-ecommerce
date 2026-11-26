import { getData } from "@/lib/getData";
import CustomersTable from "./customers-table";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  let customers = [];

  try {
    const response = await getData("customers");
    customers = response?.data ?? [];
  } catch (error) {
    console.error("Lỗi khi tải khách hàng:", error);
  }

  return <CustomersTable customers={customers} />;
}
