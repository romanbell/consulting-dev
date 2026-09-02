"use client";

// Home page implementing the Figma "veri-v2-vf" frames (desktop 1098:129,
// mobile 1098:155). Both frames are rendered and toggled at the 768px
// breakpoint, matching how the file defines two separate layouts.

import { Fragment, useEffect, useRef } from "react";

const CONTACT_MAILTO = "mailto:hello@veridium.studio";

const INFO_COPY =
  "Veridium is a small digital studio practice. We work across design and engineering, usually with teams that need a rough idea carried all the way to something running in production. Projects stay small on purpose, generally ranging between 3 and 9 months. We are based in New York, NY and Cambridge, MA, and have worked with teams all over the world.";

const DESKTOP_FOCUS_ROWS: string[][] = [
  [
    "AI Systems",
    "Interface and Visual Design",
    "Software Engineering",
    "Data Infrastructure",
  ],
  ["Digital Prototyping", "Machine Learning Systems", "Technical Strategy"],
];

const MOBILE_FOCUS = [
  { label: "AI Systems", left: 15, top: 375 },
  { label: "Technical Strategy", left: 91, top: 375 },
  { label: "Software Engineering", left: 15, top: 400 },
  { label: "Digital Prototyping", left: 149, top: 400 },
  { label: "Data Infrastructure", left: 269, top: 400 },
];

function Star() {
  return (
    <svg
      className="home-star"
      width="19.5039"
      height="19.4974"
      viewBox="0 0 19.5039 19.4974"
      fill="none"
      aria-hidden
    >
      <path
        d="M9.75197 0L10.6833 7.45439L16.1173 2.35161L12.1102 8.66965L19.5039 8.30628L12.4341 10.5317L18.328 15.0777L11.5022 12.1692L13.1391 19.4974L9.75197 12.816L6.36532 19.4974L8.0017 12.1692L1.17642 15.0777L7.07037 10.5317L0 8.30628L7.39369 8.66965L3.38665 2.35161L8.82064 7.45439L9.75197 0Z"
        fill="#686868"
      />
    </svg>
  );
}

// Cursor-following de-blur lens over the desktop wordmark. Two masked
// copies of the type sit above the veil: an outer ring that is half
// de-blurred and an inner core that is sharper but never fully crisp.
// Position and strength are eased every frame so the lens trails the
// cursor and dissolves on leave, which is what reads as the ripple.
//
// The same lens also runs autonomously: once shortly after load, and
// every 10-15s while the mouse is idle, it sweeps the mark diagonally
// as if dragged quickly from top-left to bottom-right.
const LENS_POS_EASE = 0.32;
const LENS_STRENGTH_EASE = 0.14;
const SWEEP_STRENGTH_EASE = 0.3;
const SWEEP_MS = 450;
const SWEEP_FROM = { x: 30, y: 30 };
const SWEEP_TO = { x: 795, y: 250 };
const SWEEP_LOAD_DELAY_MS = 600;
const SWEEP_INTERVAL_MIN_MS = 10000;
const SWEEP_INTERVAL_JITTER_MS = 5000;
const SWEEP_IDLE_MS = 3000;

function DesktopWordmark() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let running = false;
    let hasPos = false;
    let hovering = false;
    let lastMove = 0;
    let sweepStart: number | null = null;
    const cur = { x: 0, y: 0, s: 0 };
    const target = { x: 0, y: 0, s: 0 };

    function tick(now: number) {
      if (sweepStart !== null) {
        const p = Math.min(1, (now - sweepStart) / SWEEP_MS);
        target.x = SWEEP_FROM.x + (SWEEP_TO.x - SWEEP_FROM.x) * p;
        target.y = SWEEP_FROM.y + (SWEEP_TO.y - SWEEP_FROM.y) * p;
        target.s = Math.min(1, Math.sin(Math.PI * p) * 1.5);
        if (p >= 1) {
          sweepStart = null;
          target.s = 0;
        }
      }
      cur.x += (target.x - cur.x) * LENS_POS_EASE;
      cur.y += (target.y - cur.y) * LENS_POS_EASE;
      const sEase =
        sweepStart !== null ? SWEEP_STRENGTH_EASE : LENS_STRENGTH_EASE;
      cur.s += (target.s - cur.s) * sEase;
      el!.style.setProperty("--lx", `${cur.x.toFixed(1)}px`);
      el!.style.setProperty("--ly", `${cur.y.toFixed(1)}px`);
      el!.style.setProperty("--lens", cur.s.toFixed(3));
      const settled =
        Math.abs(target.s - cur.s) < 0.002 &&
        Math.hypot(target.x - cur.x, target.y - cur.y) < 0.5;
      if (settled && target.s === 0 && sweepStart === null) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function ensureRunning() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    }

    let pendingSweep = false;

    function startSweep() {
      // Skip while hovered or when the desktop layout is display:none.
      if (hovering || el!.offsetWidth === 0) return;
      // Hidden tabs pause rAF; run the sweep when the page is seen.
      if (document.visibilityState === "hidden") {
        pendingSweep = true;
        return;
      }
      sweepStart = performance.now();
      cur.x = SWEEP_FROM.x;
      cur.y = SWEEP_FROM.y;
      cur.s = 0;
      hasPos = true;
      ensureRunning();
    }

    function onVisibility() {
      if (document.visibilityState === "visible" && pendingSweep) {
        pendingSweep = false;
        setTimeout(startSweep, 300);
      }
    }

    function onMove(e: MouseEvent) {
      sweepStart = null;
      hovering = true;
      const r = el!.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!hasPos) {
        cur.x = target.x;
        cur.y = target.y;
        hasPos = true;
      }
      target.s = 1;
      ensureRunning();
    }

    function onLeave() {
      hovering = false;
      target.s = 0;
      ensureRunning();
    }

    function onWindowMove() {
      lastMove = performance.now();
    }

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    function scheduleNext() {
      idleTimer = setTimeout(
        () => {
          if (performance.now() - lastMove > SWEEP_IDLE_MS) startSweep();
          scheduleNext();
        },
        SWEEP_INTERVAL_MIN_MS + Math.random() * SWEEP_INTERVAL_JITTER_MS,
      );
    }

    let loadTimer: ReturnType<typeof setTimeout> | undefined;
    if (!reduceMotion) {
      loadTimer = setTimeout(startSweep, SWEEP_LOAD_DELAY_MS);
      scheduleNext();
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onWindowMove);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onWindowMove);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(loadTimer);
      clearTimeout(idleTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="home-mark" ref={ref}>
      <div className="home-mark__rect" aria-hidden />
      <h1 className="home-mark__text">Veridium</h1>
      <div className="home-mark__veil" aria-hidden />
      <div className="home-mark__lens home-mark__lens--outer" aria-hidden>
        <span>Veridium</span>
      </div>
      <div className="home-mark__lens home-mark__lens--inner" aria-hidden>
        <span>Veridium</span>
      </div>
    </div>
  );
}

function MobileWordmark() {
  return (
    <div className="home-mark">
      <div className="home-mark__rect" aria-hidden />
      <h1 className="home-mark__text">Veridium</h1>
      <div className="home-mark__veil" aria-hidden />
    </div>
  );
}

export default function Home() {
  return (
    <div className="home">
      <section className="home-desktop" aria-label="Veridium">
        <DesktopWordmark />

        <h2 className="home-heading" style={{ top: 344 }}>
          Our Info
        </h2>
        <p className="home-body">{INFO_COPY}</p>

        <h2 className="home-heading" style={{ top: 530 }}>
          Our Focus
        </h2>
        {DESKTOP_FOCUS_ROWS.map((row, r) => (
          <div key={r} className="home-focus-row" style={{ top: r === 0 ? 569 : 611 }}>
            {row.map((label, i) => (
              <Fragment key={label}>
                {i > 0 && <Star />}
                <span>{label}</span>
              </Fragment>
            ))}
          </div>
        ))}

        <h2 className="home-heading" style={{ top: 684 }}>
          Our Work
        </h2>
        <span className="home-msg">Shoot us a msg to learn more about our work</span>
        <a className="home-cta" href={CONTACT_MAILTO}>
          get in touch
        </a>
      </section>

      <section className="home-mobile" aria-label="Veridium">
        <MobileWordmark />

        {/* Offset wrapper: shifts all content down by however much the
            vw-scaled wordmark exceeds its 393px-frame height, so wide
            phones never overlap. At 393px wide the offset is zero. */}
        <div className="home-mobile-flow">
          <h2 className="home-heading" style={{ top: 164 }}>
            Our Info
          </h2>
          <p className="home-body">{INFO_COPY}</p>

          <h2 className="home-heading" style={{ top: 362 }}>
            Our Focus
          </h2>
          {MOBILE_FOCUS.map((f) => (
            <span key={f.label} className="home-focus" style={{ left: f.left, top: f.top }}>
              {f.label}
            </span>
          ))}

          <h2 className="home-heading" style={{ top: 486 }}>
            Our Work
          </h2>
          <span className="home-msg">Shoot us a msg to learn more about our work</span>
          <a className="home-cta" href={CONTACT_MAILTO}>
            get in touch
          </a>
        </div>
      </section>
    </div>
  );
}
