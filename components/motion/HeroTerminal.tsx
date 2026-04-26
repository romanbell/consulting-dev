"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type LogLevel = "INFO" | "OK" | "WARN" | "DEBUG";

interface LogEntry {
  level: LogLevel;
  msg: string;
}

const LOG_ENTRIES: LogEntry[] = [
  { level: "INFO", msg: "GET /api/v1/health 200 OK 12ms" },
  { level: "OK", msg: "pipeline.ingest completed — 1,204 records" },
  { level: "INFO", msg: "POST /api/v1/embed 200 OK 342ms" },
  { level: "DEBUG", msg: "cache hit ratio: 0.94 (warm)" },
  { level: "INFO", msg: "GET /api/v1/projects 200 OK 8ms" },
  { level: "OK", msg: "dbt run finished — 14 models, 0 failures" },
  { level: "WARN", msg: "latency p99 > 400ms on /search — monitoring" },
  { level: "INFO", msg: "PUT /api/v1/config 200 OK 22ms" },
  { level: "OK", msg: "deploy.preview ready — branch motion-v2" },
  { level: "INFO", msg: "GET /api/v1/metrics 200 OK 6ms" },
  { level: "DEBUG", msg: "vector index: 1.4M embeddings, 98.2% recall" },
  { level: "INFO", msg: "POST /api/v1/transform 200 OK 189ms" },
  { level: "OK", msg: "snapshot saved — warehouse.prod.2026-04-25" },
  { level: "WARN", msg: "retry queue depth: 3 — clearing" },
  { level: "INFO", msg: "GET /api/v1/status 200 OK 4ms" },
  { level: "OK", msg: "cron.daily completed — next run 06:00 UTC" },
  { level: "DEBUG", msg: "model.inference avg 248ms (batch=32)" },
  { level: "INFO", msg: "PATCH /api/v1/schema 200 OK 31ms" },
  { level: "OK", msg: "tests passed — 47/47 green" },
  { level: "INFO", msg: "GET /api/v1/audit 200 OK 15ms" },
];

const MAX_LINES = 8;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function timestamp() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const LEVEL_COLORS: Record<LogLevel, string> = {
  INFO: "text-ink-3",
  OK: "text-accent-ink",
  WARN: "text-[#b8860b]",
  DEBUG: "text-ink-3 opacity-60",
};

export function HeroTerminal() {
  const reduced = useReducedMotion();
  const termRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<
    { ts: string; level: LogLevel; msg: string }[]
  >(() => {
    const seed: { ts: string; level: LogLevel; msg: string }[] = [];
    for (let i = 0; i < 5; i++) {
      const entry = LOG_ENTRIES[i];
      if (entry) seed.push({ ts: "00:00:00", level: entry.level, msg: entry.msg });
    }
    return seed;
  });
  const indexRef = useRef(5);

  useEffect(() => {
    if (reduced) return;

    setLines((prev) => prev.map((line) => ({ ...line, ts: timestamp() })));

    const interval = setInterval(() => {
      const i = indexRef.current % LOG_ENTRIES.length;
      const entry = LOG_ENTRIES[i];
      if (!entry) return;
      indexRef.current++;
      setLines((prev) => {
        const next = [...prev, { ts: timestamp(), level: entry.level, msg: entry.msg }];
        if (next.length > MAX_LINES) return next.slice(-MAX_LINES);
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div
      ref={termRef}
      className="border border-rule-2 bg-[#1a1a1e] font-mono text-[10px] leading-[1.7] tracking-[0.01em] overflow-hidden relative rounded-sm"
      style={{
        padding: "6px 0",
        height: "168px",
        maskImage:
          "linear-gradient(180deg, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)",
      }}
      aria-hidden="true"
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-1.5 px-3 pb-1.5 mb-1 border-b border-[#2a2a2e]">
        <span className="w-[7px] h-[7px] rounded-full bg-[#ff5f57] opacity-70" />
        <span className="w-[7px] h-[7px] rounded-full bg-[#febc2e] opacity-70" />
        <span className="w-[7px] h-[7px] rounded-full bg-[#28c840] opacity-70" />
        <span className="ml-2 text-[9px] text-[#666] tracking-[0.08em]">
          veridium — studio.log
        </span>
      </div>
      {lines.map((line, i) => (
        <div
          key={`${line.ts}-${i}`}
          className="flex gap-0 whitespace-nowrap px-3 py-px hover:bg-[#ffffff06]"
        >
          <span className="text-[#555] shrink-0 w-[62px]">{line.ts}</span>
          <span
            className={`shrink-0 w-[52px] ${LEVEL_COLORS[line.level]}`}
          >
            [{line.level}]
          </span>
          <span className="text-[#b0b0b4] overflow-hidden text-ellipsis min-w-0">
            {line.msg}
          </span>
          {i === lines.length - 1 && (
            <span
              className="inline-block w-[5px] h-[10px] bg-[#b0b0b4] align-[-1px] ml-0.5"
              style={{ animation: "caret 1.05s steps(2) infinite" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
