"use client";

import React from "react";
import { Micro } from "@/components/typography/Micro";
import { Headline } from "@/components/typography/Headline";
import { METHOD_STEPS } from "@/lib/content/method";

/* 001 FRAME: Modular nodes connected by signal lines.
   On hover, nodes fill solid accent and scale. No inner circles. */
function PatchbayGlyph({ active }: { active: boolean }) {
  const nodes = [
    { x: 6, y: 8 },
    { x: 22, y: 20 },
    { x: 38, y: 8 },
    { x: 54, y: 16 },
    { x: 66, y: 10 },
  ];
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {nodes.map((n, i) => {
        const next = nodes[i + 1];
        if (!next) return null;
        return (
          <line key={`l${i}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y}
            stroke={active ? "var(--accent-ink)" : "currentColor"}
            strokeWidth={active ? "1.2" : "0.8"}
            opacity={active ? 0.8 : 0.4}
            style={{ transition: "all 0.35s cubic-bezier(0.2,0.7,0.2,1)" }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <rect
          key={`n${i}`}
          x={n.x - 3} y={n.y - 3} width={6} height={6}
          fill={active ? "var(--accent-ink)" : "none"}
          stroke={active ? "var(--accent-ink)" : "currentColor"}
          opacity={active ? 1 : 0.6}
          style={{
            transition: `all 0.3s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.06}s`,
            transform: active ? "scale(1.15)" : "scale(1)",
            transformOrigin: `${n.x}px ${n.y}px`,
          }}
        />
      ))}
    </svg>
  );
}

/* 002 BUILD: Scattered blocks that lock into a tight grid on hover. */
function SequencerGlyph({ active }: { active: boolean }) {
  const blocks = [
    { rx: 0,  ry: 0,  ax: 2,  ay: 1,  w: 13, h: 6 },
    { rx: 3,  ry: 12, ax: 2,  ay: 9,  w: 13, h: 6 },
    { rx: 1,  ry: 23, ax: 2,  ay: 17, w: 13, h: 6 },
    { rx: 22, ry: 3,  ax: 19, ay: 1,  w: 13, h: 10 },
    { rx: 20, ry: 18, ax: 19, ay: 14, w: 13, h: 10 },
    { rx: 40, ry: 1,  ax: 36, ay: 1,  w: 13, h: 6 },
    { rx: 42, ry: 11, ax: 36, ay: 9,  w: 13, h: 6 },
    { rx: 39, ry: 22, ax: 36, ay: 17, w: 13, h: 6 },
    { rx: 57, ry: 5,  ax: 53, ay: 1,  w: 13, h: 22 },
  ];
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={active ? b.ax : b.rx}
          y={active ? b.ay : b.ry}
          width={b.w}
          height={b.h}
          fill={active && i % 3 === 0 ? "var(--accent-ink)" : "none"}
          stroke={active ? "var(--accent-ink)" : "currentColor"}
          opacity={active ? 1 : 0.45}
          style={{
            transition: `all 0.35s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.03}s`,
          }}
        />
      ))}
    </svg>
  );
}

/* 003 MEASURE: Static waveform at rest. On hover, it starts rolling and turns accent. */
function LfoGlyph({ active }: { active: boolean }) {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" style={{ overflow: "hidden" }}>
      <line x1="0" y1="14" x2="72" y2="14" strokeDasharray="2 2" opacity=".3" />
      <path
        d="M-6 14 Q 4 4, 14 14 T 34 14 T 54 14 T 74 14"
        fill="none" stroke="currentColor" strokeWidth="1"
        opacity={active ? 0 : 0.5}
        style={{ transition: "opacity 0.4s ease" }}
      />
      <g style={{
        animation: active ? "lfo-roll 1.4s linear infinite" : "none",
      }}>
        <path
          d="M-20 14 Q -10 3, 0 14 T 20 14 T 40 14 T 60 14 T 80 14 T 100 14 T 120 14"
          fill="none"
          stroke="var(--accent-ink)"
          strokeWidth="1.5"
          opacity={active ? 0.9 : 0}
          style={{ transition: "opacity 0.4s ease" }}
        />
      </g>
    </svg>
  );
}

/* 004 HAND-OFF: Static knob at rest. On hover, spins and turns accent. */
function HandoffGlyph({ active }: { active: boolean }) {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <g opacity={active ? 0 : 1} style={{ transition: "opacity 0.4s ease" }}>
        <circle cx="14" cy="14" r="9" opacity="0.5" />
        <line x1="14" y1="14" x2="14" y2="6" opacity="0.5" />
        <circle cx="14" cy="14" r="1.2" fill="currentColor" opacity="0.5" />
        {[{ x: 5, y: 14 }, { x: 23, y: 14 }, { x: 14, y: 5 }, { x: 14, y: 23 }].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="0.8" fill="currentColor" opacity="0.3" />
        ))}
      </g>
      <g style={{
        transformOrigin: "14px 14px",
        animation: active ? "rot 2s linear infinite" : "none",
      }}
        opacity={active ? 1 : 0}
      >
        <circle cx="14" cy="14" r="9" stroke="var(--accent-ink)"
          style={{ transition: "opacity 0.4s ease" }} />
        <line x1="14" y1="14" x2="14" y2="6" stroke="var(--accent-ink)" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="1.5" fill="var(--accent)" />
        {[{ x: 5, y: 14 }, { x: 23, y: 14 }, { x: 14, y: 5 }, { x: 14, y: 23 }].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1" fill="var(--accent)" opacity="0.7" />
        ))}
      </g>
      <line x1="28" y1="14" x2={active ? "62" : "56"} y2="14"
        stroke={active ? "var(--accent-ink)" : "currentColor"}
        style={{ transition: "all 0.4s cubic-bezier(0.2,0.7,0.2,1)" }}
      />
      <path d={active ? "M56 9 L64 14 L56 19" : "M50 9 L58 14 L50 19"}
        fill="none"
        stroke={active ? "var(--accent-ink)" : "currentColor"}
        style={{ transition: "all 0.4s cubic-bezier(0.2,0.7,0.2,1)" }}
      />
    </svg>
  );
}

const GLYPH_COMPONENTS = {
  patchbay: PatchbayGlyph,
  sequencer: SequencerGlyph,
  lfo: LfoGlyph,
  handoff: HandoffGlyph,
} as const;

export function Method() {
  return (
    <section id="method">
      {/* ===== DESKTOP ===== */}
      <div
        className="hidden min-[769px]:grid gap-12"
        style={{ gridTemplateColumns: "140px 1fr", padding: "104px 0" }}
      >
        <div>
          <Micro variant="accent">§ 03 — Method</Micro>
        </div>
        <div>
          <Headline className="mb-12">
            Four movements, from <span className="text-accent-ink">question</span>{" "}
            to system.
          </Headline>
          <div className="grid grid-cols-4 gap-0 border-t border-ink max-[1080px]:grid-cols-2">
            {METHOD_STEPS.map((step, i) => (
              <DesktopMethodCell key={step.n} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      {/* Compact vertical stack. Number, title, one-line body. No glyphs. */}
      <div className="min-[769px]:hidden py-10">
        <Micro variant="accent" className="block mb-5">
          How we work
        </Micro>
        <h3 className="font-sans font-normal text-[22px] leading-[1.15] tracking-[-0.02em] text-ink m-0 mb-6">
          Four movements, from{" "}
          <span className="text-accent-ink">question</span> to system.
        </h3>

        <div className="flex flex-col gap-0 border-t border-ink">
          {METHOD_STEPS.map((step) => (
            <div
              key={step.n}
              className="py-4 border-b border-rule"
            >
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="font-mono text-[10px] text-ink-3 tracking-[0.12em] shrink-0">
                  {step.n}
                </span>
                <span className="font-sans font-medium text-[16px] tracking-[-0.01em] text-ink">
                  {step.title}
                </span>
              </div>
              <p className="m-0 text-ink-2 text-[14px] leading-[1.5] pl-[30px]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopMethodCell({ step, index }: { step: typeof METHOD_STEPS[number]; index: number }) {
  const [hovered, setHovered] = React.useState(false);
  const Glyph = GLYPH_COMPONENTS[step.glyphId];
  const isLastCol = (index + 1) % 4 === 0;

  return (
    <div
      className="border-r border-b border-rule p-5 pb-[110px] relative min-h-[240px] transition-colors duration-250 hover:bg-paper-2"
      style={{ borderRightWidth: isLastCol ? 0 : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="font-mono text-[10px] text-ink-3 tracking-[0.12em]">
        {step.n} / {step.code}
      </div>
      <h3 className="font-sans font-medium text-[17px] tracking-[-0.01em] my-2 mx-0">
        {step.title}
      </h3>
      <p className="m-0 text-ink-2 text-[13px] leading-[1.5]">
        {step.body}
      </p>
      <div className="absolute bottom-[22px] left-5 text-ink" aria-hidden="true">
        <Glyph active={hovered} />
      </div>
    </div>
  );
}
