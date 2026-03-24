import Link from "next/link";
import { LOCATION_CARDS } from "@/constants/locations";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path
        d="M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  );
}

function ArrowMiniIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path
        d="m5 3 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DirectionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="m14.5 9.5-5 5m0-5h5v5m6.5-2.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationsSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#fbfaf8_0%,#f3ece3_100%)] py-16 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
        <div className="mb-10 sm:mb-12">
          <p className="eyebrow">Store Finder</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-theme-accent">
              <PinIcon />
            </span>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-theme-ink sm:text-4xl">
              Our Locations
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {LOCATION_CARDS.map((location) => (
            <article
              key={location.title}
              className="overflow-hidden rounded-[1.65rem] border border-white/80 bg-white shadow-[0_18px_44px_rgba(42,30,20,0.09)]"
            >
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url('${location.imageUrl}')` }}
              />

              <div className="p-5 sm:p-6">
                <h3 className="min-h-[2.6em] text-pretty text-[clamp(1.2rem,1.35vw,1.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-theme-accent">
                  {location.title}
                </h3>
                <p className="mt-4 text-base font-medium text-theme-muted">
                  {location.city}
                </p>

                <div className="mt-8 grid gap-3">
                  <Link
                    href={location.detailsLink}
                    className="inline-flex items-center justify-between rounded-[1rem] bg-theme-accent px-5 py-4 text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-[0_12px_26px_rgba(242,106,33,0.24)] transition hover:brightness-95"
                  >
                    <span>View Details</span>
                    <ArrowMiniIcon />
                  </Link>

                  <a
                    href={location.directionsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-[1rem] border border-theme-line bg-[#f8f4ef] px-5 py-4 text-sm font-semibold tracking-[0.08em] text-theme-ink uppercase transition hover:border-theme-accent hover:text-theme-accent"
                  >
                    <DirectionIcon />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
