"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface PlateData {
  ref: string;
  sector: string;
  outcome: string;
  sparkSvg: string;
}

function drawSpark(seed: string): string {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) % 997;
  const pts: [number, number][] = [];
  for (let i = 0; i < 22; i++) {
    const x = (i / 21) * 100;
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const y = 10 + (s % 40);
    pts.push([x, y]);
  }
  const poly = pts.map((p) => p.join(",")).join(" ");
  const last = pts[pts.length - 1];
  return `
    <line x1="0" y1="50" x2="100" y2="50" stroke="#D9D4C6" stroke-width="0.3"/>
    <polyline points="${poly}" fill="none" stroke="#17171A" stroke-width="0.6"/>
    <circle cx="${last?.[0] ?? 0}" cy="${last?.[1] ?? 0}" r="1.2" fill="#17171A"/>
  `;
}

export function HoverPlate() {
  const plateRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<PlateData | null>(null);
  const [visible, setVisible] = useState(false);

  const onEnter = useCallback((e: Event) => {
    const el = e.currentTarget as HTMLElement;
    const ref = el.dataset.ref ?? "";
    setData({
      ref,
      sector: el.dataset.sector ?? "",
      outcome: el.dataset.outcome ?? "",
      sparkSvg: drawSpark(ref),
    });
    setVisible(true);
  }, []);

  const onLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    if (!plateRef.current) return;
    const pw = 300, ph = 240, pad = 16;
    let x = e.clientX + 20, y = e.clientY + 20;
    if (x + pw > window.innerWidth - pad) x = e.clientX - pw - 20;
    if (y + ph > window.innerHeight - pad) y = e.clientY - ph - 20;
    plateRef.current.style.left = x + "px";
    plateRef.current.style.top = y + "px";
  }, []);

  useEffect(() => {
    // Bind to all project rows. Use MutationObserver to catch late renders.
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

  // Update SVG when data changes
  useEffect(() => {
    if (svgRef.current && data?.sparkSvg) {
      svgRef.current.innerHTML = data.sparkSvg;
    }
  }, [data]);

  return (
    <div
      ref={plateRef}
      className="fixed pointer-events-none z-[15] w-[300px] bg-paper text-[12px]"
      style={{
        border: "1px solid var(--ink)",
        padding: "14px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.15s ease, transform 0.15s ease",
      }}
      aria-hidden="true"
    >
      {/* Spark line preview */}
      <div
        className="w-full bg-paper-2 border border-rule-2 mb-3 grid place-items-center relative overflow-hidden"
        style={{ height: "120px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(-45deg, transparent 0 8px, rgba(23,23,26,.04) 8px 9px)",
          }}
        />
        <svg
          ref={svgRef}
          viewBox="0 0 100 60"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "90%", height: "80%" }}
        />
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
