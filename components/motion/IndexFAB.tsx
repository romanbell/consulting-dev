"use client";

import { useEffect, useState, useCallback } from "react";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "manifest", label: "Manifest of Work" },
  { id: "fieldwork", label: "Studio & Partners" },
  { id: "method", label: "Method · 04 movements" },
  { id: "contact", label: "Correspondence" },
];

export function IndexFAB() {
  const [open, setOpen] = useState(false);
  const [gridOn, setGridOn] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey) return;
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key.toLowerCase() === "i") {
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
      if (e.key.toLowerCase() === "g") {
        setGridOn((g) => {
          document.body.classList.toggle("grid-on", !g);
          return !g;
        });
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 40,
        behavior: "smooth",
      });
    }
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={toggle}
        className="max-[768px]:hidden fixed right-6 bottom-6 z-20 bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase py-[11px] px-4 cursor-pointer border-none rounded-full flex gap-2.5 items-center transition-transform duration-250 hover:-translate-y-0.5"
        style={{ transitionTimingFunction: "var(--ease-studio)" }}
        aria-label="Open index panel"
      >
        <span>Index</span>
        <span className="border border-paper/35 px-1.5 py-px text-[9px] rounded">
          i
        </span>
      </button>

      <div
        className="max-[768px]:hidden fixed right-6 bottom-[72px] w-[300px] bg-paper border border-ink z-21 p-4.5 transition-all duration-220"
        style={{
          transitionTimingFunction: "var(--ease-studio)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(8px)",
          pointerEvents: open ? "auto" : "none",
        }}
        role="dialog"
        aria-label="Page index"
      >
        <h4 className="m-0 mb-3 font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3 flex justify-between">
          <span>Jump to</span>
          <span>press I</span>
        </h4>
        <ol className="list-none p-0 m-0">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="w-full flex justify-between items-baseline py-2 border-b border-dashed border-rule-2 text-[13px] cursor-pointer bg-transparent border-x-0 border-t-0 font-sans text-ink hover:text-accent-ink text-left"
              >
                <span>
                  <span className="font-mono text-[10px] text-ink-3 mr-2.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </span>
                <span>↵</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-3 pt-3 border-t border-rule font-mono text-[10px] text-ink-3 flex justify-between">
          <button
            onClick={() => {
              setGridOn((g) => {
                document.body.classList.toggle("grid-on", !g);
                return !g;
              });
            }}
            className="bg-transparent border-0 font-mono text-[10px] text-ink-3 cursor-pointer tracking-[0.1em] hover:text-ink p-0"
          >
            Grid overlay · {gridOn ? "on" : "off"}
          </button>
          <span>v 2.1</span>
        </div>
      </div>
    </>
  );
}
