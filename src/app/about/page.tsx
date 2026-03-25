import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Speedy Corner",
  description:
    "Learn about Speedy Corner, your trusted neighborhood stop for fuel, food, and convenience.",
};

const heroHighlights = [
  { label: "Fast", value: "Quick in-and-out service" },
  { label: "Fresh", value: "Quality food and beverages" },
  { label: "Convenient", value: "Everyday essentials in one stop" },
];

const offerings = [
  "High-quality fuel (Regular, Premium, Diesel)",
  "Clean and fully stocked convenience stores",
  "Fresh snacks and cold beverages",
  "Grab-and-go food options",
  "Fast and friendly customer service",
  "Expanded food options and delivery services at select locations",
];

const reasons = [
  "Quick in-and-out experience",
  "Clean and well-maintained locations",
  "Wide variety of products",
  "Friendly and helpful staff",
  "Conveniently located stores",
];

export default function AboutPage() {
  return (
    <section className="bg-[linear-gradient(180deg,#fbfaf8_0%,#f3ece3_100%)] py-14 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
        <header className="max-w-3xl">
          <p className="eyebrow">About Us</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-theme-ink sm:text-5xl">
            Welcome to Speedy Corner
          </h1>
          <p className="mt-5 text-base leading-8 text-theme-muted sm:text-lg">
            Your Trusted Neighborhood Stop for Fuel, Food & Convenience
          </p>
          <p className="mt-2 text-sm font-semibold tracking-[0.14em] text-theme-accent uppercase sm:text-base">
            Fast • Fresh • Convenient
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {heroHighlights.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.2rem] border border-theme-line/70 bg-white/85 px-5 py-5 shadow-[0_10px_26px_rgba(42,30,20,0.07)]"
            >
              <p className="text-sm font-semibold tracking-[0.12em] text-theme-accent uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-base leading-7 text-theme-muted sm:text-lg">
                {item.value}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_36px_rgba(42,30,20,0.08)] sm:p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
              Who We Are
            </h2>
            <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
              Speedy Corner is your go-to destination for quick fuel stops,
              fresh food, and everyday essentials. With multiple locations
              across Kansas City and nearby areas, we are committed to
              delivering a fast, reliable, and convenient experience for every
              customer.
            </p>
            <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
              Whether you&apos;re heading to work, running errands, or traveling
              long distances, Speedy Corner is designed to keep you moving
              without delays.
            </p>
          </article>

          <article className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_36px_rgba(42,30,20,0.08)] sm:p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
              Our Story
            </h2>
            <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
              Speedy Corner was built on a simple idea: your time matters.
            </p>
            <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
              We saw the need for a place where customers could quickly fuel
              up, grab quality food and drinks, and get back on the road
              without long lines or inconvenience. From day one, our focus has
              been on speed, cleanliness, and customer satisfaction. Today,
              Speedy Corner continues to grow by staying true to those values
              and serving local communities with pride.
            </p>
          </article>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_36px_rgba(42,30,20,0.08)] sm:p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
              What We Offer
            </h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-theme-muted sm:text-base">
              {offerings.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_36px_rgba(42,30,20,0.08)] sm:p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
              Why Choose Speedy Corner
            </h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-theme-muted sm:text-base">
              {reasons.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_36px_rgba(42,30,20,0.08)] sm:p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
              Our Mission
            </h2>
            <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
              To provide fast, dependable, and convenient service that helps our
              customers save time every day.
            </p>
          </article>

          <article className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_36px_rgba(42,30,20,0.08)] sm:p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
              Our Vision
            </h2>
            <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
              To become the most trusted neighborhood gas station brand known
              for speed, quality, and exceptional customer experience.
            </p>
          </article>
        </div>

        <article className="mt-6 rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_36px_rgba(42,30,20,0.08)] sm:p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
            Our Commitment
          </h2>
          <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
            At Speedy Corner, we are committed to making every visit simple and
            efficient. From fueling your vehicle to grabbing a quick snack,
            everything we do is focused on saving your time while delivering
            quality you can trust.
          </p>
          <p className="mt-4 text-base font-semibold tracking-[-0.01em] text-theme-ink sm:text-lg">
            Stop by your nearest Speedy Corner today. Experience the perfect
            combination of speed, freshness, and convenience.
          </p>
        </article>

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
