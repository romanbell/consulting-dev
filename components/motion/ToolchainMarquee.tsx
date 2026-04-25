"use client";

import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { TOOLS } from "@/lib/content/tools";

export function ToolchainMarquee() {
  const reduced = useReducedMotion();

  // Split tools into 3 rows
  const rows: typeof TOOLS[] = [[], [], []];
  TOOLS.forEach((t, i) => {
    rows[i % 3]?.push(t);
  });

  if (reduced) {
    // Static grid fallback
    return (
      <div className="flex flex-wrap gap-1.5" style={{ paddingLeft: 188 }}>
        {TOOLS.map((tool) => (
          <span
            key={tool.name}
            className="font-mono text-[12px] py-[7px] px-3.5 border border-rule-2 rounded-full inline-flex items-center gap-2 text-ink-2 tracking-[0.02em] whitespace-nowrap"
          >
            <span
              className="w-[5px] h-[5px] rounded-full inline-block"
              style={{
                background:
                  tool.category === "model"
                    ? "var(--accent)"
                    : "var(--ink-3)",
              }}
              aria-hidden="true"
            />
            {tool.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative border-t border-b border-rule overflow-hidden group"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
      }}
    >
      {rows.map((row, rowIdx) => {
        const direction = rowIdx === 1 ? "marquee-r" : "marquee-l";
        const duration = [80, 95, 65][rowIdx];
        const chips = row.map((tool) => (
          <span
            key={tool.name}
            className="font-mono text-[12px] py-[7px] px-3.5 border border-rule-2 rounded-full inline-flex items-center gap-2 text-ink-2 tracking-[0.02em] whitespace-nowrap shrink-0 mr-2 cursor-default transition-all duration-250 hover:border-ink hover:text-ink hover:bg-paper hover:-translate-y-0.5"
            style={{
              transitionTimingFunction: "var(--ease-studio)",
              borderColor: tool.category === "model" ? "var(--accent-ink)" : undefined,
              color: tool.category === "model" ? "var(--accent-ink)" : undefined,
            }}
            data-cat={tool.category}
          >
            <span
              className="w-[5px] h-[5px] rounded-full inline-block transition-all duration-200"
              style={{
                background:
                  tool.category === "model"
                    ? "var(--accent)"
                    : "var(--ink-3)",
              }}
              aria-hidden="true"
            />
            {tool.name}
          </span>
        ));

        return (
          <div
            key={rowIdx}
            className="flex w-max py-4.5 will-change-transform group-hover:[animation-play-state:paused]"
            style={{
              animation: `${direction} ${duration}s linear infinite`,
              borderBottom:
                rowIdx < 2 ? "1px dashed var(--rule-2)" : "none",
            }}
          >
            {/* Duplicate for seamless loop */}
            {chips}
            {chips}
          </div>
        );
      })}
      {/* SSR-safe: hidden static list for crawlers */}
      <noscript>
        <div className="flex flex-wrap gap-1.5 p-4">
          {TOOLS.map((tool) => (
            <span key={tool.name} className="font-mono text-[11px] text-ink-2">
              {tool.name}
            </span>
          ))}
        </div>
      </noscript>
    </div>
  );
}
