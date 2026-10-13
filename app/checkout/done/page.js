import OrderPlaced from "./OrderPlaced";

export const metadata = { title: "Order placed · Bean There" };

export default function OrderPlacedPage() {
  return (
    <div className="md:mx-auto md:max-w-md">
      <OrderPlaced />
    </div>
  );
}
