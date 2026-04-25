import Link from "next/link";
import { PROJECTS } from "@/lib/content/projects";
import { Micro } from "@/components/typography/Micro";
import { Headline } from "@/components/typography/Headline";

export function Manifest() {
  return (
    <section
      id="manifest"
      className="grid gap-12 items-start"
      style={{
        gridTemplateColumns: "140px 1fr",
        padding: "72px 0 24px",
      }}
    >
      <div className="sticky top-6 max-[1080px]:static">
        <Micro variant="accent">§ 01 — Manifest</Micro>
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

        {/* Rows */}
        {PROJECTS.map((p) => (
          <Link
            key={p.n}
            href={`/work/${p.slug}`}
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
    </section>
  );
}
