import { ENGAGEMENT_PHASES, STUDIO_STRENGTHS } from "@/lib/content/engagement";

const PHASE_NAMES: Record<string, string> = {
  D: "Discovery",
  A: "Architecture",
  B: "Build",
  V: "Validate",
  H: "Hand-off",
};

export function Toolchain() {
  return (
    <section
      id="engagement"
      className="border-t border-rule max-[768px]:hidden"
      style={{ padding: "72px 0 120px" }}
    >
      <div
        className="grid gap-12 items-baseline pb-10"
        style={{ gridTemplateColumns: "180px 1fr auto" }}
      >
        <div>
          <span className="font-mono text-[11px] tracking-[0.06em] text-ink-3">
            How a project runs
          </span>
        </div>
        <h3 className="m-0 font-sans font-normal text-[28px] text-ink tracking-[-0.02em] max-w-[34ch] leading-[1.15]">
          Anatomy of a typical project.
        </h3>
        <span className="font-mono text-[10px] tracking-[0.06em] text-ink-3">
          Rev. C
        </span>
      </div>

      {/* Schematic sheet */}
      <div
        className="relative border border-ink p-7 pt-8"
        style={{
          background: `
            linear-gradient(rgba(23,23,26,.05) 1px, transparent 1px) 0 0 / 100% 24px,
            linear-gradient(90deg, rgba(23,23,26,.05) 1px, transparent 1px) 0 0 / 24px 100%,
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

        {/* Phase timeline bar — full names, no cryptic letters */}
        <div className="flex items-stretch gap-0 mb-7 relative z-1 border border-rule-2 max-[1080px]:hidden">
          {ENGAGEMENT_PHASES.map((phase, i) => {
            const phaseName = PHASE_NAMES[phase.desig] ?? phase.name;
            return (
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
                <span className="text-[11px] tracking-[0.08em] text-ink group-hover:text-paper mt-0.5">
                  {String(i + 1).padStart(2, "0")} · {phaseName}
                </span>
              </div>
            );
          })}
          <div
            className="absolute top-1/2 -right-5 -translate-y-1/2 font-mono text-[10px] text-ink-3"
            aria-hidden="true"
          >
            →
          </div>
        </div>

        {/* Phase banks */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-6 relative z-1 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {ENGAGEMENT_PHASES.map((phase, i) => {
            const phaseName = PHASE_NAMES[phase.desig] ?? phase.name;
            return (
              <div key={phase.desig}>
                <div className="flex items-baseline gap-2.5 mb-3">
                  <span className="font-mono text-[10px] tabular-nums tracking-[0.06em] text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[14px] font-medium tracking-[-0.005em] text-ink">
                    {phaseName}
                  </span>
                  <span className="flex-1 h-px bg-ink opacity-25" />
                  <span className="font-mono text-[10px] text-ink-3">
                    {phase.duration}
                  </span>
                </div>
                <ul className="list-none m-0 p-0 flex flex-col gap-px bg-rule-2 border border-rule-2">
                  {phase.deliverables.map((d) => (
                    <li
                      key={d.ref}
                      className="bg-paper font-sans text-[13px] text-ink tracking-[-0.005em] leading-[1.4] cursor-default transition-colors duration-150 hover:bg-ink hover:text-paper"
                      style={{ padding: "9px 12px 8px" }}
                    >
                      {d.item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div>
            <div className="flex items-baseline gap-2.5 mb-3">
              <span className="font-mono text-[10px] tracking-[0.06em] text-accent-ink">
                ★
              </span>
              <span className="font-sans text-[14px] font-medium tracking-[-0.005em] text-ink">
                What we bring
              </span>
              <span className="flex-1 h-px bg-ink opacity-25" />
            </div>
            <ul className="list-none m-0 p-0 flex flex-col gap-px bg-rule-2 border border-rule-2">
              {STUDIO_STRENGTHS.map((s) => (
                <li
                  key={s.label}
                  className="bg-paper cursor-default transition-colors duration-150 hover:bg-ink hover:text-paper group"
                  style={{ padding: "9px 12px 8px" }}
                >
                  <span className="font-sans text-[13px] text-ink tracking-[-0.005em] group-hover:text-paper block">
                    {s.label}
                  </span>
                  <span className="font-mono text-[10px] text-ink-3 tracking-[0.02em] leading-[1.5] group-hover:text-paper/60 block mt-1">
                    {s.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
