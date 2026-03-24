"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HERO_CAROUSEL_SLIDES } from "@/constants/carousel";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path
        d={direction === "left" ? "m14 5-7 7 7 7" : "m10 5 7 7-7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % HERO_CAROUSEL_SLIDES.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  function goToNext() {
    setActiveIndex((index) => (index + 1) % HERO_CAROUSEL_SLIDES.length);
  }

  function goToPrevious() {
    setActiveIndex((index) =>
      index === 0 ? HERO_CAROUSEL_SLIDES.length - 1 : index - 1
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#1f1712]">
      <div className="relative min-h-[62svh] sm:min-h-[68svh] lg:min-h-[78svh]">
        {HERO_CAROUSEL_SLIDES.map((slide, index) => (
          <article
            key={`${slide.title}-${slide.imageUrl}`}
            className={[
              "absolute inset-0 transition-opacity duration-700",
              index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            aria-hidden={index !== activeIndex}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,15,11,0.72)_0%,rgba(22,15,11,0.28)_38%,rgba(22,15,11,0.1)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,10,8,0.18)_0%,rgba(14,10,8,0.08)_50%,rgba(14,10,8,0.38)_100%)]" />

            <div className="relative mx-auto flex min-h-[62svh] max-w-[1440px] items-center px-6 py-16 sm:min-h-[68svh] sm:px-8 lg:min-h-[78svh] lg:px-9">
              <div className="max-w-xl text-white">
                <p className="inline-flex rounded-full bg-white/18 px-5 py-2 text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl sm:leading-[1.03] lg:text-7xl lg:leading-[1.04]">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-md text-base font-medium uppercase tracking-[0.08em] text-white/90 sm:text-lg">
                  {slide.description}
                </p>

                <div className="mt-10">
                  <Link
                    href={slide.buttonLink}
                    className="group inline-flex min-w-40 items-center justify-center rounded-full border border-white/70 bg-white px-7 py-4 text-sm font-semibold tracking-[0.18em] uppercase shadow-[0_16px_36px_rgba(15,10,7,0.16)] transition hover:border-theme-accent hover:bg-theme-accent"
                  >
                    <span className="leading-none text-theme-accent transition group-hover:text-white">
                      {slide.buttonTitle}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}

        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/8 text-white backdrop-blur-sm transition hover:bg-white/18 sm:left-5 md:inline-flex lg:left-7"
          onClick={goToPrevious}
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/8 text-white backdrop-blur-sm transition hover:bg-white/18 sm:right-5 md:inline-flex lg:right-7"
          onClick={goToNext}
        >
          <ArrowIcon direction="right" />
        </button>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
          {HERO_CAROUSEL_SLIDES.map((slide, index) => (
            <button
              key={`${slide.title}-dot`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={[
                "h-3 w-3 rounded-full border border-white/70 transition",
                index === activeIndex ? "bg-white" : "bg-white/20",
              ].join(" ")}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
