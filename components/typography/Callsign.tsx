export function Callsign() {
  return (
    <div className="font-mono text-ink m-0 mb-2 max-w-[720px] relative" aria-hidden="true">
      {/* Head row */}
      <div className="grid items-center gap-3.5 py-1 grid-cols-[14px_auto_1fr_auto] text-[10px] tracking-[0.14em] uppercase text-ink-3 pb-2.5">
        <span className="text-ink font-mono text-[12px] leading-none">┗</span>
        <span className="text-ink tracking-[0.18em]">VRD–001</span>
        <span
          className="h-px opacity-55"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--ink) 0 4px, transparent 4px 8px)",
          }}
        />
        <span className="text-ink-2 text-[10.5px]">40.71°N · 74.00°W</span>
      </div>

      {/* Word rows */}
      {[
        { n: "01", word: "STRATEGY", accent: false },
        { n: "02", word: "INVENTION", accent: false },
        { n: "03", word: "OUTCOMES", accent: true },
      ].map((row, i) => (
        <div
          key={row.n}
          className="grid items-center gap-6 grid-cols-[56px_1fr] py-2.5 relative border-t"
          style={{
            borderColor: i === 0 ? "var(--ink)" : "var(--rule-2)",
            borderBottomWidth: i === 2 ? "1px" : "0",
            borderBottomColor: "var(--ink)",
            borderBottomStyle: "solid",
          }}
        >
          <span className="font-mono text-[11px] tracking-[0.1em] text-ink-3 text-right pr-2 border-r border-rule self-stretch flex items-center justify-end">
            {row.n}
          </span>
          <span
            className="font-sans font-normal leading-[0.98] text-ink text-balance"
            style={{
              fontSize: "clamp(44px, 6.4vw, 98px)",
              letterSpacing: "-0.04em",
            }}
          >
            {row.accent ? (
              <em className="not-italic text-accent-ink font-normal">
                {row.word}
              </em>
            ) : (
              row.word
            )}
          </span>
        </div>
      ))}

      {/* Foot row */}
      <div className="grid items-center gap-3.5 py-1 grid-cols-[14px_auto_1fr_auto] text-[10px] tracking-[0.14em] uppercase text-ink-3 pt-3">
        <span className="text-ink font-mono text-[12px] leading-none">┏</span>
        <span className="text-ink-3">studio — est. 2024 · ny</span>
        <span
          className="h-px opacity-55"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--ink) 0 4px, transparent 4px 8px)",
          }}
        />
        <span className="text-ink-3 inline-flex items-center gap-2">
          <span
            className="w-[7px] h-[7px] rounded-full inline-block"
            style={{
              background: "var(--accent-ink)",
              animation: "csblink 1.4s steps(2,end) infinite",
            }}
          />
          studio open
        </span>
      </div>
    </div>
  );
}
