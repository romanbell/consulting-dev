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
      <main id="main" className="py-20">
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
        <div className="mb-16">
          <Link
            href="/work"
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3 mb-8 inline-block hover:text-ink"
          >
            ← Back to all work
          </Link>
          <div className="flex items-baseline gap-6 mb-4">
            <Micro variant="accent">{project.tag}</Micro>
            <Micro variant="mute">{project.sector}</Micro>
          </div>
          <h1
            className="font-sans font-light text-ink m-0 mb-6 max-w-[20ch] text-balance"
            style={{
              fontSize: "clamp(36px, 5vw, 72px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {project.title}
          </h1>
          <div className="flex items-baseline gap-12 mt-8">
            <div>
              <span className="font-sans font-medium text-[48px] leading-none text-ink tracking-[-0.02em] tabular-nums">
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

        <div className="h-px bg-ink w-full mb-16" />

        {/* Body */}
        <div
          className="grid gap-16 max-w-[960px]"
          style={{ gridTemplateColumns: "1fr 320px" }}
        >
          <div>
            {/* Framing */}
            <h2 className="font-sans font-normal text-[20px] tracking-[-0.015em] mb-4 mt-0">
              The problem
            </h2>
            <p className="text-[15px] leading-[1.6] text-ink-2 max-w-[60ch] mb-12">
              {project.framing}
            </p>

            {/* Approach */}
            <h2 className="font-sans font-normal text-[20px] tracking-[-0.015em] mb-4 mt-0">
              The approach
            </h2>
            <ul className="list-none p-0 m-0 mb-12">
              {project.approach.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 py-3 border-b border-dashed border-rule-2 text-[14px] leading-[1.55] text-ink last:border-b-0"
                >
                  <span className="font-mono text-[10px] text-ink-3 tracking-[0.08em] shrink-0 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ul>

            {/* Reflection */}
            <h2 className="font-sans font-normal text-[20px] tracking-[-0.015em] mb-4 mt-0">
              What carries forward
            </h2>
            <p className="text-[15px] leading-[1.6] text-ink-2 max-w-[60ch]">
              {project.reflection}
            </p>
          </div>

          {/* Sidebar: Stack detail */}
          <aside className="border-l border-rule pl-8 max-[1080px]:border-l-0 max-[1080px]:pl-0 max-[1080px]:border-t max-[1080px]:pt-8">
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
                  <div className="text-[12.5px] text-ink-3 leading-[1.5]">
                    {s.reason}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Prev/Next */}
        <div className="mt-24 border-t border-ink pt-8 grid grid-cols-2 gap-8">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="no-underline group"
            >
              <Micro variant="mute" className="block mb-2">
                ← Previous
              </Micro>
              <span className="font-sans text-[17px] text-ink group-hover:text-accent-ink transition-colors duration-200">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="no-underline text-right group"
            >
              <Micro variant="mute" className="block mb-2">
                Next →
              </Micro>
              <span className="font-sans text-[17px] text-ink group-hover:text-accent-ink transition-colors duration-200">
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
