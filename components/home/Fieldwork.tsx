import { Micro } from "@/components/typography/Micro";

export function Fieldwork() {
  return (
    <section
      id="fieldwork"
      className="grid gap-12 border-t border-b border-rule mt-14"
      style={{
        gridTemplateColumns: "140px 1fr 320px",
        padding: "96px 0",
      }}
    >
      <div className="max-[1080px]:col-span-full">
        <Micro variant="accent">§ 02 — Studio</Micro>
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
      <aside className="border border-rule-2 p-[22px] bg-paper-2 flex flex-col gap-3.5 text-[12.5px] max-[1080px]:col-span-full">
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
    </section>
  );
}
