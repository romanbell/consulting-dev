"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const style = document.createElement("style");
    style.textContent = `*, *::before, *::after { cursor: none !important; }
      @media (hover: none) { *, *::before, *::after { cursor: auto !important; } }`;
    document.head.appendChild(style);

    const el = elRef.current;
    if (!el) return;
    let visible = false;

    function onMove(e: MouseEvent) {
      el!.style.translate = `${e.clientX - 11}px ${e.clientY - 11}px`;
      if (!visible) { visible = true; el!.style.opacity = "1"; }
      const sb = document.getElementById("sbCoords");
      if (sb) sb.textContent = `[${String(Math.round(e.clientX)).padStart(3, "0")},${String(Math.round(e.clientY)).padStart(3, "0")}]`;
    }
    function onLeave() { visible = false; el!.style.opacity = "0"; }
    function onEnter() { visible = true; el!.style.opacity = "1"; }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const cleanups: (() => void)[] = [];
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      const move = (e: Event) => {
        const me = e as MouseEvent;
        const r = (btn as HTMLElement).getBoundingClientRect();
        const dx = (me.clientX - (r.left + r.width / 2)) * 0.2;
        const dy = (me.clientY - (r.top + r.height / 2)) * 0.25;
        (btn as HTMLElement).style.transform = `translate(${dx}px, ${dy}px)`;
      };
      const leave = () => { (btn as HTMLElement).style.transform = ""; };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      cleanups.push(() => { btn.removeEventListener("mousemove", move); btn.removeEventListener("mouseleave", leave); });
    });

    return () => {
      style.remove();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cleanups.forEach((fn) => fn());
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={elRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 23,
        height: 23,
        pointerEvents: "none",
        zIndex: 100,
        opacity: 0,
        contain: "layout style size",
      }}
    >
      <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "var(--ink)", opacity: 0.55 }} />
      <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "var(--ink)", opacity: 0.55 }} />
    </div>
  );
}
