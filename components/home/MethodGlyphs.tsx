export function PatchbayGlyph() {
  return (
    <svg
      width="56"
      height="24"
      viewBox="0 0 56 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="6" cy="12" r="3" />
      <circle cx="22" cy="12" r="3" />
      <circle cx="38" cy="12" r="3" />
      <path d="M9 12 C 14 4, 18 4, 22 12" fill="none" />
      <path d="M25 12 C 30 20, 34 20, 38 12" fill="none" />
      <circle
        className="blink-sig"
        cx="50"
        cy="12"
        r="2"
        fill="currentColor"
        stroke="none"
        style={{ animation: "blinkSig 1.4s ease-in-out infinite" }}
      />
    </svg>
  );
}

export function SequencerGlyph() {
  return (
    <svg
      width="56"
      height="24"
      viewBox="0 0 56 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <rect x="2" y="8" width="6" height="8" />
      <rect x="10" y="4" width="6" height="16" fill="currentColor" />
      <rect x="18" y="10" width="6" height="4" />
      <rect x="26" y="6" width="6" height="12" fill="currentColor" />
      <rect x="34" y="9" width="6" height="6" />
      <rect x="42" y="3" width="6" height="18" />
      <rect x="50" y="10" width="4" height="4" fill="currentColor" />
    </svg>
  );
}

export function LfoGlyph() {
  return (
    <svg
      width="56"
      height="24"
      viewBox="0 0 56 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="12"
        x2="56"
        y2="12"
        strokeDasharray="2 2"
        opacity=".4"
      />
      <path
        className="lfo"
        d="M-6 12 Q 2 2, 10 12 T 26 12 T 42 12 T 58 12"
        fill="none"
      />
    </svg>
  );
}

export function HandoffGlyph() {
  return (
    <svg
      width="56"
      height="24"
      viewBox="0 0 56 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <g
        className="rot"
        style={{
          transformBox: "fill-box" as const,
          transformOrigin: "12px 12px",
        }}
      >
        <circle cx="12" cy="12" r="8" />
        <line x1="12" y1="12" x2="12" y2="5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        <circle cx="4" cy="12" r=".8" fill="currentColor" />
        <circle cx="20" cy="12" r=".8" fill="currentColor" />
        <circle cx="12" cy="4" r=".8" fill="currentColor" />
        <circle cx="12" cy="20" r=".8" fill="currentColor" />
      </g>
      <line x1="24" y1="12" x2="52" y2="12" />
      <path d="M46 8 L52 12 L46 16" fill="none" />
    </svg>
  );
}

export const GLYPH_MAP = {
  patchbay: PatchbayGlyph,
  sequencer: SequencerGlyph,
  lfo: LfoGlyph,
  handoff: HandoffGlyph,
} as const;
