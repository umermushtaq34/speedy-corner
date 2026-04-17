import type { Metadata } from "next";
import { HeroCarousel } from "@/components/hero-carousel";
import { LocationsSection } from "@/components/locations-section";
import { PromoBanner } from "@/components/promo-banner";
import { WhatWeProvideSection } from "@/components/what-we-provide-section";
import {
  buildAbsoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
  SITE_NAME,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE_NAME} | Fuel, Convenience, Kitchen & Weekly Deals`,
  description:
    "Find nearby Speedy Corner locations for fuel, convenience essentials, kitchen items, coffee, liquor, lottery, bait, and weekly promotions.",
  path: "/",
  keywords: [
    "Speedy Corner homepage",
    "Speedy Corner weekly deals",
    "Kansas City gas station",
    "Kansas City convenience store",
    "fuel and convenience near me",
  ],
});

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ConvenienceStore",
    name: SITE_NAME,
    url: buildAbsoluteUrl("/"),
    image: buildAbsoluteUrl("/home-promo-banner.webp"),
    description:
      "Speedy Corner offers fuel, convenience essentials, kitchen items, drinks, bait, liquor, and weekly promotions.",
    areaServed: "Kansas City, Missouri",
    makesOffer: [
      { "@type": "Offer", name: "Fuel" },
      { "@type": "Offer", name: "Convenient Store" },
      { "@type": "Offer", name: "Kitchen" },
      { "@type": "Offer", name: "Drinks & Soda's" },
      { "@type": "Offer", name: "Bait" },
      { "@type": "Offer", name: "Liquor" },
      { "@type": "Offer", name: "Weekly Deals" },
    ],
  };
  const webPageSchema = buildWebPageSchema({
    title: `${SITE_NAME} | Fuel, Convenience, Kitchen & Weekly Deals`,
    description:
      "Find nearby Speedy Corner locations for fuel, convenience essentials, kitchen items, coffee, liquor, lottery, bait, and weekly promotions.",
    path: "/",
  });
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Home", path: "/" }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HeroCarousel />
      <LocationsSection />
      <WhatWeProvideSection />
      <PromoBanner />
    </>
  );
}
