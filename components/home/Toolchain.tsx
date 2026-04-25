import { Micro } from "@/components/typography/Micro";
import { TOOLS, TOOL_CATEGORIES } from "@/lib/content/tools";
import { ToolchainChips } from "./ToolchainChips";

export function Toolchain() {
  const grouped = TOOL_CATEGORIES.map((cat) => ({
    ...cat,
    items: TOOLS.filter((t) => t.category === cat.id),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* Chip cloud */}
      <section className="border-t border-rule" style={{ padding: "56px 0 104px" }}>
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
        <ToolchainChips />
      </section>

      {/* Datasheet */}
      <section className="border-t border-rule" style={{ padding: "56px 0 120px" }}>
        <div
          className="grid gap-12 items-baseline pb-10"
          style={{ gridTemplateColumns: "140px 1fr auto" }}
        >
          <Micro variant="accent">§ 04.a — Toolchain / datasheet</Micro>
          <h3 className="m-0 font-sans font-normal text-[24px] text-ink tracking-[-0.015em]">
            Tools of the trade, as a datasheet.
          </h3>
          <Micro variant="mute">Rev. B</Micro>
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
          {["top-[-7px] left-[-7px]", "top-[-7px] right-[-7px]", "bottom-[-7px] left-[-7px]", "bottom-[-7px] right-[-7px]"].map((pos, i) => (
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
          <div className="absolute inset-2.5 border border-ink opacity-25 pointer-events-none" aria-hidden="true" />

          {/* Legend */}
          <div className="flex gap-7 flex-wrap pb-4.5 mb-5.5 border-b border-dashed border-rule-2 font-mono text-[10px] tracking-[0.08em] text-ink-3 relative z-1">
            <span className="inline-flex items-center gap-2">
              <span className="w-[22px] h-2.5 border border-ink bg-paper" /> component
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-[22px] h-2.5 border border-ink bg-ink" /> active / hover
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-[22px] h-2.5 border border-accent-ink bg-paper relative">
                <span className="absolute inset-0.5 bg-accent-ink" />
              </span>{" "}
              foundation model
            </span>
            <span>designators: U=models · I=infra · D=data · M=ml · A=app · O=obs</span>
          </div>

          {/* Banks */}
          <div className="grid grid-cols-3 gap-y-4.5 gap-x-6 relative z-1 max-[1080px]:grid-cols-2">
            {grouped.map((g) => (
              <div key={g.id}>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase bg-ink text-paper px-2 py-1">
                    {g.desig}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
                    {g.label}
                  </span>
                  <span className="flex-1 h-px bg-ink opacity-35" />
                  <span className="font-mono text-[10px] text-ink-3 tracking-[0.1em]">
                    {String(g.items.length).padStart(2, "0")} pcs
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-px bg-rule-2 border border-rule-2">
                  {g.items.map((tool, j) => {
                    const ref = `${g.desig}${String(j + 1).padStart(2, "0")}`;
                    return (
                      <div
                        key={tool.name}
                        className="bg-paper grid grid-cols-[38px_1fr] items-center gap-2.5 font-sans text-[12.5px] text-ink tracking-[-0.005em] cursor-default transition-colors duration-150 hover:bg-ink hover:text-paper group"
                        style={{ padding: "10px 12px 9px" }}
                      >
                        <span
                          className="font-mono text-[9.5px] tracking-[0.06em] bg-paper-2 py-0.5 text-center border border-rule-2 group-hover:bg-paper group-hover:text-ink group-hover:border-ink"
                          style={{
                            color: g.id === "model" ? "var(--accent-ink)" : undefined,
                            borderColor: g.id === "model" ? "currentColor" : undefined,
                          }}
                        >
                          {ref}
                        </span>
                        <span>{tool.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Title block */}
          <div className="mt-5.5 border border-ink grid grid-cols-[1fr_2fr_1fr_1fr] bg-paper font-mono text-[10px] tracking-[0.08em] uppercase relative z-1">
            {[
              ["Sheet", "04 · Rev. B"],
              ["Title", "Studio toolchain / bill of materials"],
              ["Drawn", "VRD-001"],
              ["Status", "released"],
            ].map(([k, v], i, arr) => (
              <div
                key={k}
                className="flex flex-col gap-1 p-3.5"
                style={{
                  borderRight: i < arr.length - 1 ? "1px solid var(--ink)" : "none",
                }}
              >
                <span className="text-ink-3 text-[9px] tracking-[0.14em]">{k}</span>
                <span
                  className="text-[11px] tracking-[0.08em] normal-case font-mono"
                  style={{
                    color: k === "Status" ? "var(--accent-ink)" : "var(--ink)",
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
