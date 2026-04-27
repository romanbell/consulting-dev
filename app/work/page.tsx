import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Micro } from "@/components/typography/Micro";
import { Headline } from "@/components/typography/Headline";
import { PROJECTS } from "@/lib/content/projects";
import { breadcrumbJsonLd } from "@/lib/seo/jsonLd";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from the Veridium studio archive. Data engineering, AI systems, and technical due diligence.",
};

export default function WorkPage() {
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
              ])
            ),
          }}
        />
        <Micro variant="accent" className="block mb-4">
          § 01 — Manifest
        </Micro>
        <Headline className="mb-4 max-[768px]:text-[24px]">
          Selected projects from the studio archive.
        </Headline>
        <p className="text-ink-2 text-[14.5px] max-[768px]:text-[16px] max-w-[52ch] mb-12 max-[768px]:mb-8">
          Every engagement is catalogued: the thing we shipped, the stack it
          sits on, and the result it moved.
        </p>

        {/* Desktop table */}
        <div className="max-[768px]:hidden">
          <div className="grid grid-cols-[56px_1.6fr_2.4fr_150px] gap-6 items-baseline py-3.5 border-b border-ink font-mono text-[10px] tracking-[0.14em] uppercase text-ink-2">
            <div>№</div>
            <div>Project</div>
            <div>Brief</div>
            <div>Outcome</div>
          </div>

          {PROJECTS.map((p) => (
            <Link
              key={p.n}
              href={`/work/${p.slug}`}
              className="grid grid-cols-[56px_1.6fr_2.4fr_150px] gap-6 items-baseline py-5 border-b border-rule no-underline transition-all duration-250 hover:bg-paper-2 hover:pl-3.5 relative group"
              style={{ transitionTimingFunction: "var(--ease-studio)" }}
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-ink origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-350"
                style={{ transitionTimingFunction: "var(--ease-studio)" }}
                aria-hidden="true"
              />
              <div className="font-mono text-[11px] text-ink-3">{p.n}</div>
              <div>
                <div className="font-sans font-medium text-[16px] tracking-[-0.01em] text-ink">
                  {p.title}
                </div>
                <small className="block font-mono text-[10px] tracking-[0.12em] uppercase text-accent-ink font-normal mt-1.5">
                  {p.tag}
                </small>
              </div>
              <div className="text-ink-2 text-[13.5px] leading-[1.5] max-w-[44ch]">
                {p.desc}
              </div>
              <div className="text-right">
                <span className="font-sans font-medium text-[28px] leading-none text-ink tracking-[-0.02em] tabular-nums">
                  {p.metric}
                </span>
                <small className="block font-mono text-[10px] tracking-[0.08em] uppercase text-ink-3 font-normal mt-2">
                  {p.unit}
                </small>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile card list */}
        <div className="hidden max-[768px]:block">
          {PROJECTS.map((p) => (
            <Link
              key={p.n}
              href={`/work/${p.slug}`}
              className="block py-5 border-b border-rule no-underline active:bg-paper-2"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="min-w-0">
                  <span className="font-sans font-medium text-[17px] tracking-[-0.01em] text-ink block leading-tight">
                    {p.title}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-accent-ink block mt-1.5">
                    {p.tag}
                  </span>
                </div>
                <div className="text-right shrink-0 pt-0.5">
                  <span className="font-sans font-medium text-[24px] leading-none text-ink tracking-[-0.02em] tabular-nums">
                    {p.metric}
                  </span>
                  <small className="block font-mono text-[9px] tracking-[0.08em] uppercase text-ink-3 font-normal mt-1">
                    {p.unit}
                  </small>
                </div>
              </div>
              <p className="m-0 text-ink-2 text-[14px] leading-[1.5]">
                {p.desc}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </Shell>
  );
}
