"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const crossRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const posRef = useRef({ x: 0, y: 0, cx: 0, cy: 0, rx: 0, ry: 0 });
  const activeRef = useRef(false);

  const handleMove = useCallback((e: MouseEvent) => {
    posRef.current.x = e.clientX;
    posRef.current.y = e.clientY;

    // Update status bar cursor coords
    const el = document.getElementById("sbCoords");
    if (el) {
      const x = String(Math.round(e.clientX)).padStart(3, "0");
      const y = String(Math.round(e.clientY)).padStart(3, "0");
      el.textContent = `[${x},${y}]`;
    }

    if (!activeRef.current) {
      activeRef.current = true;
      setActive(true);
    }
  }, []);

  useEffect(() => {
    if (reduced) return;

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = `
      input, textarea, select, button { cursor: auto !important; }
      @media (hover: none) { body { cursor: auto !important; } }
    `;
    document.head.appendChild(style);

    const onLeave = () => { activeRef.current = false; setActive(false); };
    const onEnter = () => { activeRef.current = true; setActive(true); };

    document.addEventListener("mousemove", handleMove);
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
      const leave = () => { (el as HTMLElement).style.transform = ""; };
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
      // Crosshair: tight follow
      p.cx += (p.x - p.cx) * 0.45;
      p.cy += (p.y - p.cy) * 0.45;
      // Ring: softer delayed follow
      p.rx += (p.x - p.rx) * 0.1;
      p.ry += (p.y - p.ry) * 0.1;

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
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cleanups.forEach((fn) => fn());
      cancelAnimationFrame(raf);
    };
  }, [reduced, handleMove]);

  if (reduced) return null;

  return (
    <>
      {/* Crosshair (+) — slightly bigger, 23px */}
      <div
        ref={crossRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          width: "23px",
          height: "23px",
          opacity: active ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <span
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
          style={{ height: "1px", background: "var(--ink)", opacity: 0.6 }}
        />
        <span
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
          style={{ width: "1px", background: "var(--ink)", opacity: 0.6 }}
        />
      </div>

      {/* Square — tiny, subtle green hollow square */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99]"
        style={{
          width: "10px",
          height: "10px",
          border: "1px solid var(--accent)",
          opacity: active ? 0.18 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}
