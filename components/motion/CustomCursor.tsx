"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const crossRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const style = document.createElement("style");
    style.textContent = `*, *::before, *::after { cursor: none !important; }
      @media (hover: none) { *, *::before, *::after { cursor: auto !important; } }`;
    document.head.appendChild(style);

    let visible = false;
    const cross = crossRef.current;
    const square = squareRef.current;

    function onMove(e: MouseEvent) {
      // Use CSS custom properties + translate3d for GPU-only compositing, no layout
      if (cross) {
        cross.style.setProperty("--cx", e.clientX + "px");
        cross.style.setProperty("--cy", e.clientY + "px");
      }
      if (square) {
        square.style.setProperty("--cx", e.clientX + "px");
        square.style.setProperty("--cy", e.clientY + "px");
      }

      // Status bar coords
      const sb = document.getElementById("sbCoords");
      if (sb) sb.textContent = `[${String(Math.round(e.clientX)).padStart(3, "0")},${String(Math.round(e.clientY)).padStart(3, "0")}]`;

      if (!visible) {
        visible = true;
        if (cross) cross.style.opacity = "1";
        if (square) square.style.opacity = "0.1";
      }
    }

    function onLeave() {
      visible = false;
      if (cross) cross.style.opacity = "0";
      if (square) square.style.opacity = "0";
    }
    function onEnter() {
      visible = true;
      if (cross) cross.style.opacity = "1";
      if (square) square.style.opacity = "0.1";
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Magnetic CTAs
    const cleanups: (() => void)[] = [];
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const move = (e: Event) => {
        const me = e as MouseEvent;
        const r = (el as HTMLElement).getBoundingClientRect();
        const dx = (me.clientX - (r.left + r.width / 2)) * 0.2;
        const dy = (me.clientY - (r.top + r.height / 2)) * 0.25;
        (el as HTMLElement).style.transform = `translate(${dx}px, ${dy}px)`;
      };
      const leave = () => { (el as HTMLElement).style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
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

  // Both elements use translate3d driven by CSS custom properties
  // This keeps everything on the compositor thread, no layout/paint
  const cursorBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    willChange: "transform",
    transform: "translate3d(var(--cx, 0px), var(--cy, 0px), 0) translate(-50%, -50%)",
  };

  return (
    <>
      <div
        ref={crossRef}
        style={{ ...cursorBase, width: "23px", height: "23px", opacity: 0, zIndex: 100 }}
      >
        <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "var(--ink)", opacity: 0.6, transform: "translateY(-0.5px)" }} />
        <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "var(--ink)", opacity: 0.6, transform: "translateX(-0.5px)" }} />
      </div>
      <div
        ref={squareRef}
        style={{
          ...cursorBase,
          width: "10px",
          height: "10px",
          border: "1px solid var(--accent)",
          opacity: 0,
          zIndex: 99,
          transition: "transform 0.04s linear",
        }}
      />
    </>
  );
}
