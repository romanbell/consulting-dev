"use client";

import { useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { TOOLS, TOOL_FILTERS } from "@/lib/content/tools";

export function ToolchainMarquee() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState("all");

  // Split into 3 rows
  const rows: typeof TOOLS[] = [[], [], []];
  TOOLS.forEach((t, i) => {
    rows[i % 3]?.push(t);
  });

  function chipStyle(cat: string) {
    const isMatch = filter === "all" || filter === cat;
    const isAi = cat === "ai";
    return {
      transitionTimingFunction: "var(--ease-studio)",
      borderColor: isAi && isMatch ? "var(--accent-ink)" : isMatch ? undefined : "var(--rule-2)",
      color: isAi && isMatch ? "var(--accent-ink)" : isMatch ? undefined : undefined,
      opacity: isMatch ? 1 : 0.2,
      cursor: "default" as const,
    };
  }

  function dotBg(cat: string) {
    const isMatch = filter === "all" || filter === cat;
    if (cat === "ai" && isMatch) return "var(--accent)";
    if (isMatch) return "var(--ink-3)";
    return "var(--rule-2)";
  }

  return (
    <>
      {/* Filter buttons */}
      <div className="flex gap-1.5 flex-wrap pb-5" style={{ paddingLeft: 188 }}>
        {TOOL_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="font-mono text-[10px] tracking-[0.12em] uppercase py-1.5 px-3 border rounded-full transition-all duration-250"
            style={{
              transitionTimingFunction: "var(--ease-studio)",
              background: filter === f.key ? "var(--ink)" : "transparent",
              color: filter === f.key ? "var(--paper)" : "var(--ink-2)",
              borderColor: filter === f.key ? "var(--ink)" : "var(--rule-2)",
              cursor: "default",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {reduced ? (
        <div className="flex flex-wrap gap-1.5" style={{ paddingLeft: 188 }}>
          {TOOLS.map((tool) => (
            <span
              key={tool.name}
              className="font-mono text-[12px] py-[7px] px-3.5 border border-rule-2 rounded-full inline-flex items-center gap-2 text-ink-2 tracking-[0.02em] whitespace-nowrap transition-opacity duration-250"
              style={{ opacity: filter === "all" || filter === tool.category ? 1 : 0.2 }}
            >
              <span
                className="w-[5px] h-[5px] rounded-full inline-block"
                style={{ background: dotBg(tool.category) }}
                aria-hidden="true"
              />
              {tool.name}
            </span>
          ))}
        </div>
      ) : (
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
            if (row.length === 0) return null;
            const direction = rowIdx === 1 ? "marquee-r" : "marquee-l";
            // 20% slower: 96, 114, 78 (was 80, 95, 65)
            const duration = [96, 114, 78][rowIdx];
            const chips = row.map((tool) => (
              <span
                key={tool.name}
                className="font-mono text-[12px] py-[7px] px-3.5 border border-rule-2 rounded-full inline-flex items-center gap-2 text-ink-2 tracking-[0.02em] whitespace-nowrap shrink-0 mr-2 transition-all duration-250 hover:border-ink hover:text-ink hover:bg-paper hover:-translate-y-0.5"
                style={chipStyle(tool.category)}
                data-cat={tool.category}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full inline-block transition-all duration-200"
                  style={{ background: dotBg(tool.category) }}
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
                  borderBottom: rowIdx < 2 ? "1px dashed var(--rule-2)" : "none",
                }}
              >
                {chips}
                {chips}
              </div>
            );
          })}
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
      )}
    </>
  );
}
