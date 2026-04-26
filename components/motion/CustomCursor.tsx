"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const crossRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const posRef = useRef({ x: 0, y: 0, cx: 0, cy: 0, rx: 0, ry: 0 });

  useEffect(() => {
    if (reduced) return;

    document.body.style.cursor = "none";
    // Restore cursor on inputs/textareas
    const style = document.createElement("style");
    style.textContent = `
      input, textarea, select, button { cursor: auto !important; }
      @media (hover: none) { body { cursor: auto !important; } }
    `;
    document.head.appendChild(style);

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

    // Magnetic CTAs
    const cleanups: (() => void)[] = [];
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const move = (e: Event) => {
        const me = e as MouseEvent;
        const r = (el as HTMLElement).getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (me.clientX - cx) * 0.2;
        const dy = (me.clientY - cy) * 0.25;
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

    let raf: number;
    function loop() {
      const p = posRef.current;
      // Crosshair: tight follow (lerp 0.45)
      p.cx += (p.x - p.cx) * 0.45;
      p.cy += (p.y - p.cy) * 0.45;
      // Ring: delayed follow (lerp 0.12)
      p.rx += (p.x - p.rx) * 0.12;
      p.ry += (p.y - p.ry) * 0.12;

      if (crossRef.current) {
        crossRef.current.style.transform = `translate(${p.cx}px, ${p.cy}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${p.rx}px, ${p.ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.style.cursor = "";
      style.remove();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cleanups.forEach((fn) => fn());
      cancelAnimationFrame(raf);
    };
  }, [reduced, active]);

  if (reduced) return null;

  return (
    <>
      {/* Crosshair (+) — tight follow */}
      <div
        ref={crossRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          width: "17px",
          height: "17px",
          opacity: active ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {/* Horizontal line */}
        <span
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
          style={{ height: "1px", background: "var(--ink)", opacity: 0.7 }}
        />
        {/* Vertical line */}
        <span
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
          style={{ width: "1px", background: "var(--ink)", opacity: 0.7 }}
        />
      </div>

      {/* Ring — delayed green hollow circle */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99]"
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          opacity: active ? 0.6 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}
