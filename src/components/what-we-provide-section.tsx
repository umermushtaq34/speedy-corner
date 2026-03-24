import { PROVIDED_SERVICES, type ProvidedService } from "@/constants/provided-services";

function HeaderIcon() {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-theme-accent text-3xl font-extrabold leading-none text-white">
      ?
    </span>
  );
}

function ServiceIcon({ id }: { id: ProvidedService["id"] }) {
  if (id === "fuel") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-theme-accent" aria-hidden="true">
        <path d="M14 12h24v38H14z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path
          d="M42 20h7l4 7v16a5 5 0 1 1-10 0V30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 20h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="26" cy="45" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (id === "convenient-store") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-theme-accent" aria-hidden="true">
        <path d="M8 23h48v29H8z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M12 14h40v9H12z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M26 52V37a6 6 0 0 1 12 0v15" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  if (id === "kitchen") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-theme-accent" aria-hidden="true">
        <path
          d="M14 42c7-7 29-7 36 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="24" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M38 23h10m-5-5v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 49h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "drinks") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-theme-accent" aria-hidden="true">
        <path d="M20 14h20l-2 36H22z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M18 22h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M29 35h6m-8 7h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "bait") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-theme-accent" aria-hidden="true">
        <path d="M8 34c12-13 28-13 40 0-12 13-28 13-40 0Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="22" cy="34" r="2" fill="currentColor" />
        <path
          d="M50 16v30a6 6 0 1 0 6 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === "liquor") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-theme-accent" aria-hidden="true">
        <path d="M18 16h16l-2 34h-12z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M16 24h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 20h8l-2 8v22h-4V28z" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 text-theme-accent" aria-hidden="true">
      <path
        d="M11 26h42l-5 9H25l-5 7h16l7-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatWeProvideSection() {
  return (
    <section className="bg-[#f1f1f1] py-10 sm:py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
        <div className="flex items-center gap-4">
          <HeaderIcon />
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-theme-ink sm:text-4xl">
            What We Provide
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-x-4">
          {PROVIDED_SERVICES.map((service) => (
            <article key={service.id} className="flex flex-col items-center justify-start text-center">
              <ServiceIcon id={service.id} />
              <p className="mt-3 text-sm font-extrabold tracking-[0.03em] text-theme-ink uppercase">
                {service.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
