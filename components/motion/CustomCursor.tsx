"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const HOVER_TARGETS = [
  { sel: ".cta", text: "click" },
  { sel: "a[data-project-row]", text: "view" },
  { sel: ".tc-part", text: "spec" },
  { sel: ".chip", text: "" },
  { sel: "a[href]", text: "open" },
  { sel: ".method-cell", text: "" },
];

export function CustomCursor() {
  const reduced = useReducedMotion();
  const curRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const posRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const stateRef = useRef<"default" | "hover" | "text">("default");
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) return;

    // Hide system cursor
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (!active) setActive(true);
    };

    const onLeave = () => setActive(false);
    const onEnter = () => setActive(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Hover listeners
    const cleanups: (() => void)[] = [];
    HOVER_TARGETS.forEach(({ sel, text }) => {
      document.querySelectorAll(sel).forEach((el) => {
        const enter = () => {
          if (curRef.current) {
            curRef.current.classList.add("vc-hover");
            if (text) {
              curRef.current.classList.add("vc-text");
              if (labelRef.current) labelRef.current.textContent = text;
            }
          }
          stateRef.current = text ? "text" : "hover";
        };
        const leave = () => {
          if (curRef.current) {
            curRef.current.classList.remove("vc-hover", "vc-text");
            if (labelRef.current) labelRef.current.textContent = "";
          }
          stateRef.current = "default";
        };
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      });
    });

    // Magnetic CTAs
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const move = (e: Event) => {
        const me = e as MouseEvent;
        const r = (el as HTMLElement).getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (me.clientX - cx) * 0.25;
        const dy = (me.clientY - cy) * 0.35;
        (el as HTMLElement).style.transform = `translate(${dx}px, ${dy}px)`;
      };
      const leave = () => {
        (el as HTMLElement).style.transform = "";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    });

    // Animation loop
    let raf: number;
    function loop() {
      const p = posRef.current;
      p.tx += (p.x - p.tx) * 0.28;
      p.ty += (p.y - p.ty) * 0.28;
      if (curRef.current) {
        curRef.current.style.transform = `translate(${p.tx}px, ${p.ty}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cleanups.forEach((fn) => fn());
      cancelAnimationFrame(raf);
    };
  }, [reduced, active]);

  if (reduced) return null;

  return (
    <div
      ref={curRef}
      className="fixed top-0 left-0 w-3.5 h-3.5 border border-ink-3 rounded-full bg-transparent pointer-events-none z-[100] flex items-center justify-center"
      style={{
        opacity: active ? 1 : 0,
        transition:
          "width 0.25s var(--ease-studio), height 0.25s var(--ease-studio), border-color 0.2s ease, opacity 0.2s ease",
      }}
    >
      <span
        ref={labelRef}
        className="text-accent-ink font-mono text-[9px] tracking-[0.14em] uppercase opacity-0 whitespace-nowrap transition-opacity duration-150"
      />
      <style>{`
        .vc-hover { width: 56px !important; height: 56px !important; border-color: var(--accent-ink) !important; }
        .vc-text { width: 84px !important; height: 84px !important; }
        .vc-hover span { opacity: 1 !important; }
        @media (hover: none) { .fixed.pointer-events-none.z-\\[100\\] { display: none; } }
      `}</style>
    </div>
  );
}
