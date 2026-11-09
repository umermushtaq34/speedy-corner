import type { Metadata } from "next";
import Link from "next/link";
import { JOBS } from "@/constants/jobs";
import {
  buildAbsoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";

const description =
  "Explore careers at Speedy Corner. View our Cashier opening and apply to join a customer-focused convenience store team in Kansas City and Hillsdale.";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers & Job Openings | Speedy Corner",
  description,
  path: "/careers",
  keywords: ["Speedy Corner careers", "cashier jobs", "convenience store jobs", "Kansas City jobs", "Hillsdale jobs"],
});

export default function CareersPage() {
  const schemas = [
    buildWebPageSchema({ title: "Careers at Speedy Corner", description, path: "/careers", type: "CollectionPage" }),
    buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: JOBS.map((job, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: job.title,
        url: buildAbsoluteUrl(`/careers/${job.slug}`),
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} />
      <section className="bg-[linear-gradient(180deg,#fbfaf8_0%,#f3ece3_100%)] py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
          <header className="max-w-3xl">
            <p className="eyebrow">Careers</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-theme-ink sm:text-5xl">A great stop. A great team.</h1>
            <p className="mt-5 text-lg leading-8 text-theme-muted">Bring your energy, reliability, and a friendly smile. Help us make every visit to Speedy Corner a little better.</p>
          </header>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-b border-theme-line pb-5">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">Open Positions</h2>
            <p className="text-sm text-theme-muted">{JOBS.length} {JOBS.length === 1 ? "opening" : "openings"}</p>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {JOBS.map((job) => (
              <Link key={job.slug} href={`/careers/${job.slug}`} className="group flex flex-col rounded-[1.35rem] border border-theme-line/70 bg-white p-6 shadow-[0_16px_34px_rgba(42,30,20,0.06)] transition hover:border-theme-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-accent sm:p-8">
                <span className="text-xs font-semibold tracking-[0.14em] text-theme-accent uppercase">Store Team</span>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-theme-ink">{job.title}</h3>
                <p className="mt-4 text-base leading-7 text-theme-muted">{job.summary}</p>
                <span className="mt-8 inline-flex items-center justify-between gap-4 border-t border-theme-line pt-5 text-sm font-semibold text-theme-ink group-hover:text-theme-accent">View Position & Apply <span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
