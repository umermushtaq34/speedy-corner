"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAVBAR_LINKS } from "@/constants/navigation";

function BrandMark() {
  return (
    <div className="relative h-14 w-[190px] sm:h-16 sm:w-[220px] lg:h-[72px] lg:w-[285px]">
      <Image
        src="/speedy-corner-logo.webp"
        alt="Speedy Corner"
        fill
        priority
        className="object-contain object-left"
        sizes="(max-width: 640px) 190px, (max-width: 1024px) 220px, 285px"
      />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="m16 16 4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CaretIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="m3 6 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const locationsMenuRef = useRef<HTMLLIElement | null>(null);

  function isActiveHref(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!locationsOpen) {
        return;
      }

      if (!locationsMenuRef.current?.contains(event.target as Node)) {
        setLocationsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLocationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [locationsOpen]);

  function closeMenus() {
    setMobileOpen(false);
    setLocationsOpen(false);
  }

  function toggleMobileMenu() {
    setMobileOpen((open) => !open);
    setLocationsOpen(false);
  }

  function toggleLocations() {
    setLocationsOpen((open) => !open);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-theme-line/70 bg-theme-paper/92 backdrop-blur-xl">
      <div className="border-b border-white/8 bg-theme-charcoal text-white py-2">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-9">
          <p className="hidden text-[0.78rem] font-medium tracking-[0.18em] text-white/68 uppercase md:block">
            Fast service, fresh food, and citywide convenience
          </p>

          <div className="ml-auto flex items-center gap-3">
            {searchOpen ? (
              <label className="flex h-10 w-[min(100vw-7rem,21rem)] items-center rounded-full border border-white/12 bg-white/10 px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <SearchIcon />
                <input
                  type="search"
                  placeholder="Search menu, branch, offer..."
                  className="ml-2 w-full bg-transparent text-sm font-medium outline-none placeholder:text-white/45"
                />
              </label>
            ) : null}

            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-theme-accent transition hover:border-theme-accent/50 hover:bg-white/12"
              onClick={() => setSearchOpen((open) => !open)}
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/88 shadow-[0_12px_30px_rgba(25,19,13,0.05)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:relative lg:px-9 lg:py-5">
          <Link
            href="/"
            className="shrink-0"
            aria-label="Speedy Corner home"
            onClick={closeMenus}
          >
            <BrandMark />
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-theme-line bg-theme-paper text-theme-ink transition hover:border-theme-accent hover:text-theme-accent lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation"
            onClick={toggleMobileMenu}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className="h-0.5 w-full rounded-full bg-current" />
              <span className="h-0.5 w-full rounded-full bg-current" />
              <span className="h-0.5 w-full rounded-full bg-current" />
            </span>
          </button>

          <nav
            id="primary-navigation"
            className={[
              "absolute inset-x-4 top-full mt-3 lg:static lg:inset-auto lg:mt-0 lg:block lg:flex-1",
              mobileOpen ? "block" : "hidden lg:block",
            ].join(" ")}
            aria-label="Primary"
          >
            <ul className="flex flex-col gap-1 rounded-[1.5rem] border border-theme-line/80 bg-white p-3 shadow-[0_18px_44px_rgba(25,19,13,0.12)] lg:flex-row lg:items-center lg:justify-end lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              {NAVBAR_LINKS.map((item) => {
                if ("children" in item) {
                  const hasActiveChild = item.children.some((child) => isActiveHref(child.href));

                  return (
                    <li key={item.label} ref={locationsMenuRef} className="relative">
                      <button
                        type="button"
                        className={[
                          "inline-flex w-full items-center justify-between gap-2 rounded-full px-4 py-3 text-left text-[0.98rem] font-medium transition lg:w-auto lg:justify-center lg:px-5 lg:py-2.5",
                          hasActiveChild
                            ? "bg-theme-accent text-white shadow-[0_10px_20px_rgba(242,106,33,0.22)]"
                            : "text-theme-ink/78 hover:bg-theme-paper hover:text-theme-accent",
                        ].join(" ")}
                        aria-expanded={locationsOpen}
                        onClick={toggleLocations}
                      >
                        <span>{item.label}</span>
                        <CaretIcon />
                      </button>

                      {locationsOpen ? (
                        <div className="mt-2 rounded-[1.2rem] border border-theme-line/80 bg-white p-2 shadow-[0_18px_40px_rgba(35,27,19,0.12)] lg:absolute lg:left-1/2 lg:z-10 lg:mt-3 lg:min-w-64 lg:-translate-x-1/2">
                          <ul className="flex flex-col gap-1">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-theme-ink/78 transition hover:bg-theme-paper hover:text-theme-accent"
                                  onClick={closeMenus}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={[
                        "inline-flex items-center rounded-full px-4 py-3 text-[0.98rem] font-medium transition lg:px-5 lg:py-2.5",
                        isActiveHref(item.href)
                          ? "bg-theme-accent text-white shadow-[0_10px_20px_rgba(242,106,33,0.22)]"
                          : "text-theme-ink/78 hover:bg-theme-paper hover:text-theme-accent",
                      ].join(" ")}
                      onClick={closeMenus}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
