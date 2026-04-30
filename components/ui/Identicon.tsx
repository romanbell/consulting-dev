"use client";

import { useId } from "react";

/** Mirrored pixel hash (GitHub identicon style) generated deterministically
 *  from a seed. cols must be odd for symmetry. */
export function generateIdenticon(seed: string, cols: number, rows: number): boolean[][] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) & 0x7fffffff;

  const half = Math.ceil(cols / 2);
  const grid: boolean[][] = [];
  for (let row = 0; row < rows; row++) {
    const line: boolean[] = [];
    for (let col = 0; col < half; col++) {
      h = (h * 1103515245 + 12345) & 0x7fffffff;
      line.push(h % 3 !== 0);
    }
    const full = [...line];
    for (let col = half - 2; col >= 0; col--) {
      full.push(line[col] ?? false);
    }
    grid.push(full);
  }
  return grid;
}

/** Per-cell delay derived deterministically from seed + cell coords.
 *  Pure pseudo-random across the (totalMs - cellMs) window — no directional
 *  bias, so cells fade in scattered. Stable per (seed, cx, cy) tuple. */
function cellDelay(
  seed: string,
  cx: number,
  cy: number,
  totalMs: number,
  cellMs: number
): number {
  let h = 0;
  const key = `${seed}|${cx}|${cy}`;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) & 0x7fffffff;
  const stride = Math.max(0, totalMs - cellMs);
  if (stride === 0) return 0;
  // Mix the hash into a fractional [0, 1) and project onto the stride window.
  const frac = ((h * 2654435761) >>> 0) / 0x100000000;
  return Math.round(frac * stride);
}

interface IdenticonProps {
  seed: string;
  cols?: number;
  rows?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Animate cells in left-to-right with stagger when this changes. */
  animateKey?: string;
  /** Total animation span in ms. */
  totalMs?: number;
  /** Per-cell fade-in duration in ms. */
  cellMs?: number;
  /** Final opacity for "on" cells. */
  targetOpacity?: number;
  fill?: string;
}

export function Identicon({
  seed,
  cols = 13,
  rows = 7,
  className,
  style,
  animateKey,
  totalMs = 400,
  cellMs = 180,
  targetOpacity = 0.45,
  fill = "var(--accent)",
}: IdenticonProps) {
  const grid = generateIdenticon(seed, cols, rows);
  const id = useId();
  const animate = animateKey !== undefined;

  return (
    <svg
      key={animateKey}
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {grid.map((row, ry) =>
        row.map((on, cx) => {
          const delay = animate
            ? cellDelay(seed, cx, ry, totalMs, cellMs)
            : 0;
          return (
            <rect
              key={`${id}-${ry}-${cx}`}
              x={cx}
              y={ry}
              width="1"
              height="1"
              fill={on ? fill : "transparent"}
              style={{
                opacity: on ? targetOpacity : 0,
                animation:
                  animate && on
                    ? `hash-in ${cellMs}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms both`
                    : undefined,
                transformBox: "fill-box",
                transformOrigin: "center",
                ["--hash-target-opacity" as string]: targetOpacity,
              }}
            />
          );
        })
      )}
    </svg>
  );
}
