"use client";

import { useState } from "react";
import { TOOLS, TOOL_FILTERS } from "@/lib/content/tools";

export function ToolchainChips() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <div className="flex gap-1.5 flex-wrap pb-4.5" style={{ paddingLeft: 188 }}>
        {TOOL_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="font-mono text-[10px] tracking-[0.12em] uppercase py-1.5 px-3 border rounded-full cursor-pointer transition-all duration-200"
            style={{
              background: filter === f.key ? "var(--ink)" : "transparent",
              color: filter === f.key ? "var(--paper)" : "var(--ink-2)",
              borderColor: filter === f.key ? "var(--ink)" : "var(--rule-2)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5" style={{ paddingLeft: 188 }}>
        {TOOLS.map((tool) => (
          <span
            key={tool.name}
            className="font-mono text-[11px] py-1.5 px-[11px] border border-rule-2 rounded-full inline-flex items-center gap-1.5 cursor-default transition-all duration-200 hover:border-ink hover:text-ink"
            style={{
              color: "var(--ink-2)",
              letterSpacing: "0.02em",
              opacity: filter === "all" || filter === tool.category ? 1 : 0.28,
            }}
            data-cat={tool.category}
          >
            <span
              className="w-1 h-1 rounded-full inline-block"
              style={{
                background:
                  tool.category === "ai"
                    ? "var(--accent)"
                    : "var(--ink-3)",
              }}
              aria-hidden="true"
            />
            {tool.name}
          </span>
        ))}
      </div>
    </>
  );
}
