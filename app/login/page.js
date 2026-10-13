import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Account · Bean There" };

const inputClass =
  "mt-2 w-full rounded-2xl border border-surface-light bg-surface p-3.5 text-cream placeholder:text-cream-muted/60 focus:border-caramel focus:outline-none";

// Design only. Real sign-in will be connected to Supabase Auth later.
export default function LoginPage() {
  return (
    <div className="md:mx-auto md:max-w-md">
      <PageHeader title="My account" />

      <div className="mt-4 text-center">
        <p className="font-display text-3xl">Welcome back</p>
        <p className="mt-2 text-cream-muted">Sign in to see your orders from any device.</p>
      </div>

      <form className="mt-8">
        <label className="block">
          <span className="font-medium">Email</span>
          <input type="email" name="email" autoComplete="email" placeholder="name@example.com" className={inputClass} />
        </label>
        <label className="mt-4 block">
          <span className="font-medium">Password</span>
          <input type="password" name="password" autoComplete="current-password" placeholder="••••••••" className={inputClass} />
        </label>

        <button
          type="button"
          disabled
          className="mt-6 w-full rounded-full bg-caramel py-4 font-semibold text-ink opacity-60"
        >
          Sign in
        </button>
        <p className="mt-3 text-center text-xs text-cream-muted">
          Coming soon: accounts will work once the database is connected.
        </p>
      </form>

      <p className="mt-8 text-center text-sm text-cream-muted">
        Don&apos;t have an account? <span className="font-semibold text-caramel">Sign up</span>
      </p>
    </div>
  );
}
