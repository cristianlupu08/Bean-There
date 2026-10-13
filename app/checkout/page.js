import PageHeader from "@/components/PageHeader";
import CheckoutForm from "./CheckoutForm";

export const metadata = { title: "Checkout · Bean There" };

export default function CheckoutPage() {
  return (
    <div className="md:mx-auto md:max-w-xl">
      <PageHeader title="Checkout" backHref="/cart" showCart={false} />
      <CheckoutForm />
    </div>
  );
}
