import Image from "next/image";
import Link from "next/link";
import { NAVBAR_LINKS } from "@/constants/navigation";

const quickLinks = NAVBAR_LINKS.flatMap((item) =>
  "href" in item ? [{ label: item.label, href: item.href }] : item.children
);

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/8 bg-theme-charcoal text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:px-9 lg:py-16">
        <div className="max-w-sm">
          <Link href="/" className="inline-block" aria-label="Speedy Corner home">
            <div className="relative h-16 w-[210px] sm:h-[72px] sm:w-[250px]">
              <Image
                src="/speedy-corner-logo.webp"
                alt="Speedy Corner"
                fill
                className="object-contain object-left brightness-[1.02]"
                sizes="(max-width: 640px) 210px, 250px"
              />
            </div>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">
            Speedy Corner brings together quick service, fresh flavor, and a clean
            neighborhood-friendly experience.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.18em] text-theme-accent uppercase">
            Quick Links
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-white/78">
            {quickLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link href={link.href} className="transition hover:text-theme-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.18em] text-theme-accent uppercase">
            Contact Information
          </h2>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-white/76">
            <p>
              24 Main Boulevard
              <br />
              Lahore, Pakistan
            </p>
            <p>
              <a href="tel:+920000000000" className="transition hover:text-theme-accent">
                +92 000 000 0000
              </a>
              <br />
              <a
                href="mailto:hello@speedycorner.com"
                className="transition hover:text-theme-accent"
              >
                hello@speedycorner.com
              </a>
            </p>
            <p>Mon - Sun: 11:00 AM to 11:00 PM</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-4 text-xs text-white/52 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-9">
          <p>© 2026 Speedy Corner. All rights reserved.</p>
          <p>Crafted for a fast, modern food experience.</p>
        </div>
      </div>
    </footer>
  );
}
