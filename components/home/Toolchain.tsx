import { Micro } from "@/components/typography/Micro";
import { ToolchainMarquee } from "@/components/motion/ToolchainMarquee";
import {
  ENGAGEMENT_PHASES,
  STUDIO_STRENGTHS,
} from "@/lib/content/engagement";

export function Toolchain() {
  return (
    <>
      {/* Marquee */}
      <section
        className="border-t border-rule"
        style={{ padding: "56px 0 104px" }}
      >
        <div
          className="grid gap-12 items-baseline pb-8"
          style={{ gridTemplateColumns: "140px 1fr auto" }}
        >
          <Micro variant="accent">§ 04 — Toolchain</Micro>
          <h3 className="m-0 font-sans font-normal text-[24px] text-ink tracking-[-0.015em]">
            Tools of the trade, catalogued.
          </h3>
          <Micro variant="mute">Fig. 04 — partial inventory</Micro>
        </div>
        <ToolchainMarquee />
      </section>

      {/* Engagement blueprint */}
      <section
        className="border-t border-rule"
        style={{ padding: "56px 0 120px" }}
      >
        <div
          className="grid gap-12 items-baseline pb-10"
          style={{ gridTemplateColumns: "140px 1fr auto" }}
        >
          <Micro variant="accent">§ 04.a — Engagement / blueprint</Micro>
          <h3 className="m-0 font-sans font-normal text-[24px] text-ink tracking-[-0.015em]">
            Anatomy of a typical project.
          </h3>
          <Micro variant="mute">Rev. C</Micro>
        </div>

        {/* Sheet */}
        <div
          className="relative border border-ink p-7 pt-8"
          style={{
            background: `
              linear-gradient(rgba(23,23,26,.055) 1px, transparent 1px) 0 0 / 100% 24px,
              linear-gradient(90deg, rgba(23,23,26,.055) 1px, transparent 1px) 0 0 / 24px 100%,
              var(--paper)
            `,
          }}
        >
          {/* Corner ticks */}
          {[
            "top-[-7px] left-[-7px]",
            "top-[-7px] right-[-7px]",
            "bottom-[-7px] left-[-7px]",
            "bottom-[-7px] right-[-7px]",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute w-3.5 h-3.5 border border-ink bg-paper z-2 ${pos}`}
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-0.5 bottom-0.5 w-px bg-ink -translate-x-1/2" />
              <span className="absolute top-1/2 left-0.5 right-0.5 h-px bg-ink -translate-y-1/2" />
            </div>
          ))}

          {/* Inner hairline */}
          <div
            className="absolute inset-2.5 border border-ink opacity-25 pointer-events-none"
            aria-hidden="true"
          />

          {/* Legend */}
          <div className="flex gap-7 flex-wrap pb-4 mb-5 border-b border-dashed border-rule-2 font-mono text-[10px] tracking-[0.08em] text-ink-3 relative z-1">
            <span className="inline-flex items-center gap-2">
              <span className="w-[22px] h-2.5 border border-ink bg-paper" />{" "}
              deliverable
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-[22px] h-2.5 border border-ink bg-ink" />{" "}
              active / hover
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-[22px] h-2.5 border border-accent-ink bg-paper relative">
                <span className="absolute inset-0.5 bg-accent-ink" />
              </span>{" "}
              client-facing
            </span>
            <span>
              phases: D=discovery · A=architecture · B=build · V=validate ·
              H=hand-off
            </span>
          </div>

          {/* Phase timeline bar */}
          <div className="flex items-stretch gap-0 mb-6 relative z-1 border border-rule-2 max-[1080px]:hidden">
            {ENGAGEMENT_PHASES.map((phase, i) => (
              <div
                key={phase.desig}
                className="flex-1 flex flex-col items-center justify-center py-2.5 font-mono text-center transition-colors duration-150 hover:bg-ink hover:text-paper group cursor-default"
                style={{
                  borderRight:
                    i < ENGAGEMENT_PHASES.length - 1
                      ? "1px solid var(--rule-2)"
                      : "none",
                  background: "var(--paper)",
                }}
              >
                <span className="text-[9px] tracking-[0.14em] uppercase text-ink-3 group-hover:text-paper/60">
                  {phase.duration}
                </span>
                <span className="text-[11px] tracking-[0.1em] uppercase text-ink group-hover:text-paper mt-0.5">
                  {phase.code}
                </span>
              </div>
            ))}
            {/* Progress arrow */}
            <div
              className="absolute top-1/2 -right-5 -translate-y-1/2 font-mono text-[10px] text-ink-3"
              aria-hidden="true"
            >
              →
            </div>
          </div>

          {/* Phase banks */}
          <div className="grid grid-cols-3 gap-y-5 gap-x-6 relative z-1 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
            {ENGAGEMENT_PHASES.map((phase) => (
              <div key={phase.desig}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase bg-ink text-paper px-2 py-1">
                    {phase.desig}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
                    {phase.name}
                  </span>
                  <span className="flex-1 h-px bg-ink opacity-35" />
                  <span className="font-mono text-[10px] text-ink-3 tracking-[0.1em]">
                    {String(phase.deliverables.length).padStart(2, "0")} items
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-px bg-rule-2 border border-rule-2">
                  {phase.deliverables.map((d) => (
                    <div
                      key={d.ref}
                      className="bg-paper grid grid-cols-[38px_1fr] items-center gap-2.5 font-sans text-[12.5px] text-ink tracking-[-0.005em] cursor-default transition-colors duration-150 hover:bg-ink hover:text-paper group"
                      style={{ padding: "9px 12px 8px" }}
                    >
                      <span className="font-mono text-[9.5px] tracking-[0.06em] bg-paper-2 py-0.5 text-center border border-rule-2 group-hover:bg-paper group-hover:text-ink group-hover:border-ink">
                        {d.ref}
                      </span>
                      <span>{d.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Strengths block in the 6th grid cell */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase bg-accent-ink text-paper px-2 py-1">
                  ★
                </span>
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
                  What we bring
                </span>
                <span className="flex-1 h-px bg-ink opacity-35" />
              </div>
              <div className="grid grid-cols-1 gap-px bg-rule-2 border border-rule-2">
                {STUDIO_STRENGTHS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-paper cursor-default transition-colors duration-150 hover:bg-ink hover:text-paper group"
                    style={{ padding: "9px 12px 8px" }}
                  >
                    <span className="font-sans text-[12.5px] text-ink tracking-[-0.005em] group-hover:text-paper block">
                      {s.label}
                    </span>
                    <span className="font-mono text-[10px] text-ink-3 tracking-[0.02em] leading-[1.5] group-hover:text-paper/60 block mt-1">
                      {s.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Title block */}
          <div className="mt-6 border border-ink grid grid-cols-[1fr_2fr_1fr_1fr] bg-paper font-mono text-[10px] tracking-[0.08em] uppercase relative z-1 max-[1080px]:grid-cols-2">
            {[
              ["Sheet", "04.a · Rev. C"],
              ["Title", "Engagement blueprint / delivery protocol"],
              ["Drawn", "VRD-001"],
              ["Status", "active"],
            ].map(([k, v], i, arr) => (
              <div
                key={k}
                className="flex flex-col gap-1 p-3.5"
                style={{
                  borderRight:
                    i < arr.length - 1
                      ? "1px solid var(--ink)"
                      : "none",
                }}
              >
                <span className="text-ink-3 text-[9px] tracking-[0.14em]">
                  {k}
                </span>
                <span
                  className="text-[11px] tracking-[0.08em] normal-case font-mono"
                  style={{
                    color:
                      k === "Status" ? "var(--accent-ink)" : "var(--ink)",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
