"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

interface Line {
  id: number;
  ts: string;
  level: LogLevel;
  msg: string;
}

let lineId = 0;

export function HeroTerminal() {
  const reduced = useReducedMotion();
  const termRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>(() => {
    const seed: Line[] = [];
    for (let i = 0; i < 5; i++) {
      const entry = LOG_ENTRIES[i];
      if (entry) seed.push({ id: lineId++, ts: "00:00:00", level: entry.level, msg: entry.msg });
    }
    return seed;
  });
  const indexRef = useRef(5);
  const newestIdRef = useRef(-1);

  const addLine = useCallback(() => {
    const i = indexRef.current % LOG_ENTRIES.length;
    const entry = LOG_ENTRIES[i];
    if (!entry) return;
    indexRef.current++;
    const newId = lineId++;
    newestIdRef.current = newId;
    setLines((prev) => {
      const next = [...prev, { id: newId, ts: timestamp(), level: entry.level, msg: entry.msg }];
      if (next.length > MAX_LINES) return next.slice(-MAX_LINES);
      return next;
    });
  }, []);

  useEffect(() => {
    if (reduced) return;

    // Fix seed timestamps
    setLines((prev) => prev.map((line) => ({ ...line, ts: timestamp() })));

    const interval = setInterval(addLine, 1800);
    return () => clearInterval(interval);
  }, [reduced, addLine]);

  return (
    <div
      ref={termRef}
      className="border border-rule-2 bg-paper-2 font-mono text-[10px] leading-[1.7] tracking-[0.01em] overflow-hidden relative rounded-sm"
      style={{
        padding: "8px 0",
        height: "168px",
        maskImage:
          "linear-gradient(180deg, transparent 0, black 8px, black calc(100% - 8px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent 0, black 8px, black calc(100% - 8px), transparent 100%)",
      }}
      aria-hidden="true"
    >
      {lines.map((line, i) => {
        // Only animate the newest line (the one just added)
        const isNewest = line.id === newestIdRef.current;
        return (
          <div
            key={line.id}
            className="flex gap-0 whitespace-nowrap px-3 py-px"
            style={isNewest ? { animation: "ht-in 0.45s ease forwards" } : undefined}
          >
            <span className="text-ink-3 shrink-0 w-[62px]">{line.ts}</span>
            <span className={`shrink-0 w-[52px] ${LEVEL_COLORS[line.level]}`}>
              [{line.level}]
            </span>
            <span className="text-ink overflow-hidden text-ellipsis min-w-0">
              {line.msg}
            </span>
          </div>
        );
      })}
    </div>
  );
}
