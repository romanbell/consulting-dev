"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const d = new Date();
      setTime(
        `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} EST`
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-ink">
      {time}
      <span
        className="inline-block w-1.5 h-[9px] bg-ink align-[-1px] ml-1"
        style={{ animation: "caret 1.1s steps(2) infinite" }}
        aria-hidden="true"
      />
    </span>
  );
}
