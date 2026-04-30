import { Micro } from "@/components/typography/Micro";

const STUDIO_FACTS = [
  ["Est.", "2024"],
  ["HQ", "New York"],
  ["Team", "2 + network"],
];

export function Fieldwork() {
  return (
    <section id="fieldwork" className="border-t border-b border-rule mt-14 max-[768px]:mt-0">
      {/* ===== DESKTOP ===== */}
      <div
        className="hidden min-[769px]:grid gap-12"
        style={{
          gridTemplateColumns: "140px 1fr 320px",
          padding: "96px 0",
        }}
      >
        <div>
          <span className="font-mono text-[11px] tracking-[0.06em] text-ink-3">
            Studio
          </span>
        </div>
        <div>
          <p className="font-sans font-normal text-[22px] leading-[1.3] text-ink m-0 mb-8 max-w-[30ch] border-l-2 border-ink pl-5 tracking-[-0.015em]">
            Projects deserve more from their data. We treat each engagement as an
            artifact: researched, built, and left better than we found it.
          </p>
          <p className="m-0 mb-4 text-[15.5px] leading-[1.55] text-ink max-w-[60ch]">
            Veridium is a two-person studio that works like a four-person team.
            Founded by Jeffrey Wang and Roman Bellisari in 2024, the studio sits
            where strategy meets engineering, the seam where most data initiatives
            quietly fail.
          </p>
          <p className="m-0 mb-4 text-[15.5px] leading-[1.55] text-ink-2 max-w-[60ch]">
            We embed with leadership teams, technical founders, and operators who
            already know the business and need a partner who can get into the
            schema, the pipeline, and the P&amp;L without losing sight of any of
            them. Most projects begin when the problem has outgrown the
            spreadsheet and hasn&apos;t yet earned the headcount.
          </p>
        </div>
        <aside className="border border-rule-2 p-[22px] bg-paper-2 flex flex-col gap-3.5 text-[12.5px]">
          <Micro variant="ink">Studio file — card 02/A</Micro>
          <div className="flex flex-col">
            {[
              ["Founded", "2024"],
              ["HQ", "New York, NY"],
              ["Size", "2 partners + network"],
              ["Projects", "08 to date"],
              ["Ethos", "Strategy · Systems · Sign-off"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[90px_1fr] gap-3 py-2 border-b border-dashed border-rule-2 font-mono text-[11px] last:border-b-0"
              >
                <span className="text-ink-3 tracking-[0.06em]">{k}</span>
                <span className="text-ink">{v}</span>
              </div>
            ))}
            <div className="grid grid-cols-[90px_1fr] gap-3 py-2 font-mono text-[11px]">
              <span className="text-ink-3 tracking-[0.06em]">Availability</span>
              <span className="text-accent-ink">Q3 2026 open</span>
            </div>
          </div>
        </aside>
      </div>

      {/* ===== MOBILE ===== */}
      {/* Condensed: blockquote, one paragraph, compact facts strip. */}
      <div className="min-[769px]:hidden py-10">
        <span className="block mb-5 font-mono text-[11px] tracking-[0.06em] text-ink-3">
          The studio
        </span>

        <p
          className="font-sans font-normal text-[20px] leading-[1.35] text-ink m-0 mb-6 border-l-2 border-ink pl-4 tracking-[-0.01em]"
        >
          Projects deserve more from their data. We treat each engagement as an
          artifact: researched, built, and left better than we found it.
        </p>

        <p className="m-0 mb-8 text-[16px] leading-[1.55] text-ink-2">
          A two-person studio where strategy meets engineering. Founded 2024.
          We embed with teams who know their business and need a partner who
          can work across schema, pipeline, and P&amp;L.
        </p>

        {/* Compact facts row */}
        <div className="flex gap-0 border-t border-b border-rule">
          {STUDIO_FACTS.map(([k, v], i) => (
            <div
              key={k}
              className="flex-1 py-3 font-mono text-[10px] tracking-[0.06em]"
              style={{
                borderRight: i < STUDIO_FACTS.length - 1 ? "1px solid var(--rule)" : "none",
                paddingRight: i < STUDIO_FACTS.length - 1 ? "12px" : "0",
                paddingLeft: i > 0 ? "12px" : "0",
              }}
            >
              <span className="text-ink-3 block uppercase tracking-[0.12em]">{k}</span>
              <span className="text-ink block mt-0.5 text-[11px]">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
