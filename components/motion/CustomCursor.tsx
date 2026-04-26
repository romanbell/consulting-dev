"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const crossRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);

  const handleMove = useCallback((e: MouseEvent) => {
    // Move crosshair directly on the event, zero lag
    if (crossRef.current) {
      crossRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
    // Square trails just slightly via CSS transition
    if (squareRef.current) {
      squareRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }

    // Status bar coords
    const el = document.getElementById("sbCoords");
    if (el) {
      el.textContent = `[${String(Math.round(e.clientX)).padStart(3, "0")},${String(Math.round(e.clientY)).padStart(3, "0")}]`;
    }

    if (!activeRef.current) {
      activeRef.current = true;
      if (crossRef.current) crossRef.current.style.opacity = "1";
      if (squareRef.current) squareRef.current.style.opacity = "0.12";
    }
  }, []);

  useEffect(() => {
    if (reduced) return;

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      @media (hover: none) { *, *::before, *::after { cursor: auto !important; } }
    `;
    document.head.appendChild(style);

    const onLeave = () => {
      activeRef.current = false;
      if (crossRef.current) crossRef.current.style.opacity = "0";
      if (squareRef.current) squareRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      activeRef.current = true;
      if (crossRef.current) crossRef.current.style.opacity = "1";
      if (squareRef.current) squareRef.current.style.opacity = "0.12";
    };

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

    return () => {
      style.remove();
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cleanups.forEach((fn) => fn());
    };
  }, [reduced, handleMove]);

  if (reduced) return null;

  return (
    <>
      {/* Crosshair (+) — no lerp, direct on mousemove */}
      <div
        ref={crossRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{ width: "23px", height: "23px", opacity: 0 }}
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

      {/* Trailing square — CSS transition for the tiny delay */}
      <div
        ref={squareRef}
        className="fixed top-0 left-0 pointer-events-none z-[99]"
        style={{
          width: "10px",
          height: "10px",
          border: "1px solid var(--accent)",
          opacity: 0,
          transition: "transform 0.08s linear, opacity 0.3s ease",
        }}
      />
    </>
  );
}
