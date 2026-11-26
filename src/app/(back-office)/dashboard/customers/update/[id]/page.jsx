import { redirect } from "next/navigation";
import CustomerForm from "@/components/back-office/CustomerForm";
import { getData } from "@/lib/getData";

export const dynamic = "force-dynamic";

export default async function UpdateCustomerPage({ params }) {
  const { id } = await params;

  let customer = null;

  try {
    const response = await getData(`users/${id}`);
    customer = response?.data ?? null;
  } catch (error) {
    console.error("Lỗi khi tải khách hàng:", error);
  }

  if (!customer) {
    redirect("/dashboard/customers");
  }

  return <CustomerForm customer={customer} />;
}
