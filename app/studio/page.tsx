import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Micro } from "@/components/typography/Micro";
import { Headline } from "@/components/typography/Headline";
import { PARTNERS } from "@/lib/content/partners";
import { CAPABILITIES } from "@/lib/content/capabilities";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Veridium is a two-person data and technology studio based in New York, founded in 2024 by Jeffrey Wang and Roman Bellisari.",
};

export default function StudioPage() {
  return (
    <Shell>
      <Nav />
      <main id="main" className="py-20">
        <Micro variant="accent" className="block mb-4">
          § 02 — Studio
        </Micro>
        <Headline level={1} className="mb-8 max-w-[18ch]">
          Two people, one studio, the full stack.
        </Headline>

        <div className="grid gap-16 max-w-[960px]" style={{ gridTemplateColumns: "1fr 320px" }}>
          <div>
            <p className="font-sans font-normal text-[22px] leading-[1.3] text-ink m-0 mb-8 max-w-[30ch] border-l-2 border-ink pl-5 tracking-[-0.015em]">
              Projects deserve more from their data. We treat each engagement as
              an artifact: researched, built, and left better than we found it.
            </p>
            <p className="m-0 mb-4 text-[15.5px] leading-[1.55] text-ink max-w-[60ch]">
              Veridium is a two-person studio that works like a four-person team.
              Founded by Jeffrey Wang and Roman Bellisari in 2024, the studio sits
              where strategy meets engineering, the seam where most data
              initiatives quietly fail.
            </p>
            <p className="m-0 mb-4 text-[15.5px] leading-[1.55] text-ink-2 max-w-[60ch]">
              We embed with leadership teams, technical founders, and operators
              who already know the business and need a partner who can get into
              the schema, the pipeline, and the P&amp;L without losing sight of
              any of them. Most projects begin when the problem has outgrown the
              spreadsheet and hasn&apos;t yet earned the headcount.
            </p>

            <div className="mt-16">
              <Micro variant="ink" className="block mb-6">
                Partners
              </Micro>
              {PARTNERS.map((p) => (
                <div key={p.n} className="flex items-baseline gap-4 py-4 border-b border-dashed border-rule-2 last:border-b-0">
                  <span className="font-mono text-[10px] text-ink-3 tracking-[0.08em] w-5">
                    {p.n}
                  </span>
                  <div>
                    <div className="font-sans text-[16px] text-ink">{p.name}</div>
                    <div className="font-mono text-[10px] text-ink-3 tracking-[0.06em] mt-1">
                      {p.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-rule-2 p-[22px] bg-paper-2 flex flex-col gap-3.5 text-[12.5px] h-fit">
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

            <div className="mt-8">
              <Micro variant="ink" className="block mb-4">
                Capabilities
              </Micro>
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.idx}
                  className="flex justify-between py-2 border-b border-dashed border-rule-2 text-[12px] last:border-b-0"
                >
                  <span className="text-ink">{cap.name}</span>
                  <span className="font-mono text-[10px] text-ink-3">
                    {cap.idx}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </Shell>
  );
}
