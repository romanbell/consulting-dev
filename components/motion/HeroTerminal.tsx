"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const MESSAGES: [string, string][] = [
  ["\u2014", "kettle on. proceed."],
  ["\u2014", "stared at the monitor for <b>4</b> minutes"],
  ["\u2014", "mech keyboard click count: <b>1,204</b>"],
  ["\u2014", "that's a lot of tabs"],
  ["\u2014", "cron muttered something. ignored."],
  ["\u2014", "JW reorganised the snack drawer"],
  ["\u2014", "RB renamed the project for the <b>3rd</b> time"],
  ["\u2014", "brewed coffee · <b>cup 04</b>"],
  ["\u2014", "argued about font weights for <b>22m</b>"],
  ["\u2014", "saved a draft. did not press send."],
  ["\u2014", "whiteboard at <b>78%</b> capacity"],
  ["\u2014", "squirrel noted at <b>10:42</b>"],
  ["\u2014", "named a function after a fish"],
  ["\u2014", "stretched. made a face."],
  ["\u2014", "plant watered. plant judged us."],
  ["\u2014", "took the long route to the bodega"],
  ["\u2014", "drew a duck on the schema diagram"],
  ["\u2014", "silence held for <b>9</b> seconds"],
  ["\u2014", "reorganised the bookmarks bar. again."],
  ["\u2014", "one (1) good idea, written down"],
];

const MAX_LINES = 7;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function timestamp() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/** SSR-safe: renders static seed lines. Hydration replaces with animated stream. */
export function HeroTerminal() {
  const reduced = useReducedMotion();
  const termRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ ts: string; lvl: string; msg: string }[]>(() => {
    // Seed initial lines for SSR
    const seed: { ts: string; lvl: string; msg: string }[] = [];
    for (let i = 0; i < 4; i++) {
      const [lvl, msg] = MESSAGES[i] ?? ["\u2014", ""];
      seed.push({ ts: "00:00:00", lvl, msg });
    }
    return seed;
  });
  const indexRef = useRef(4);

  useEffect(() => {
    if (reduced) return;

    // Update seed lines with real timestamps
    setLines((prev) =>
      prev.map((line) => ({ ...line, ts: timestamp() }))
    );

    const interval = setInterval(() => {
      const i = indexRef.current % MESSAGES.length;
      const [lvl, msg] = MESSAGES[i] ?? ["\u2014", ""];
      indexRef.current++;
      setLines((prev) => {
        const next = [...prev, { ts: timestamp(), lvl, msg }];
        if (next.length > MAX_LINES) return next.slice(-MAX_LINES);
        return next;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div
      ref={termRef}
      className="mt-3.5 border border-rule-2 bg-paper-2 font-mono text-[10.5px] leading-[1.55] text-ink-2 tracking-[0.02em] h-[142px] overflow-hidden relative"
      style={{
        padding: "10px 12px 12px",
        maskImage:
          "linear-gradient(180deg, transparent 0, black 18px, black calc(100% - 18px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent 0, black 18px, black calc(100% - 18px), transparent 100%)",
      }}
      aria-hidden="true"
    >
      {lines.map((line, i) => (
        <div key={`${line.ts}-${i}`} className="flex gap-2 whitespace-nowrap">
          <span className="text-ink-3 shrink-0">{line.ts}</span>
          <span className="text-ink-3 shrink-0 w-8">{line.lvl}</span>
          <span
            className="text-ink overflow-hidden text-ellipsis min-w-0"
            dangerouslySetInnerHTML={{
              __html:
                line.msg +
                (i === lines.length - 1
                  ? '<span class="inline-block w-[5px] h-[9px] bg-ink align-[-1px] ml-0.5" style="animation: caret 1.05s steps(2) infinite"></span>'
                  : ""),
            }}
          />
        </div>
      ))}
    </div>
  );
}
