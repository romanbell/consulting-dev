import Link from "next/link";
import { PROJECTS } from "@/lib/content/projects";
import { Micro } from "@/components/typography/Micro";
import { Headline } from "@/components/typography/Headline";

const MOBILE_PROJECT_COUNT = 3;

export function Manifest() {
  return (
    <section id="manifest">
      {/* ===== DESKTOP ===== */}
      <div
        className="hidden min-[769px]:grid gap-12 items-start"
        style={{
          gridTemplateColumns: "140px 1fr",
          padding: "72px 0 24px",
        }}
      >
        <div className="sticky top-6 max-[1080px]:static">
          <span className="font-mono text-[11px] tracking-[0.06em] text-ink-3">
            Projects
          </span>
          <div className="mt-2">
            <Micro variant="mute">08 projects</Micro>
          </div>
        </div>
        <div>
          <Headline className="mb-7">
            Selected projects from the studio archive.
          </Headline>
          <p className="text-ink-2 text-[14.5px] max-w-[52ch] m-0 mb-9">
            Every engagement is catalogued: the thing we shipped, the stack it
            sits on, and the result it moved.
          </p>

          {/* Table header */}
          <div
            className="grid gap-6 items-baseline py-3.5 border-b border-ink font-mono text-[10px] tracking-[0.14em] uppercase text-ink-2"
            style={{
              gridTemplateColumns: "56px 1.6fr 2.4fr 220px 150px",
            }}
          >
            <div>№</div>
            <div>Project</div>
            <div>Brief</div>
            <div className="max-[1080px]:hidden">Stack</div>
            <div>Outcome</div>
          </div>

          {PROJECTS.map((p) => (
            <Link
              key={p.n}
              href={`/work/${p.slug}`}
              data-project-row
              data-ref={`VRD-${p.n}`}
              data-sector={p.sector}
              data-outcome={`${p.metric} ${p.unit}`}
              className="grid gap-6 items-baseline py-5 border-b border-rule relative no-underline transition-all duration-250 hover:bg-paper-2 hover:pl-3.5 group"
              style={{
                gridTemplateColumns: "56px 1.6fr 2.4fr 220px 150px",
                transitionTimingFunction: "var(--ease-studio)",
              }}
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
              <div className="font-mono text-[10.5px] text-ink-2 tracking-[0.02em] leading-[1.8] max-[1080px]:hidden">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="inline-block px-[7px] py-px border border-rule-2 mr-1 mb-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
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
      </div>

      {/* ===== MOBILE ===== */}
      {/* 3 project cards, not a table. Title + tag + metric. "View all" link. */}
      <div className="min-[769px]:hidden pt-10 pb-4">
        <span className="block mb-5 font-mono text-[11px] tracking-[0.06em] text-ink-3">
          Selected work
        </span>

        <div className="flex flex-col gap-0">
          {PROJECTS.slice(0, MOBILE_PROJECT_COUNT).map((p) => (
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
              <p className="m-0 text-ink-2 text-[14px] leading-[1.5] max-w-[44ch]">
                {p.desc}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/work"
          className="flex items-center justify-between py-4 mt-1 border-b border-ink no-underline text-ink min-h-[44px]"
        >
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase">
            View all {PROJECTS.length} projects
          </span>
          <span className="text-ink-3">→</span>
        </Link>
      </div>
    </section>
  );
}
