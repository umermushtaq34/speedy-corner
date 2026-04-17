import type { Metadata } from "next";
import { Location_data } from "@/constants/locations";
import { SITE_URL } from "@/lib/site";

const locationKeywords = Location_data.flatMap((location) => [
  location.name,
  location.address.street,
  `${location.address.city} ${location.address.state}`,
  ...location.services,
  ...location.features,
]);

export const SITE_NAME = "Speedy Corner";
export const DEFAULT_OG_IMAGE = "/home-promo-banner.webp";
const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE;

export const SITE_KEYWORDS = Array.from(
  new Set([
    SITE_NAME,
    "Speedy Corner Kansas City",
    "Speedy Corner locations",
    "gas station",
    "gas station near me",
    "convenience store",
    "convenience store near me",
    "fuel station",
    "diesel fuel",
    "premium fuel",
    "regular gas",
    "kitchen",
    "drive thru kitchen",
    "coffee bar",
    "snacks and drinks",
    "cold beverages",
    "liquor store",
    "beer and wine",
    "vapes",
    "bait shop",
    "lottery tickets",
    "scratchers",
    "weekly deals",
    "promotions",
    "Kansas City MO",
    "Hillsdale KS",
    ...locationKeywords,
  ]),
);

export const DEFAULT_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  image?: string;
  type?: "website" | "article";
};

export function buildAbsoluteUrl(path: string) {
  if (!path || path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function getImageMimeType(imageUrl: string) {
  if (imageUrl.endsWith(".png")) {
    return "image/png";
  }

  if (imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  if (imageUrl.endsWith(".gif")) {
    return "image/gif";
  }

  if (imageUrl.endsWith(".svg")) {
    return "image/svg+xml";
  }

  return "image/webp";
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageSeoConfig): Metadata {
  const canonical = path || "/";
  const absoluteCanonical = buildAbsoluteUrl(canonical);
  const absoluteImage = buildAbsoluteUrl(image);
  const imageMimeType = getImageMimeType(image);
  const mergedKeywords = Array.from(new Set([...SITE_KEYWORDS, ...keywords]));
  const otherMeta: NonNullable<Metadata["other"]> = {
    "og:image:secure_url": absoluteImage,
    "og:image:type": imageMimeType,
    "og:image:alt": `${title} | ${SITE_NAME}`,
    "pinterest-rich-pin": "true",
  };

  if (FACEBOOK_APP_ID) {
    otherMeta["fb:app_id"] = FACEBOOK_APP_ID;
  }

  return {
    title,
    description,
    applicationName: SITE_NAME,
    referrer: "origin-when-cross-origin",
    keywords: mergedKeywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "retail",
    classification: "Convenience store and fuel station",
    alternates: {
      canonical,
    },
    robots: DEFAULT_ROBOTS,
    other: otherMeta,
    openGraph: {
      type,
      url: absoluteCanonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      images: [
        {
          url: absoluteImage,
          secureUrl: absoluteImage,
          type: imageMimeType,
          width: 1600,
          height: 330,
          alt: `${title} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      images: [absoluteImage],
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Speedy Corner offers fuel, convenience essentials, kitchen items, drinks, bait, liquor, and promotions across Kansas City and Hillsdale locations.",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: buildAbsoluteUrl("/icon.png"),
    description:
      "Speedy Corner is a convenience store and fuel station brand serving customers with gas, kitchen items, coffee, drinks, liquor, lottery, and everyday essentials.",
    areaServed: ["Kansas City, Missouri", "Hillsdale, Kansas"],
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}

export function buildWebPageSchema({
  title,
  description,
  path,
  type = "WebPage",
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: buildAbsoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "en-US",
  };
}

export function buildLocationSchema(location: (typeof Location_data)[number]) {
  const fullAddress = `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}, ${location.address.country}`;

  return {
    "@context": "https://schema.org",
    "@type": "ConvenienceStore",
    name: location.name,
    description: `${location.description} ${location.tagline}`,
    url: buildAbsoluteUrl(`/location/${location.slug.replace(/^\/+/, "")}`),
    image: buildAbsoluteUrl(location.featured_image),
    telephone: "+1 913 742 0919",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zip,
      addressCountry: location.address.country,
    },
    hasMap: location.map_url,
    areaServed: location.address.city,
    knowsAbout: location.services,
    amenityFeature: location.services.map((service) => ({
      "@type": "LocationFeatureSpecification",
      name: service,
      value: true,
    })),
    keywords: Array.from(
      new Set([
        location.name,
        fullAddress,
        ...location.seo_keywords,
        ...location.services,
        ...location.features,
      ]),
    ).join(", "),
  };
}
