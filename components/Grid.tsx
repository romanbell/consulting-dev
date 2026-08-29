"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { INFO, ROWS, type Row } from "@/app/data";

const DESKTOP_RIGHT_COLS = 30;
const MOBILE_RIGHT_COLS = 9;
const TOTAL_DESKTOP_COLS = DESKTOP_RIGHT_COLS + 1;
const HOVER_FR = 1.3;
const MOBILE_BREAKPOINT_PX = 768;
const MOBILE_BAR_SIZE_PX = 120;
const MOBILE_BAR_INSET_PX = 32;

// Flicker animation: each tile runs its own independent schedule, with
// intervals that start short and grow longer (ease-out feel). Each tile
// has its own pulse that expands as it settles. The settled position is
// a freshly randomised column, so every page refresh lays the cells out
// in different spots.
const FLICKER_DURATION_MS = 1500;
const FLICKER_START_MIN = 38;
const FLICKER_START_MAX = 72;
const FLICKER_GROWTH_MIN = 1.18;
const FLICKER_GROWTH_MAX = 1.28;
const FLICKER_START_OFFSET_MAX = 70;

function randomDesktopCol() {
  return 2 + Math.floor(Math.random() * DESKTOP_RIGHT_COLS);
}

function buildGridCols(widerCol: number | null, fr = HOVER_FR) {
  const cols = ["minmax(140px, 20%)"];
  for (let c = 2; c <= TOTAL_DESKTOP_COLS; c++) {
    cols.push(c === widerCol ? `minmax(0, ${fr}fr)` : "minmax(0, 1fr)");
  }
  return cols.join(" ");
}

// Map a desktop column (2..31) to a mobile column (2..10). Spreads the
// 30 desktop slots across the 9 mobile slots so the flicker still shows
// position variety on a phone.
function mobileColFor(desktopCol: number): number {
  const idx = Math.floor(
    ((desktopCol - 2) / DESKTOP_RIGHT_COLS) * MOBILE_RIGHT_COLS,
  );
  return 2 + Math.max(0, Math.min(MOBILE_RIGHT_COLS - 1, idx));
}

export default function Grid() {
  const [open, setOpen] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 0.02}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // -------------------------------------------------------------- flicker
  const [flickerCols, setFlickerCols] = useState<number[] | null>(null);
  const [flickering, setFlickering] = useState(false);

  useEffect(() => {
    setFlickerCols(ROWS.map(() => randomDesktopCol()));
    setFlickering(true);
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function updateAt(i: number, col: number) {
      setFlickerCols((cur) => {
        if (!cur) return cur;
        const next = cur.slice();
        next[i] = col;
        return next;
      });
    }

    ROWS.forEach((_row, i) => {
      let t = Math.random() * FLICKER_START_OFFSET_MAX;
      let interval =
        FLICKER_START_MIN +
        Math.random() * (FLICKER_START_MAX - FLICKER_START_MIN);
      const growth =
        FLICKER_GROWTH_MIN +
        Math.random() * (FLICKER_GROWTH_MAX - FLICKER_GROWTH_MIN);

      while (t < FLICKER_DURATION_MS) {
        const delay = t;
        const id = setTimeout(() => updateAt(i, randomDesktopCol()), delay);
        timeouts.push(id);
        t += interval;
        interval *= growth;
      }

      // Settle at a freshly-random column so each refresh ends up in a
      // different layout. Stagger settle times slightly per tile.
      const settleDelay =
        FLICKER_DURATION_MS + 40 + Math.random() * 240;
      const settleId = setTimeout(
        () => updateAt(i, randomDesktopCol()),
        settleDelay,
      );
      timeouts.push(settleId);
    });

    // After all tiles have settled, drop out of flicker mode so the
    // transitions re-enable. We keep flickerCols populated, so the random
    // settled positions persist as the final layout.
    const cleanupId = setTimeout(
      () => setFlickering(false),
      FLICKER_DURATION_MS + 500,
    );
    timeouts.push(cleanupId);

    return () => {
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, []);

  // ---------------------------------------------------- Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (open) {
        e.preventDefault();
        setOpen(null);
        return;
      }
      if (infoOpen) {
        e.preventDefault();
        setInfoOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, infoOpen]);

  // ------------------------------------------------ cell hover widening
  // The widening is driven by hovering a cell itself (not the whole row
  // or cursor column). --grid-cols widens the hovered column for the
  // lines/header, and --hover-extra feeds the same fraction into the
  // bars' own left/width math so they stay locked to the grid.
  useEffect(() => {
    if (isMobile) setHoveredCol(null);
  }, [isMobile]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement.style;
    if (isMobile) {
      root.removeProperty("--grid-cols");
      root.removeProperty("--hover-extra");
      return;
    }
    root.setProperty("--grid-cols", buildGridCols(hoveredCol, HOVER_FR));
    root.setProperty(
      "--hover-extra",
      hoveredCol != null ? String(HOVER_FR - 1) : "0",
    );
  }, [hoveredCol, isMobile]);

  function handleBarEnter(col: number) {
    if (isMobile || flickering || open !== null) return;
    setHoveredCol(col);
  }

  function handleBarLeave() {
    setHoveredCol(null);
  }

  const toggle = useCallback((slug: string) => {
    setOpen((cur) => (cur === slug ? null : slug));
    setHoveredCol(null);
  }, []);

  return (
    <div className="page">
      <Lines mobile={isMobile} />

      <header className="page-row wordmark-row">
        <h1 className="wordmark">Veridium</h1>
        <button
          type="button"
          className="info-toggle"
          onClick={() => setInfoOpen((v) => !v)}
          aria-expanded={infoOpen}
          aria-controls="studio-info"
          data-open={infoOpen ? "true" : "false"}
        >
          {infoOpen ? "close" : "info"}
        </button>
      </header>

      <main className="rows" role="list">
        {ROWS.map((row, i) => {
          const col =
            flickerCols && flickerCols[i] != null ? flickerCols[i]! : row.col;
          return (
            <Item
              key={row.slug}
              row={row}
              col={col}
              flickering={flickering}
              isOpen={open === row.slug}
              hoveredCol={hoveredCol}
              onToggle={() => toggle(row.slug)}
              onBarEnter={handleBarEnter}
              onBarLeave={handleBarLeave}
            />
          );
        })}
      </main>

      <section
        className="info"
        id="studio-info"
        aria-label="Studio information"
        data-open={infoOpen ? "true" : "false"}
        aria-hidden={!infoOpen}
      >
        <button
          type="button"
          className="info-close"
          onClick={() => setInfoOpen(false)}
          aria-label="Close info"
        >
          ×
        </button>
        <div className="info__inner">
          <div className="info__list">
            {INFO.map((item) => (
              <div className="info__row" key={item.k}>
                <div className="info__k">{item.k}</div>
                <div className="info__v">
                  {item.href ? <a href={item.href}>{item.v}</a> : item.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Lines({ mobile }: { mobile: boolean }) {
  const count = mobile ? MOBILE_RIGHT_COLS : DESKTOP_RIGHT_COLS;
  return (
    <div className="lines" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="line"
          style={{ gridColumnStart: i + 2, gridColumnEnd: i + 3, gridRow: 1 }}
        />
      ))}
    </div>
  );
}

type ItemProps = {
  row: Row;
  col: number;
  flickering: boolean;
  isOpen: boolean;
  hoveredCol: number | null;
  onToggle: () => void;
  onBarEnter: (col: number) => void;
  onBarLeave: () => void;
};

function Item({
  row,
  col,
  flickering,
  isOpen,
  hoveredCol,
  onToggle,
  onBarEnter,
  onBarLeave,
}: ItemProps) {
  const colMobile = mobileColFor(col);
  const barRef = useRef<HTMLSpanElement | null>(null);

  // Marks the cell for ~2 close-phase durations so CSS can sequence the
  // close (height first, then slide back) without that transition also
  // applying to hover shifts.
  const [closing, setClosing] = useState(false);
  const wasOpen = useRef(isOpen);
  useEffect(() => {
    const closed = wasOpen.current && !isOpen;
    wasOpen.current = isOpen;
    if (!closed) return;
    setClosing(true);
    const id = setTimeout(() => setClosing(false), 480);
    return () => clearTimeout(id);
  }, [isOpen]);

  // On mobile, when the row opens, measure the cell's current viewport
  // position and write the target translate into the bar's --mob-tx and
  // --mob-ty so the CSS transitions animate it down then right.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const isMobileNow = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT_PX - 0.02}px)`,
    ).matches;
    if (!isMobileNow || !isOpen) {
      bar.style.removeProperty("--mob-tx");
      bar.style.removeProperty("--mob-ty");
      return;
    }
    // Wait one frame so React has finished applying the open-state CSS
    // before we read the cell's pre-flight rect.
    const id = requestAnimationFrame(() => {
      const current = barRef.current;
      if (!current) return;
      const rect = current.getBoundingClientRect();
      const targetX =
        window.innerWidth - MOBILE_BAR_INSET_PX - MOBILE_BAR_SIZE_PX;
      const targetY =
        window.innerHeight - MOBILE_BAR_INSET_PX - MOBILE_BAR_SIZE_PX;
      const tx = targetX - rect.left;
      const ty = targetY - rect.top;
      current.style.setProperty("--mob-tx", `${tx}px`);
      current.style.setProperty("--mob-ty", `${ty}px`);
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  const barStyle: CSSProperties = {
    ["--c" as string]: row.color,
    ["--col" as string]: String(col),
    ["--col-mobile" as string]: String(colMobile),
    // Hover math mirrors the grid template: columns after the widened
    // one shift by the extra fraction; the hovered cell itself widens.
    ["--extra-before" as string]:
      hoveredCol != null && hoveredCol < col ? String(HOVER_FR - 1) : "0",
    ["--self-fr" as string]: hoveredCol === col ? String(HOVER_FR) : "1",
  };

  // Clicking anywhere on the drawer collapses the row, unless the click
  // landed on selected text (so people can highlight the summary).
  function onDrawerClick() {
    if (!isOpen) return;
    const sel = window.getSelection();
    if (sel && sel.toString().length > 0) return;
    onToggle();
  }

  return (
    <article
      className="item"
      role="listitem"
      data-open={isOpen ? "true" : "false"}
    >
      <button
        type="button"
        className="item__head"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`drawer-${row.slug}`}
      >
        <span className="row__title" title={row.title}>
          {row.title}
        </span>
      </button>
      <div
        className="item__drawer"
        id={`drawer-${row.slug}`}
        aria-hidden={!isOpen}
        onClick={onDrawerClick}
      >
        <button
          type="button"
          className="drawer-close"
          onClick={onToggle}
          aria-label="Close"
          tabIndex={isOpen ? 0 : -1}
        >
          ×
        </button>
        <div className="drawer__content">
          <h2 className="drawer__title">{row.title}</h2>
          <div className="drawer__meta">{row.year}</div>
          <div className="drawer__body">
            <p>{row.summary}</p>
          </div>
        </div>
      </div>
      <span
        ref={barRef}
        className="bar"
        style={barStyle}
        data-flickering={flickering ? "true" : "false"}
        data-closing={closing ? "true" : "false"}
        onClick={onToggle}
        onMouseEnter={() => onBarEnter(col)}
        onMouseLeave={onBarLeave}
        aria-hidden
      />
    </article>
  );
}
