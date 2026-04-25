"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const d = new Date();
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} EST`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-18 bg-paper border-t border-rule font-mono text-[10px] text-ink-3 tracking-[0.1em] uppercase grid grid-cols-[1fr_auto_1fr] gap-6 items-center pointer-events-none max-[1080px]:hidden"
      style={{ padding: "8px var(--shell-px)" }}
      aria-hidden="true"
    >
      <div className="justify-self-start flex gap-4 items-center whitespace-nowrap">
        <span>
          <span className="text-accent-ink">●</span>{" "}
          <span className="text-ink">veridium</span> — online
        </span>
      </div>
      <div className="justify-self-center text-ink whitespace-nowrap">
        new york · <span className="text-ink">40.71°N 74.00°W</span>
      </div>
      <div className="justify-self-end flex gap-4 items-center whitespace-nowrap">
        <span>
          cursor <span className="text-ink" id="sbCoords">[000,000]</span>
        </span>
        <span>est. 2024</span>
        <span className="text-ink">
          {time}
          <span
            className="inline-block w-1.5 h-[9px] bg-ink align-[-1px] ml-1"
            style={{ animation: "caret 1.1s steps(2) infinite" }}
          />
        </span>
      </div>
    </div>
  );
}
