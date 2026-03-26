import type { Metadata } from "next";
import { HeroCarousel } from "@/components/hero-carousel";
import { LocationsSection } from "@/components/locations-section";
import { PromoBanner } from "@/components/promo-banner";
import { WhatWeProvideSection } from "@/components/what-we-provide-section";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Speedy Corner | Fuel, Convenience, Kitchen & Weekly Deals",
  description:
    "Speedy Corner offers fuel, convenience essentials, kitchen items, drinks, bait, liquor, and weekly promotions at nearby locations.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Speedy Corner",
    "gas station",
    "convenience store",
    "weekly deals",
    "fuel near me",
    "kitchen",
    "drinks",
    "liquor",
    "Kansas City",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Speedy Corner",
    title: "Speedy Corner | Fuel, Convenience, Kitchen & Weekly Deals",
    description:
      "Find nearby Speedy Corner locations and discover fuel, convenience essentials, food options, and weekly promotions.",
    images: [
      {
        url: "/home-promo-banner.webp",
        width: 1600,
        height: 330,
        alt: "Speedy Corner weekly deals promo banner",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedy Corner | Fuel, Convenience, Kitchen & Weekly Deals",
    description:
      "Find nearby Speedy Corner locations and discover fuel, convenience essentials, food options, and weekly promotions.",
    images: ["/home-promo-banner.webp"],
  },
};

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ConvenienceStore",
    name: "Speedy Corner",
    url: SITE_URL,
    image: `${SITE_URL}/home-promo-banner.webp`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroCarousel />
      <LocationsSection />
      <WhatWeProvideSection />
      <PromoBanner />
    </>
  );
}
