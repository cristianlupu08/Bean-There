import PageHeader from "@/components/PageHeader";
import AccountView from "./AccountView";

export const metadata = { title: "Account · Bean There" };

export default function LoginPage() {
  return (
    <div className="md:mx-auto md:max-w-md">
      <PageHeader title="My account" />
      <AccountView />
    </div>
  );
}
