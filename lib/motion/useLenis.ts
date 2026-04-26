"use client";

import { useEffect, useRef } from "react";

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Anchor click handler — plain smooth scroll, no library
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
      const top = el.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: "smooth" });
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return lenisRef;
}
