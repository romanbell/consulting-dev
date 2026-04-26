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

/* 002 BUILD: Circuit flow. Input node, three processing stages, output.
   On hover, signal pulses through the pipeline left to right. */
function SequencerGlyph({ active }: { active: boolean }) {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {/* Main bus line */}
      <line x1="4" y1="14" x2="68" y2="14"
        stroke={active ? "var(--accent-ink)" : "currentColor"}
        strokeWidth={active ? "1.2" : "0.8"}
        opacity={active ? 0.6 : 0.3}
        style={{ transition: "all 0.35s cubic-bezier(0.2,0.7,0.2,1)" }}
      />
      {/* Processing nodes along the bus */}
      {[10, 26, 42, 58].map((cx, i) => (
        <g key={i}>
          {/* Vertical tap line */}
          <line x1={cx} y1={active ? 5 : 8} x2={cx} y2={active ? 23 : 20}
            stroke={active ? "var(--accent-ink)" : "currentColor"}
            opacity={active ? 0.5 : 0.25}
            style={{ transition: `all 0.3s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.06}s` }}
          />
          {/* Node */}
          <circle cx={cx} cy="14" r={active ? 3.5 : 2.5}
            fill={active ? "var(--accent-ink)" : "none"}
            stroke={active ? "var(--accent-ink)" : "currentColor"}
            style={{ transition: `all 0.3s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.08}s` }}
          />
        </g>
      ))}
      {/* Input arrow */}
      <path d="M0 14 L4 14" stroke="currentColor" opacity="0.4" />
      {/* Output arrow */}
      <path d="M68 14 L72 11 M68 14 L72 17"
        stroke={active ? "var(--accent-ink)" : "currentColor"}
        fill="none"
        style={{ transition: "stroke 0.3s ease" }}
      />
    </svg>
  );
}

/* 003 MEASURE: Rolling oscilloscope waveform.
   Scrolls continuously on hover, eases the stroke change on leave. */
function LfoGlyph({ active }: { active: boolean }) {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" style={{ overflow: "hidden" }}>
      <line x1="0" y1="14" x2="72" y2="14" strokeDasharray="2 2" opacity=".3" />
      <g style={{
        animation: active ? "lfo-roll 1.4s linear infinite" : "none",
      }}>
        <path
          d="M-20 14 Q -10 3, 0 14 T 20 14 T 40 14 T 60 14 T 80 14 T 100 14 T 120 14"
          fill="none"
          stroke={active ? "var(--accent-ink)" : "currentColor"}
          strokeWidth={active ? "1.5" : "1"}
          style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
        />
      </g>
    </svg>
  );
}

/* 004 HAND-OFF: Rotary knob + arrow.
   Spins on hover, arrow extends. All transitions ease out on leave. */
function HandoffGlyph({ active }: { active: boolean }) {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <g style={{
        transformOrigin: "14px 14px",
        animation: active ? "rot 2s linear infinite" : "none",
      }}>
        <circle cx="14" cy="14" r="9"
          stroke={active ? "var(--accent-ink)" : "currentColor"}
          style={{ transition: "stroke 0.4s ease" }}
        />
        <line x1="14" y1="14" x2="14" y2="6"
          stroke={active ? "var(--accent-ink)" : "currentColor"}
          strokeWidth={active ? "1.5" : "1"}
          style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
        />
        <circle cx="14" cy="14" r="1.5"
          fill={active ? "var(--accent)" : "currentColor"}
          style={{ transition: "fill 0.4s ease" }}
        />
        {[{ x: 5, y: 14 }, { x: 23, y: 14 }, { x: 14, y: 5 }, { x: 14, y: 23 }].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1" fill="currentColor"
            opacity={active ? 0.8 : 0.4}
            style={{ transition: "opacity 0.4s ease" }}
          />
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
    <section
      id="method"
      className="grid gap-12"
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
            <MethodCell key={step.n} step={step} isLast={(i + 1) % 4 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodCell({ step, isLast }: { step: typeof METHOD_STEPS[number]; isLast: boolean }) {
  const [hovered, setHovered] = React.useState(false);
  const Glyph = GLYPH_COMPONENTS[step.glyphId];

  return (
    <div
      className="border-r border-b border-rule p-5 pb-[110px] relative min-h-[240px] transition-colors duration-250 hover:bg-paper-2"
      style={{ borderRightWidth: isLast ? 0 : undefined }}
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
