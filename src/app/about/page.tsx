import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Speedy Corner",
  description:
    "Learn about Speedy Corner, our service values, and how we deliver a faster, cleaner convenience stop for every neighborhood.",
};

const highlights = [
  { label: "Locations", value: "4+" },
  { label: "Average Stop Time", value: "Under 5 min" },
  { label: "Open Days", value: "7 / Week" },
];

const values = [
  {
    title: "Speed Without Sacrificing Quality",
    description:
      "From fuel lanes to checkout flow, every touchpoint is designed to reduce wait time and keep quality standards high.",
  },
  {
    title: "Clean, Friendly, Reliable",
    description:
      "We invest in a consistently clean environment, helpful staff, and organized shelves so every visit feels dependable.",
  },
  {
    title: "Community-First Convenience",
    description:
      "Each location is shaped around neighborhood needs with practical essentials, snacks, and weekly value offers.",
  },
];

export default function AboutPage() {
  return (
    <section className="bg-[linear-gradient(180deg,#fbfaf8_0%,#f3ece3_100%)] py-14 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
        <header className="max-w-3xl">
          <p className="eyebrow">About Us</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-theme-ink sm:text-5xl">
            Built For Everyday Stops
          </h1>
          <p className="mt-5 text-base leading-8 text-theme-muted sm:text-lg">
            Speedy Corner was created to make daily convenience faster, simpler, and
            more consistent. Whether you are fueling up before work or grabbing quick
            essentials after hours, we focus on practical service and a smooth
            customer experience.
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.2rem] border border-theme-line/70 bg-white/85 px-5 py-5 shadow-[0_10px_26px_rgba(42,30,20,0.07)]"
            >
              <p className="text-sm font-semibold tracking-[0.12em] text-theme-accent uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
                {item.value}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_36px_rgba(42,30,20,0.08)]"
            >
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-theme-ink">
                {value.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
                {value.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/locations/downtown"
            className="inline-flex items-center justify-center rounded-[0.95rem] bg-theme-accent px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:brightness-95"
          >
            View Locations
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[0.95rem] border border-theme-line bg-white px-6 py-3 text-sm font-semibold tracking-[0.08em] text-theme-ink uppercase transition hover:border-theme-accent hover:text-theme-accent"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
