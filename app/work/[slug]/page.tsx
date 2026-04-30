import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Micro } from "@/components/typography/Micro";
import { Identicon } from "@/components/ui/Identicon";
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
      <main id="main" className="py-10 max-[768px]:py-6">
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
        <div className="mb-10 max-[768px]:mb-6">
          {/* Back link + tag/sector share a row to compress the top of the page */}
          <div className="flex items-center justify-between gap-4 mb-6 max-[768px]:mb-5 flex-wrap">
            <Link
              href="/work"
              className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3 hover:text-ink min-h-[44px] inline-flex items-center"
            >
              ← Back to all work
            </Link>
            <div className="flex items-baseline gap-5 max-[768px]:gap-3">
              <Micro variant="accent">{project.tag}</Micro>
              <Micro variant="mute">{project.sector}</Micro>
            </div>
          </div>

          {/* Title left, metric + stack right */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] max-[768px]:grid-cols-1 gap-x-12 gap-y-6 items-end">
            <h1
              className="font-sans font-light text-ink m-0 max-w-[20ch] max-[768px]:max-w-none"
              style={{
                fontSize: "clamp(28px, 5vw, 72px)",
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                overflowWrap: "anywhere",
              }}
            >
              {project.title}
            </h1>

            <div className="text-right max-[768px]:text-left max-w-[280px] max-[768px]:max-w-none justify-self-end max-[768px]:justify-self-start">
              <span className="font-sans font-medium text-[48px] max-[768px]:text-[36px] leading-none text-ink tracking-[-0.02em] tabular-nums block">
                {project.metric}
              </span>
              <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-3 mt-2 mb-3">
                {project.unit}
              </div>
              <div className="font-mono text-[10.5px] text-ink-2 tracking-[0.02em] flex flex-wrap gap-1 max-[768px]:justify-start justify-end">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="inline-block px-[7px] py-px border border-rule-2 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-ink w-full mb-16 max-[768px]:mb-10" />

        {/* Body: desktop 2-col, mobile single column. At very wide widths the
            aside grows so the Stack — justified list can flow into 2×2. */}
        <div className="grid grid-cols-[1fr_320px] min-[1200px]:grid-cols-[1fr_460px] max-[768px]:grid-cols-1 gap-16 max-[768px]:gap-10 max-w-[960px] min-[1200px]:max-w-[1180px]">
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
            <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 min-[1200px]:gap-x-6">
              {project.stackDetail.map((s) => (
                <div
                  key={s.tool}
                  className="py-3 border-b border-dashed border-rule-2 last:border-b-0 min-[1200px]:[&:nth-last-child(-n+2)]:border-b-0"
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

            {/* Project hash — small archival stamp at the foot of the stack */}
            <div className="mt-8 pt-5 border-t border-dashed border-rule-2">
              <div className="flex items-baseline justify-between mb-2.5">
                <Micro variant="mute">Ref</Micro>
                <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-ink-3">
                  VRD-{project.n}
                </span>
              </div>
              <div
                className="border border-rule-2 bg-paper-2 relative overflow-hidden"
                style={{ height: 72, padding: 4 }}
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(-45deg, transparent 0 6px, rgba(23,23,26,.035) 6px 7px)",
                  }}
                />
                <Identicon
                  seed={`VRD-${project.n}`}
                  animateKey={`VRD-${project.n}`}
                  cols={13}
                  rows={5}
                  className="w-full h-full block relative"
                  totalMs={400}
                  cellMs={180}
                  targetOpacity={0.55}
                  fill="var(--accent-ink)"
                />
              </div>
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
