"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Identicon } from "@/components/ui/Identicon";

interface PlateData {
  ref: string;
  sector: string;
  outcome: string;
}

export function HoverPlate() {
  const plateRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PlateData | null>(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

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
    if (isTouch) return;
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

    // Hide on scroll: in-page anchor jumps trigger smooth scroll without
    // moving the cursor in viewport space, so mouseleave never fires and
    // the plate gets stuck. Same for wheel/keyboard scrolling over a row.
    function onScroll() {
      setVisible(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      rows.forEach((r) => {
        r.removeEventListener("mouseenter", onEnter);
        r.removeEventListener("mouseleave", onLeave);
        r.removeEventListener("mousemove", onMove as EventListener);
      });
      window.removeEventListener("scroll", onScroll);
    };
  }, [onEnter, onLeave, onMove, isTouch]);

  if (isTouch) return null;

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
        {data && (
          <Identicon
            seed={data.ref}
            animateKey={data.ref}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
            totalMs={400}
            cellMs={180}
            targetOpacity={0.55}
          />
        )}
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
