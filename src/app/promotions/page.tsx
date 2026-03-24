import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Promotions | Speedy Corner",
  description:
    "Browse current Speedy Corner promotions including weekly fuel and in-store bundle deals.",
};

const offers = [
  {
    title: "Fuel Saver Monday",
    summary: "Save up to 8% on selected fuel grades every Monday.",
    badge: "Weekly",
    validity: "Valid at participating locations.",
  },
  {
    title: "Snack + Drink Combo",
    summary: "Buy any sandwich and get a drink at a bundled discount.",
    badge: "Popular",
    validity: "All day while stock lasts.",
  },
  {
    title: "Kitchen Happy Hour",
    summary: "Evening special prices on selected hot kitchen items.",
    badge: "Limited",
    validity: "Daily from 5:00 PM to 8:00 PM.",
  },
  {
    title: "DoorDash Delivery Deal",
    summary: "Reduced delivery fee on selected convenience items.",
    badge: "Online",
    validity: "Offer availability varies by area.",
  },
];

export default function PromotionsPage() {
  return (
    <section className="bg-[linear-gradient(180deg,#fbfaf8_0%,#f3ece3_100%)] py-14 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
        <header className="max-w-3xl">
          <p className="eyebrow">Promotions</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-theme-ink sm:text-5xl">
            Weekly Deals Available Now
          </h1>
          <p className="mt-5 text-base leading-8 text-theme-muted sm:text-lg">
            Explore current offers across fuel, kitchen, and convenience products.
            Promotions refresh regularly, so check back often for new savings.
          </p>
        </header>

        <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-black/85 bg-black">
          <Image
            src="/home-promo-banner.webp"
            alt="Speedy Corner weekly deals promotional banner"
            width={1600}
            height={330}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_34px_rgba(42,30,20,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-theme-ink">
                  {offer.title}
                </h2>
                <span className="rounded-full bg-theme-accent/12 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-theme-accent uppercase">
                  {offer.badge}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
                {offer.summary}
              </p>
              <p className="mt-4 text-sm font-medium text-theme-ink">{offer.validity}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[1.1rem] border border-theme-line/80 bg-white/90 p-5 sm:p-6">
          <p className="text-sm font-semibold tracking-[0.1em] text-theme-accent uppercase">
            Offer Terms
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-7 text-theme-muted">
            <li>Offers cannot be combined unless explicitly stated.</li>
            <li>Product availability may vary by location and time.</li>
            <li>Management reserves the right to update offers without prior notice.</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[0.95rem] bg-theme-accent px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:brightness-95"
          >
            Ask About Deals
          </Link>
          <Link
            href="/locations/downtown"
            className="inline-flex items-center justify-center rounded-[0.95rem] border border-theme-line bg-white px-6 py-3 text-sm font-semibold tracking-[0.08em] text-theme-ink uppercase transition hover:border-theme-accent hover:text-theme-accent"
          >
            Find A Location
          </Link>
        </div>
      </div>
    </section>
  );
}
