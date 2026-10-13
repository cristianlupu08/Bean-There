import PageHeader from "@/components/PageHeader";
import MyOrders from "./MyOrders";

export const metadata = { title: "My orders · Bean There" };

export default function MyOrdersPage() {
  return (
    <>
      <PageHeader title="My orders" />
      <MyOrders />
    </>
  );
}
