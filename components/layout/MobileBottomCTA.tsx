"use client";

import Link from "next/link";

export function MobileBottomCTA() {
  return (
    <div
      className="hidden max-[768px]:flex fixed bottom-0 left-0 right-0 z-18 bg-paper border-t border-rule items-center justify-between gap-4"
      style={{
        padding: "12px var(--shell-px) calc(12px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-3">
        <span className="text-accent-ink">●</span> Available Q3 2026
      </span>
      <Link
        href="/#contact"
        className="inline-flex items-center gap-2 py-3 px-5 bg-ink font-mono text-[11px] tracking-[0.03em] rounded-full no-underline cta-btn min-h-[44px]"
        style={{ color: "var(--paper)" }}
      >
        Start a project
        <span style={{ color: "rgba(243,240,232,0.6)" }}>→</span>
      </Link>
    </div>
  );
}
