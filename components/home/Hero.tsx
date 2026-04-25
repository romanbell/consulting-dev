import { Callsign } from "@/components/typography/Callsign";
import { Lede } from "@/components/typography/Lede";
import { CTA } from "@/components/ui/CTA";
import { Micro } from "@/components/typography/Micro";
import { CAPABILITIES } from "@/lib/content/capabilities";
import { PARTNERS } from "@/lib/content/partners";
import { HeroTerminal } from "@/components/motion/HeroTerminal";

export function Hero() {
  return (
    <section
      id="top"
      className="grid gap-16 relative min-h-[calc(100vh-56px)] border-b border-rule"
      style={{
        gridTemplateColumns: "1fr 320px",
        padding: "96px 0 160px",
      }}
    >
      {/* Main: Callsign + lede + CTAs */}
      <div className="relative z-1">
        <Callsign />
        <Lede className="mt-9">
          We partner with companies to design, build, and ship the systems that
          move their business forward. Strategy-first. Technology-led. Taken on
          as a second team, or the first one that was missing.
        </Lede>
        <div className="flex gap-4 mt-11 items-center flex-wrap">
          <CTA href="/#manifest" variant="primary">
            view_selected_work
          </CTA>
          <CTA href="/#contact">start_a_project</CTA>
        </div>
      </div>

      {/* Side column */}
      <div className="flex flex-col gap-8 pt-1.5 relative z-1 max-[1080px]:col-span-full">
        {/* Capabilities */}
        <div>
          <Micro className="mb-3.5 block">Capabilities — Fig. 01</Micro>
          <ul className="list-none m-0 p-0 flex flex-col">
            {CAPABILITIES.map((cap) => (
              <li
                key={cap.idx}
                className="flex justify-between items-baseline py-2.5 border-b border-dashed border-rule-2 text-[13px] text-ink last:border-b-0 relative transition-[padding] duration-250 hover:pl-3"
                style={{ transitionTimingFunction: "var(--ease-studio)" }}
              >
                <span>{cap.name}</span>
                <span className="font-mono text-[10px] text-ink-3">
                  {cap.idx}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Partners */}
        <div>
          <Micro className="mb-3.5 block">Partners — Fig. 02</Micro>
          <div className="flex flex-col gap-3.5 mt-3.5">
            {PARTNERS.map((p) => (
              <div
                key={p.n}
                className="flex items-baseline gap-2.5 text-[13.5px] text-ink py-1"
              >
                <span className="font-mono text-[10px] text-ink-3 tracking-[0.08em] shrink-0 w-5">
                  {p.n}
                </span>
                <div>
                  {p.name}
                  <small className="block text-ink-3 font-mono text-[10px] tracking-[0.06em] mt-0.5">
                    {p.role}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio log terminal */}
        <div className="-mr-7">
          <Micro className="mb-3.5 block">Studio log — Fig. 03</Micro>
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
