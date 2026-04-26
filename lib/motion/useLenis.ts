"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 2,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Wire up anchor clicks to use Lenis scrollTo
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      let hash = "";
      if (href.startsWith("/#")) {
        hash = href.slice(1);
      } else if (href.startsWith("#")) {
        hash = href;
      }
      if (!hash) return;

      const el = document.querySelector(hash);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -40, duration: 1.2 });
    }
    document.addEventListener("click", handleClick);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
