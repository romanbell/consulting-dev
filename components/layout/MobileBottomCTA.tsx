"use client";

export function MobileBottomCTA() {
  return (
    <div
      className="hidden max-[768px]:flex fixed bottom-0 left-0 right-0 z-18 bg-paper border-t border-rule items-center justify-between gap-4"
      style={{
        padding: "10px var(--shell-px) calc(10px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-3">
        <span className="text-accent-ink">●</span> Available Q3 2026
      </span>
      <span className="font-mono text-[10px] tracking-[0.06em] text-ink-3">
        &copy; Veridium Solutions
      </span>
    </div>
  );
}
