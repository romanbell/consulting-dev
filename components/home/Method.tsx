"use client";

import { Micro } from "@/components/typography/Micro";
import { Headline } from "@/components/typography/Headline";
import { METHOD_STEPS } from "@/lib/content/method";

function PatchbayGlyph({ active }: { active: boolean }) {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {/* Patch jacks */}
      <circle cx="8" cy="14" r="3" />
      <circle cx="26" cy="14" r="3" />
      <circle cx="44" cy="14" r="3" />
      {/* Cable 1: undulates on hover */}
      <path
        d="M11.5 14 C 17 5, 22 5, 26 14"
        fill="none"
        stroke={active ? "var(--accent-ink)" : "currentColor"}
        style={{ animation: active ? "cable-wave 1.6s ease-in-out infinite" : "none" }}
      />
      {/* Cable 2: undulates opposite phase */}
      <path
        d="M29.5 14 C 35 23, 40 23, 44 14"
        fill="none"
        stroke={active ? "var(--accent-ink)" : "currentColor"}
        style={{ animation: active ? "cable-wave-2 1.6s ease-in-out infinite" : "none" }}
      />
      {/* Signal LED */}
      <circle cx="56" cy="14" r="2" fill={active ? "var(--accent)" : "currentColor"} stroke="none"
        style={{ animation: "blinkSig 1.4s ease-in-out infinite" }} />
    </svg>
  );
}

function SequencerGlyph({ active }: { active: boolean }) {
  const heights = active ? [12, 18, 6, 16, 10, 20, 4, 14] : [8, 16, 4, 12, 6, 18, 4, 8];
  const ys = heights.map(h => 14 - h / 2);
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={3 + i * 8.5}
          y={ys[i]}
          width="6"
          height={h}
          fill={active && (i === 1 || i === 3 || i === 5) ? "var(--accent-ink)" : (i % 2 === 1 ? "currentColor" : "none")}
          style={{
            transition: `height 0.35s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.04}s, y 0.35s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.04}s, fill 0.2s ease`,
          }}
        />
      ))}
      {/* Playhead */}
      <line x1={active ? "68" : "3"} y1="2" x2={active ? "68" : "3"} y2="26" stroke="var(--accent-ink)" strokeWidth="1.5" opacity={active ? 0.8 : 0}
        style={{ transition: "x1 0.8s cubic-bezier(0.2,0.7,0.2,1), x2 0.8s cubic-bezier(0.2,0.7,0.2,1), opacity 0.2s ease" }} />
    </svg>
  );
}

function LfoGlyph({ active }: { active: boolean }) {
  // Rolling oscilloscope: a wide waveform that scrolls left continuously
  // The SVG clips to the visible area while the path translates
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" style={{ overflow: "hidden" }}>
      {/* Center line */}
      <line x1="0" y1="14" x2="72" y2="14" strokeDasharray="2 2" opacity=".3" />
      {/* Waveform group: wider than viewport, scrolls left on hover */}
      <g style={{
        animation: active ? "lfo-roll 1.4s linear infinite" : "none",
        transition: "stroke 0.2s ease",
      }}>
        <path
          d="M-20 14 Q -10 3, 0 14 T 20 14 T 40 14 T 60 14 T 80 14 T 100 14 T 120 14"
          fill="none"
          stroke={active ? "var(--accent-ink)" : "currentColor"}
          strokeWidth={active ? "1.5" : "1"}
        />
      </g>
    </svg>
  );
}

function HandoffGlyph({ active }: { active: boolean }) {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {/* Rotary knob */}
      <g style={{
        transformOrigin: "14px 14px",
        animation: active ? "rot 2s linear infinite" : "none",
        transition: "transform 0.3s ease",
      }}>
        <circle cx="14" cy="14" r="9" />
        <line x1="14" y1="14" x2="14" y2="6" strokeWidth={active ? "1.5" : "1"} stroke={active ? "var(--accent-ink)" : "currentColor"} />
        <circle cx="14" cy="14" r="1.5" fill={active ? "var(--accent)" : "currentColor"} />
        {/* Notch marks */}
        <circle cx="5" cy="14" r="1" fill="currentColor" opacity={active ? 0.8 : 0.4} />
        <circle cx="23" cy="14" r="1" fill="currentColor" opacity={active ? 0.8 : 0.4} />
        <circle cx="14" cy="5" r="1" fill="currentColor" opacity={active ? 0.8 : 0.4} />
        <circle cx="14" cy="23" r="1" fill="currentColor" opacity={active ? 0.8 : 0.4} />
      </g>
      {/* Signal arrow */}
      <line x1="28" y1="14" x2={active ? "62" : "56"} y2="14" stroke={active ? "var(--accent-ink)" : "currentColor"}
        style={{ transition: "x2 0.4s cubic-bezier(0.2,0.7,0.2,1), stroke 0.2s ease" }} />
      <path d={active ? "M56 9 L64 14 L56 19" : "M50 9 L58 14 L50 19"} fill="none" stroke={active ? "var(--accent-ink)" : "currentColor"}
        style={{ transition: "d 0.4s cubic-bezier(0.2,0.7,0.2,1), stroke 0.2s ease" }} />
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
      style={{
        gridTemplateColumns: "140px 1fr",
        padding: "104px 0",
      }}
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
      className="border-r border-b border-rule p-5 pb-[110px] relative min-h-[240px] transition-colors duration-250 hover:bg-paper-2 method-cell"
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

import React from "react";
