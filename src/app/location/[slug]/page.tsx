import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LocationImageCarousel } from "@/components/location-image-carousel";
import { Location_data } from "@/constants/locations";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";

type RouteParams = Promise<{ slug: string }>;
const GLOBAL_SEO_KEYWORDS = [
  "Speedy Corner",
  "gas station",
  "convenience store",
  "fuel and snacks",
  "Kansas City",
] as const;

const normalizeSlug = (slug: string) => slug.replace(/^\/+/, "").toLowerCase();

const iconClassName = "h-4 w-4 text-theme-accent";

const FeatureIcon = ({ feature }: { feature: string }) => {
  switch (feature.toLowerCase()) {
    case "fast":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={iconClassName}
          aria-hidden="true"
        >
          <path
            d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "fresh":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={iconClassName}
          aria-hidden="true"
        >
          <path
            d="M20 4c-6 1-10 5-11 11 5-1 9-5 11-11z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20c2-2 4-3 7-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={iconClassName}
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 8v5l3 2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

const findLocationBySlug = (slug: string) =>
  Location_data.find(
    (location) => normalizeSlug(location.slug) === normalizeSlug(slug),
  );

export async function generateStaticParams() {
  return Location_data.map((location) => ({
    slug: normalizeSlug(location.slug),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = findLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found | Speedy Corner",
    };
  }

  const normalizedSlug = normalizeSlug(slug);
  const canonicalPath = `/location/${normalizedSlug}`;
  const seoTitle =
    location.seo_title_variants[0] ?? `${location.name} | Speedy Corner`;
  const seoKeywords = Array.from(
    new Set([
      ...GLOBAL_SEO_KEYWORDS,
      ...location.seo_keywords,
      ...location.features,
      ...location.services,
    ]),
  );

  return {
    title: seoTitle,
    description: `${location.description} ${location.tagline}`,
    keywords: seoKeywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: seoTitle,
      description: `${location.description} ${location.tagline}`,
      url: canonicalPath,
      siteName: "Speedy Corner",
      type: "website",
      images: [
        {
          url: location.featured_image,
          width: 1200,
          height: 630,
          alt: `${location.name} featured image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: `${location.description} ${location.tagline}`,
      images: [location.featured_image],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const location = findLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const fullAddress = `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}, ${location.address.country}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
  const carouselImages = Array.from(
    new Set([location.featured_image, ...location.image_paths]),
  );

  return (
    <section className="bg-[linear-gradient(180deg,#fbfaf8_0%,#f3ece3_100%)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-9">
        <article className="prose prose-stone max-w-none">
          <p className="eyebrow !mb-3 !mt-0">Location Details</p>
          <h1 className="!mb-3 !mt-0 !text-4xl !font-semibold !tracking-[-0.03em] !text-theme-ink sm:!text-5xl">
            {location.name}
          </h1>
          <p className="!my-0 !text-lg !leading-8 !text-theme-muted">
            {location.tagline}
          </p>
          <p className="!mt-3 !text-base !leading-8 !text-theme-muted">
            {location.description}
          </p>

          <h2 className="!mb-2 !mt-10 !text-2xl !font-semibold !text-theme-ink">Address</h2>
          <p className="!my-0 !text-base !leading-8 !text-theme-muted">{fullAddress}</p>

          <h2 className="!mb-2 !mt-10 !text-2xl !font-semibold !text-theme-ink">Find Us On The Map</h2>
        </article>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
            Featured Image
          </h2>
          <div className="relative mt-4 h-[280px] overflow-hidden rounded-[1.2rem] border border-theme-line/80 bg-white shadow-[0_14px_32px_rgba(42,30,20,0.08)] sm:h-[460px]">
            <Image
              src={location.featured_image}
              alt={`${location.name} featured image`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 896px"
              priority
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
        </section>

        <LocationImageCarousel
          images={carouselImages}
          locationName={location.name}
        />

        <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-theme-line/80 bg-white shadow-[0_14px_32px_rgba(42,30,20,0.08)]">
          <div className="h-[320px] w-full sm:h-[420px]">
            <iframe
              title={`${location.name} map`}
              src={mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <a
          href={location.map_url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-[0.9rem] bg-theme-accent px-5 text-xs font-semibold tracking-[0.1em] text-white uppercase transition hover:brightness-95 sm:text-sm"
        >
          Open In Google Maps
        </a>

        <article className="prose prose-stone mt-10 max-w-none">
          <h2 className="!mb-2 !mt-0 !text-2xl !font-semibold !text-theme-ink">About This Location</h2>
          <p className="!text-base !leading-8 !text-theme-muted">{location.about}</p>

          <h2 className="!mb-2 !mt-8 !text-2xl !font-semibold !text-theme-ink">Why Visit This Location</h2>
          <ul className="!my-0 list-disc pl-6 text-base leading-8 text-theme-muted">
            {location.why_choose_us.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="!mb-2 !mt-8 !text-2xl !font-semibold !text-theme-ink">Services Available</h2>
          <ul className="!my-0 list-disc pl-6 text-base leading-8 text-theme-muted">
            {location.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>

          <h2 className="!mb-2 !mt-8 !text-2xl !font-semibold !text-theme-ink">Core Features</h2>
          <ul className="!my-0 grid gap-2 pl-0 text-base leading-8 text-theme-muted">
            {location.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 list-none">
                <FeatureIcon feature={feature} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-[0.95rem] bg-theme-accent px-6 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:brightness-95"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-[0.95rem] border border-theme-line bg-white px-6 text-sm font-semibold tracking-[0.08em] text-theme-ink uppercase transition hover:border-theme-accent hover:text-theme-accent"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
