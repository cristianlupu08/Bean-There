import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";

export const metadata = { title: "About us · Bean There" };

const OPENING_HOURS = [
  { days: "Monday – Friday", hours: "07:30 – 20:00" },
  { days: "Saturday", hours: "09:00 – 20:00" },
  { days: "Sunday", hours: "10:00 – 18:00" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About us" />

      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl shadow-black/40">
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&q=75&auto=format&fit=crop"
          alt="Inside the café, with warm lights and a CAFE sign"
          fill
          priority
          sizes="(max-width: 448px) 100vw, 448px"
          className="object-cover"
        />
      </div>

      <section className="mt-6">
        <h2 className="font-display text-2xl">Our story</h2>
        <p className="mt-3 leading-relaxed text-cream-muted">
          Bean There started with a simple idea: great coffee, made with care, without wasting time in
          a queue. We roast our beans locally, bake our pastries every morning and only make each drink
          after you order it.
        </p>
        <p className="mt-3 leading-relaxed text-cream-muted">
          Order from your phone, get an order number and just come pick it up. That&apos;s it.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <InfoCard Icon={ClockIcon} title="Opening hours">
          <ul className="space-y-1">
            {OPENING_HOURS.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span className="text-cream">{row.hours}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard Icon={PinIcon} title="Location">
          <p>12 Roast Street, Bucharest</p>
          <p className="mt-1 text-xs">2 minutes from the nearest metro station.</p>
        </InfoCard>

        <InfoCard Icon={PhoneIcon} title="Contact">
          <p>0712 345 678 · hello@beanthere.ro</p>
        </InfoCard>
      </section>
    </>
  );
}

function InfoCard({ Icon, title, children }) {
  return (
    <div className="flex gap-4 rounded-3xl bg-bean p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-caramel/15 text-caramel">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1 text-sm text-cream-muted">
        <h3 className="mb-1 font-medium text-cream">{title}</h3>
        {children}
      </div>
    </div>
  );
}
