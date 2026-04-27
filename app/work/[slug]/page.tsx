import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Micro } from "@/components/typography/Micro";
import { PROJECTS } from "@/lib/content/projects";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo/jsonLd";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.desc,
    openGraph: {
      title: `${project.title} — Veridium`,
      description: project.desc,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = PROJECTS.indexOf(project);
  const prev = idx > 0 ? PROJECTS[idx - 1] : undefined;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : undefined;

  return (
    <Shell>
      <Nav />
      <main id="main" className="py-20 max-[768px]:py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd([
                { name: "Home", url: siteConfig.url },
                { name: "Work", url: `${siteConfig.url}/work` },
                {
                  name: project.title,
                  url: `${siteConfig.url}/work/${project.slug}`,
                },
              ])
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectJsonLd(project)),
          }}
        />

        {/* Header */}
        <div className="mb-16 max-[768px]:mb-10">
          <Link
            href="/work"
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3 mb-8 max-[768px]:mb-6 inline-block hover:text-ink min-h-[44px] max-[768px]:flex max-[768px]:items-center"
          >
            ← Back to all work
          </Link>
          <div className="flex items-baseline gap-6 max-[768px]:gap-3 mb-4">
            <Micro variant="accent">{project.tag}</Micro>
            <Micro variant="mute">{project.sector}</Micro>
          </div>
          <h1
            className="font-sans font-light text-ink m-0 mb-6 max-w-[20ch] max-[768px]:max-w-none text-balance"
            style={{
              fontSize: "clamp(28px, 5vw, 72px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {project.title}
          </h1>

          {/* Metric + stack */}
          <div className="flex items-baseline gap-12 mt-8 max-[768px]:flex-col max-[768px]:gap-4 max-[768px]:items-start">
            <div>
              <span className="font-sans font-medium text-[48px] max-[768px]:text-[36px] leading-none text-ink tracking-[-0.02em] tabular-nums">
                {project.metric}
              </span>
              <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-3 mt-2">
                {project.unit}
              </div>
            </div>
            <div className="font-mono text-[10.5px] text-ink-2 tracking-[0.02em]">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="inline-block px-[7px] py-px border border-rule-2 mr-1 mb-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-ink w-full mb-16 max-[768px]:mb-10" />

        {/* Body: desktop 2-col, mobile single column */}
        <div className="grid grid-cols-[1fr_320px] max-[768px]:grid-cols-1 gap-16 max-[768px]:gap-10 max-w-[960px]">
          <div>
            <h2 className="font-sans font-normal text-[20px] max-[768px]:text-[18px] tracking-[-0.015em] mb-4 mt-0">
              The problem
            </h2>
            <p className="text-[15px] max-[768px]:text-[16px] leading-[1.6] text-ink-2 max-w-[60ch] mb-12 max-[768px]:mb-8">
              {project.framing}
            </p>

            <h2 className="font-sans font-normal text-[20px] max-[768px]:text-[18px] tracking-[-0.015em] mb-4 mt-0">
              The approach
            </h2>
            <ul className="list-none p-0 m-0 mb-12 max-[768px]:mb-8">
              {project.approach.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 py-3 border-b border-dashed border-rule-2 text-[14px] max-[768px]:text-[16px] leading-[1.55] text-ink last:border-b-0"
                >
                  <span className="font-mono text-[10px] text-ink-3 tracking-[0.08em] shrink-0 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ul>

            <h2 className="font-sans font-normal text-[20px] max-[768px]:text-[18px] tracking-[-0.015em] mb-4 mt-0">
              What carries forward
            </h2>
            <p className="text-[15px] max-[768px]:text-[16px] leading-[1.6] text-ink-2 max-w-[60ch]">
              {project.reflection}
            </p>
          </div>

          {/* Sidebar / Stack detail */}
          <aside className="border-l border-rule pl-8 max-[768px]:border-l-0 max-[768px]:pl-0 max-[768px]:border-t max-[768px]:pt-8">
            <Micro variant="ink" className="block mb-4">
              Stack — justified
            </Micro>
            <div className="flex flex-col gap-0">
              {project.stackDetail.map((s) => (
                <div
                  key={s.tool}
                  className="py-3 border-b border-dashed border-rule-2 last:border-b-0"
                >
                  <div className="font-mono text-[11px] text-ink tracking-[0.04em] mb-1">
                    {s.tool}
                  </div>
                  <div className="text-[12.5px] max-[768px]:text-[14px] text-ink-3 leading-[1.5]">
                    {s.reason}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Prev/Next */}
        <div className="mt-24 max-[768px]:mt-14 border-t border-ink pt-8 grid grid-cols-2 gap-8 max-[768px]:gap-4">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="no-underline group min-h-[44px]"
            >
              <Micro variant="mute" className="block mb-2">
                ← Previous
              </Micro>
              <span className="font-sans text-[17px] max-[768px]:text-[15px] text-ink group-hover:text-accent-ink transition-colors duration-200">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="no-underline text-right group min-h-[44px]"
            >
              <Micro variant="mute" className="block mb-2">
                Next →
              </Micro>
              <span className="font-sans text-[17px] max-[768px]:text-[15px] text-ink group-hover:text-accent-ink transition-colors duration-200">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
      <Footer />
    </Shell>
  );
}
