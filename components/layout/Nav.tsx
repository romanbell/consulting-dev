"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { n: "01", label: "Work", href: "/#manifest" },
  { n: "02", label: "Studio", href: "/#fieldwork" },
  { n: "03", label: "Method", href: "/#method" },
  { n: "04", label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="relative border-t border-rule"
      style={{ padding: "28px 0 24px" }}
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[15px] font-medium tracking-[0.22em] font-sans hover:text-ink relative z-30"
          onClick={() => setOpen(false)}
        >
          <span
            className="inline-block h-[7px] w-[7px] rounded-full bg-accent"
            style={{
              boxShadow: "0 0 0 3px rgba(0,152,139,0.12)",
              animation: "pulse 3s ease-in-out infinite",
            }}
            aria-hidden="true"
          />
          VERIDIUM
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden min-[769px]:flex gap-8 list-none p-0 m-0 text-[13px] text-ink-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.n}>
              <Link href={item.href} className="relative group">
                <span className="font-mono text-[9px] text-ink-3 mr-1.5 tracking-[0.08em]">
                  {item.n}
                </span>
                {item.label}
                <span
                  className="absolute left-0 right-0 -bottom-1.5 h-px bg-ink origin-left scale-x-0 transition-transform duration-350"
                  style={{ transitionTimingFunction: "var(--ease-studio)" }}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu trigger: mono text, not a hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="min-[769px]:hidden relative z-30 bg-transparent border-0 cursor-pointer p-0 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-2 min-h-[44px] min-w-[44px] flex items-center justify-end"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile overlay menu (preserved from previous version, user approved) */}
      <div
        className="min-[769px]:hidden fixed inset-0 z-20 bg-paper flex flex-col justify-center transition-all duration-300"
        style={{
          transitionTimingFunction: "var(--ease-studio)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="px-[var(--shell-px)]">
          <ul className="list-none p-0 m-0 flex flex-col gap-0">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.n}
                className="border-b border-rule"
                style={{
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  opacity: open ? 1 : 0,
                  transition: `all 0.35s var(--ease-studio) ${open ? i * 0.06 : 0}s`,
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 py-5 text-ink no-underline"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-mono text-[10px] text-ink-3 tracking-[0.1em]">
                    {item.n}
                  </span>
                  <span className="font-sans text-[28px] font-normal tracking-[-0.02em]">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3">
            <span className="inline-flex items-center gap-2">
              <span
                className="w-[6px] h-[6px] rounded-full inline-block"
                style={{
                  background: "var(--accent-ink)",
                  animation: "csblink 1.4s steps(2,end) infinite",
                }}
              />
              studio open
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
