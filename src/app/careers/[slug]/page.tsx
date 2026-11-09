import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CareerApplicationForm } from "@/components/career-application-form";
import { findJob, JOBS } from "@/constants/jobs";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return JOBS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = findJob((await params).slug);
  if (!job) notFound();

  return buildPageMetadata({
    title: `${job.title} Job Application | Speedy Corner Careers`,
    description: `Apply for the ${job.title} position at Speedy Corner. ${job.summary}`,
    path: `/careers/${job.slug}`,
    keywords: [`Speedy Corner ${job.title} job`, `${job.title} application`, "retail careers", "convenience store careers"],
  });
}

export default async function CareerApplicationPage({ params }: Props) {
  const job = findJob((await params).slug);
  if (!job) notFound();

  const schemas = [
    buildWebPageSchema({ title: `${job.title} Job Application`, description: job.summary, path: `/careers/${job.slug}` }),
    buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }, { name: job.title, path: `/careers/${job.slug}` }]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} />
      <section className="bg-[linear-gradient(180deg,#fbfaf8_0%,#f3ece3_100%)] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-9">
          <Link href="/careers" className="text-sm font-semibold text-theme-muted underline-offset-4 hover:text-theme-accent hover:underline">← All Open Positions</Link>
          <header className="mt-8 max-w-3xl">
            <p className="eyebrow">Join Speedy Corner</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-theme-ink sm:text-5xl">{job.title}</h1>
            <p className="mt-4 text-lg leading-8 text-theme-muted">{job.summary}</p>
          </header>

          <div className="mt-8 grid gap-6 rounded-[1.35rem] border border-theme-line/70 bg-white/80 p-6 sm:p-8 lg:grid-cols-2 lg:gap-10">
            <section aria-labelledby="expectation-summary">
              <h2 id="expectation-summary" className="text-xl font-semibold text-theme-ink">Expectation Summary</h2>
              <p className="mt-3 text-sm leading-7 text-theme-muted">{job.expectationSummary}</p>
            </section>
            <section aria-labelledby="responsibilities">
              <h2 id="responsibilities" className="text-xl font-semibold text-theme-ink">What You’ll Do</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-theme-muted">
                {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>

          <CareerApplicationForm job={job} />
        </div>
      </section>
    </>
  );
}
