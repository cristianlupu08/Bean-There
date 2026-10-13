import PageHeader from "@/components/PageHeader";
import AdminOrders from "./AdminOrders";

export const metadata = { title: "Admin · Bean There" };

// Warning: this page is NOT protected yet. Password protection comes later.
export default function AdminPage() {
  return (
    <>
      <PageHeader title="Admin panel" showCart={false} />
      <AdminOrders />
    </>
  );
}
