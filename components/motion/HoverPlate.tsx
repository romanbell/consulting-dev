"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface PlateData {
  ref: string;
  sector: string;
  outcome: string;
}

/** Generate a 5x5 mirrored pixel hash (GitHub identicon style) from a seed string */
function generateIdenticon(seed: string): boolean[][] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) & 0x7fffffff;

  const grid: boolean[][] = [];
  for (let row = 0; row < 5; row++) {
    const line: boolean[] = [];
    for (let col = 0; col < 3; col++) {
      h = (h * 1103515245 + 12345) & 0x7fffffff;
      line.push((h & 1) === 1);
    }
    // Mirror: col 3 = col 1, col 4 = col 0
    line.push(line[1] ?? false);
    line.push(line[0] ?? false);
    grid.push(line);
  }
  return grid;
}

function IdenticonCanvas({ seed }: { seed: string }) {
  const grid = generateIdenticon(seed);
  const cellSize = 18;
  const gap = 2;
  const total = cellSize * 5 + gap * 4;

  return (
    <svg
      width={total}
      height={total}
      viewBox={`0 0 ${total} ${total}`}
      style={{ position: "relative", zIndex: 1 }}
    >
      {grid.map((row, ry) =>
        row.map((on, cx) => (
          <rect
            key={`${ry}-${cx}`}
            x={cx * (cellSize + gap)}
            y={ry * (cellSize + gap)}
            width={cellSize}
            height={cellSize}
            fill={on ? "var(--accent)" : "transparent"}
            opacity={on ? 0.7 : 0}
          />
        ))
      )}
    </svg>
  );
}

export function HoverPlate() {
  const plateRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PlateData | null>(null);
  const [visible, setVisible] = useState(false);

  const onEnter = useCallback((e: Event) => {
    const el = e.currentTarget as HTMLElement;
    setData({
      ref: el.dataset.ref ?? "",
      sector: el.dataset.sector ?? "",
      outcome: el.dataset.outcome ?? "",
    });
    setVisible(true);
  }, []);

  const onLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    if (!plateRef.current) return;
    const pw = 280, ph = 220, pad = 16;
    let x = e.clientX + 20, y = e.clientY + 20;
    if (x + pw > window.innerWidth - pad) x = e.clientX - pw - 20;
    if (y + ph > window.innerHeight - pad) y = e.clientY - ph - 20;
    plateRef.current.style.left = x + "px";
    plateRef.current.style.top = y + "px";
  }, []);

  useEffect(() => {
    function bind() {
      const rows = document.querySelectorAll<HTMLElement>("[data-project-row]");
      rows.forEach((r) => {
        r.addEventListener("mouseenter", onEnter);
        r.addEventListener("mouseleave", onLeave);
        r.addEventListener("mousemove", onMove as EventListener);
      });
      return rows;
    }

    const rows = bind();

    return () => {
      rows.forEach((r) => {
        r.removeEventListener("mouseenter", onEnter);
        r.removeEventListener("mouseleave", onLeave);
        r.removeEventListener("mousemove", onMove as EventListener);
      });
    };
  }, [onEnter, onLeave, onMove]);

  return (
    <div
      ref={plateRef}
      className="fixed pointer-events-none z-[15] w-[280px] bg-paper text-[12px]"
      style={{
        border: "1px solid var(--ink)",
        padding: "14px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.15s ease, transform 0.15s ease",
      }}
      aria-hidden="true"
    >
      {/* Pixel hash identicon */}
      <div
        className="w-full bg-paper-2 border border-rule-2 mb-3 flex items-center justify-center relative overflow-hidden"
        style={{ height: "110px" }}
      >
        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(-45deg, transparent 0 8px, rgba(23,23,26,.04) 8px 9px)",
          }}
        />
        {data && <IdenticonCanvas seed={data.ref} />}
      </div>
      <div className="flex justify-between py-[5px] font-mono text-[10.5px] border-b border-dashed border-rule-2">
        <span className="text-ink-3 tracking-[0.06em]">REF.</span>
        <span>{data?.ref}</span>
      </div>
      <div className="flex justify-between py-[5px] font-mono text-[10.5px] border-b border-dashed border-rule-2">
        <span className="text-ink-3 tracking-[0.06em]">SECTOR</span>
        <span>{data?.sector}</span>
      </div>
      <div className="flex justify-between py-[5px] font-mono text-[10.5px]">
        <span className="text-ink-3 tracking-[0.06em]">OUTCOME</span>
        <span>{data?.outcome}</span>
      </div>
    </div>
  );
}
