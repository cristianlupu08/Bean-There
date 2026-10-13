import PageHeader from "@/components/PageHeader";
import CartView from "./CartView";

export const metadata = { title: "Cart · Bean There" };

export default function CartPage() {
  return (
    <>
      <PageHeader title="Your cart" backHref="/menu" showCart={false} />
      <CartView />
    </>
  );
}
