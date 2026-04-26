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

    // Position square state for the tiny trailing lerp
    let sx = 0, sy = 0, tx = 0, ty = 0;
    let visible = false;
    let raf = 0;

    function onMove(e: MouseEvent) {
      const x = e.clientX, y = e.clientY;
      tx = x; ty = y;

      // Crosshair: set left/top directly, zero intermediate frames
      if (crossRef.current) {
        crossRef.current.style.left = x - 11 + "px";
        crossRef.current.style.top = y - 11 + "px";
      }

      // Status bar
      const sb = document.getElementById("sbCoords");
      if (sb) sb.textContent = `[${String(Math.round(x)).padStart(3, "0")},${String(Math.round(y)).padStart(3, "0")}]`;

      if (!visible) {
        visible = true;
        if (crossRef.current) crossRef.current.style.opacity = "1";
        if (squareRef.current) squareRef.current.style.opacity = "0.12";
        sx = x; sy = y;
      }
    }

    function loop() {
      // Square: lerp toward target, very close follow
      sx += (tx - sx) * 0.55;
      sy += (ty - sy) * 0.55;
      if (squareRef.current) {
        squareRef.current.style.left = sx - 5 + "px";
        squareRef.current.style.top = sy - 5 + "px";
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function onLeave() {
      visible = false;
      if (crossRef.current) crossRef.current.style.opacity = "0";
      if (squareRef.current) squareRef.current.style.opacity = "0";
    }
    function onEnter() {
      visible = true;
      if (crossRef.current) crossRef.current.style.opacity = "1";
      if (squareRef.current) squareRef.current.style.opacity = "0.12";
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
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={crossRef}
        style={{
          position: "fixed",
          width: "23px",
          height: "23px",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 100,
          willChange: "left, top",
        }}
      >
        <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "var(--ink)", opacity: 0.6, transform: "translateY(-0.5px)" }} />
        <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "var(--ink)", opacity: 0.6, transform: "translateX(-0.5px)" }} />
      </div>
      <div
        ref={squareRef}
        style={{
          position: "fixed",
          width: "10px",
          height: "10px",
          border: "1px solid var(--accent)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 99,
          willChange: "left, top",
        }}
      />
    </>
  );
}
