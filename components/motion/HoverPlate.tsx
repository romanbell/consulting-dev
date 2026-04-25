"use client";

import { useEffect, useRef, useState } from "react";

interface PlateData {
  ref: string;
  sector: string;
  outcome: string;
}

export function HoverPlate() {
  const plateRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PlateData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const rows = document.querySelectorAll<HTMLAnchorElement>("a[data-project-row]");

    function onEnter(e: Event) {
      const el = e.currentTarget as HTMLElement;
      setData({
        ref: el.dataset.ref ?? "",
        sector: el.dataset.sector ?? "",
        outcome: el.dataset.outcome ?? "",
      });
      setVisible(true);
    }

    function onLeave() {
      setVisible(false);
    }

    function onMove(e: MouseEvent) {
      if (!plateRef.current) return;
      const pw = 300, ph = 240, pad = 16;
      let x = e.clientX + 20, y = e.clientY + 20;
      if (x + pw > window.innerWidth - pad) x = e.clientX - pw - 20;
      if (y + ph > window.innerHeight - pad) y = e.clientY - ph - 20;
      plateRef.current.style.left = x + "px";
      plateRef.current.style.top = y + "px";
    }

    rows.forEach((r) => {
      r.addEventListener("mouseenter", onEnter);
      r.addEventListener("mouseleave", onLeave);
      r.addEventListener("mousemove", onMove as EventListener);
    });

    return () => {
      rows.forEach((r) => {
        r.removeEventListener("mouseenter", onEnter);
        r.removeEventListener("mouseleave", onLeave);
        r.removeEventListener("mousemove", onMove as EventListener);
      });
    };
  }, []);

  return (
    <div
      ref={plateRef}
      className="fixed pointer-events-none z-15 w-[300px] bg-paper border border-ink p-3.5 text-[12px] transition-all duration-150"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-[120px] bg-paper-2 border border-rule-2 mb-3 grid place-items-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(-45deg, transparent 0 8px, rgba(23,23,26,.04) 8px 9px)",
          }}
        />
      </div>
      <div className="flex justify-between py-1.5 font-mono text-[10.5px] border-b border-dashed border-rule-2">
        <span className="text-ink-3 tracking-[0.06em]">REF.</span>
        <span>{data?.ref}</span>
      </div>
      <div className="flex justify-between py-1.5 font-mono text-[10.5px] border-b border-dashed border-rule-2">
        <span className="text-ink-3 tracking-[0.06em]">SECTOR</span>
        <span>{data?.sector}</span>
      </div>
      <div className="flex justify-between py-1.5 font-mono text-[10.5px]">
        <span className="text-ink-3 tracking-[0.06em]">OUTCOME</span>
        <span>{data?.outcome}</span>
      </div>
    </div>
  );
}
