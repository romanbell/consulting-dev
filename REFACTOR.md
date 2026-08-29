# Veridium — Portfolio Design Brief

**For handoff to Claude Design.** Single-page studio portfolio. Reference: Beckmans Examensutställning 2024 (`beckmans.college/2024`), a graduate-show site that treats the page as a working spreadsheet. Credits: Reidar Pritzel, Caroline Hällersjö, Mauritz Larsson, Ludvig Wänelöf. Curated by HOVERSTAT.ES with the tags **stretch / layout / row**.

This brief translates that reference into a build for a two-person studio with almost no static image assets. Color and structure carry the visual load.

> **Grounding note.** The live reference could not be machine-read (robots-blocked, headless browser unavailable). Specifics marked `[verified]` come from the curator writeup, the site credits, or the designers' other shipped work. Specifics marked `[inferred]` are genre convention or my design decision. Treat the numbers as a coherent system to build, not as measurements lifted from the original.

---

## 0. The concept in one line

Veridium is presented as a single living spreadsheet of the studio's output. Every project, experiment, object, and piece of writing is a **row**. Hovering or tapping a row makes it **stretch** open in place to reveal the work. The chrome is office-software chrome: column headers, sheet tabs, a status bar, cell references. Played straight, with real typographic discipline, it reads as confident and strange rather than cute.

**Why this fits Veridium:** no hero image required, the grid is the composition, and the data model is expandable so the studio can keep adding rows without redesigning anything.

---

## 1. What the reference actually does

`[verified]` The site "perverts the traditionally boring language of spreadsheets" into an "office-adjacent exhibition site." Interaction signature is tagged **stretch / layout / row**.

`[verified]` The credited team's other work (Reidar Pritzel especially) repeatedly uses archive/index interfaces: filterable document lists, text-view toggles, large editorial type, label/value metadata pairs, CMS-driven row data. This is a house style, not a one-off.

`[inferred]` Mechanics this genre uses, which this brief adopts:

- A master table of all entries. Left-most narrow column is a row number or index. Remaining columns are name/title, category, context, year, and a status/expand affordance.
- Hairline gridlines (1px, low opacity) so the whole page reads as cells.
- A row expands by animating its height; siblings push down. One open at a time.
- Persistent top bar (wordmark + sheet tabs + search) and bottom **status bar** (item count, active filter, a live cell-range readout, a clock).
- Monospace type for "data" (metadata, headers, status bar). A tighter grotesque for display (the big clickable names).
- Restrained surface (paper white, near-black ink) with one or more saturated accents reserved for selection, active state, and category tagging.

---

## 2. Foundations

### 2.1 Color tokens

Default theme is **warm paper + near-black ink + one signal accent**, with category accents used as conditional formatting on tags. Sharp corners, hairline borders.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F3F0E9` | Page background |
| `--surface` | `#FBF9F3` | Sticky header, status bar, expanded drawer background |
| `--ink` | `#161514` | Primary text, gridlines at low alpha |
| `--ink-muted` | `#6E6B64` | Metadata, column headers, inactive cells |
| `--hairline` | `rgba(22,21,20,0.14)` | All cell borders / gridlines |
| `--hairline-strong` | `rgba(22,21,20,0.55)` | Header underline when scrolled/stuck |
| `--accent` | `#FF3D00` | Signal: links, active row, focus ring, expand marker |
| `--accent-wash` | `rgba(255,61,0,0.07)` | Row hover / open-row background tint |
| `--select` | `#1C5BFF` | Optional "active cell" outline (spreadsheet selection feel) |

**Category (tag) colors** — used at ~14% as chip background with full-strength text. This is where the palette gets loud without any imagery.

| Category | Color | Chip bg |
|---|---|---|
| Client / Work | `#1C5BFF` | `rgba(28,91,255,0.14)` |
| Experiment / R&D | `#FF3D00` | `rgba(255,61,0,0.14)` |
| Writing / Editorial | `#16B364` | `rgba(22,179,100,0.14)` |
| Hardware / Object | `#8A5CF6` | `rgba(138,92,246,0.14)` |
| Identity / Brand | `#E8A400` | `rgba(232,164,0,0.14)` |

**Alternate primary accents** (swap `--accent` and `--accent-wash` to re-theme; keep everything else): Kagu-orange, electric blue `#1C5BFF`, acid green `#9BE800`, ultramarine `#1B17C9`. The system is built so one variable change re-skins the site.

**Optional dark sheet:** invert to `--paper: #14130F`, `--surface: #1C1A15`, `--ink: #EFEBDF`, hairlines at white 14%. Same accents. Treat as a `[data-theme]` toggle styled as a spreadsheet view-mode switch, not a generic dark mode.

### 2.2 Type families

Two families. Buy the premium ones if budget allows; the fallbacks are real, not placeholders.

- **Grotesque (display + names):** ABC Diatype or Söhne ideal. Practical default: **Inter** (you already run it), weight 400–550. This is the big clickable type.
- **Mono (data, headers, status, metadata):** **JetBrains Mono** (you use it on Flipr) or Geist Mono. Premium upgrade: Berkeley Mono. Used uppercase for headers and status bar.

Load as variable fonts, subset to Latin, `font-display: swap`.

### 2.3 Spacing, border, radius

- Base unit 4px. Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- Radius: **0** everywhere except chips, which may use 2px. Sharp corners are load-bearing for the concept.
- Borders: 1px `--hairline`. The page is edge-to-edge gridlines; no rounded cards, no drop shadows except one optional 1px stuck-header shadow.

---

## 3. Type scale (the part that matters)

Fluid via `clamp()` so the same tokens serve mobile and desktop. Desktop column = the clamp ceiling, mobile column = the floor. Tracking and line-height are specified because they are where this either reads as a precise object or reads as a Bootstrap table.

| Token | Family | clamp(size) | Desktop | Mobile | Line-height | Tracking | Weight | Notes |
|---|---|---|---|---|---|---|---|---|
| Masthead / wordmark | Grotesque | `clamp(44px, 9vw, 132px)` | 132px | 44px | 0.92 | -0.03em | 500 | Top-left, can run nearly full-bleed |
| Display L (section / open-row title) | Grotesque | `clamp(26px, 4.2vw, 44px)` | 44px | 26px | 1.0 | -0.02em | 500 | Title inside an expanded drawer |
| **Row title** (collapsed name) | Grotesque | `clamp(20px, 3.2vw, 30px)` | 30px | 20px | 1.05 | -0.01em | 450 | The signature size. Bumps to 500 on hover |
| Body / drawer prose | Grotesque | `clamp(15px, 1.6vw, 17px)` | 17px | 15px | 1.45 | 0 | 400 | Max measure 62ch inside drawer |
| Mono cell (metadata in row) | Mono | `clamp(12px, 1.3vw, 13px)` | 13px | 12px | 1.3 | 0 | 400 | Year, context, category text |
| Column header | Mono | `clamp(11px, 1.2vw, 12px)` | 12px | 11px | 1.2 | 0.06em | 500 | UPPERCASE, `--ink-muted` |
| Status bar | Mono | `clamp(10px, 1.1vw, 11px)` | 11px | 10px | 1.2 | 0.04em | 400 | UPPERCASE, `--ink-muted` |
| Tag chip | Mono | 11px fixed | 11px | 11px | 1 | 0.04em | 500 | UPPERCASE, category color text |

**Rules:**
- Names are grotesque and large; everything that is "data about" the work is mono and small. The size jump between Row title (30px) and Mono cell (13px) is deliberate and should feel almost rude. Do not split the difference.
- Numbers (years, indices, counts) are always mono and tabular (`font-variant-numeric: tabular-nums`) so columns align perfectly.
- Never letter-space the grotesque positively. Never tighten the mono.

---

## 4. Layout & grid

### 4.1 Desktop (≥1024px)

Edge-to-edge table, gridlines touching the viewport edges. No outer max-width container; the table *is* the page.

Column model (CSS grid, fixed + flexible):

```
grid-template-columns:
  56px            /* [#] index */
  minmax(0,1fr)   /* Title (grotesque) */
  168px           /* Category (tag chip) */
  minmax(0,0.7fr) /* Context / client */
  96px            /* Year */
  72px;           /* Status / expand glyph */
```

- Collapsed row height: **56px**, vertically centered cell content.
- Cell padding: `0 16px`. Index column padding `0 12px`, mono, `--ink-muted`.
- Sticky **header bar** (masthead + sheet tabs + search) at top. Sticky **column-header row** directly beneath it. Sticky **status bar** at the very bottom of the viewport.
- A faint vertical hairline between every column. Horizontal hairline between every row. This is the only "texture" the site needs.

### 4.2 Mobile (<768px)

The six-column table cannot survive on a phone. Collapse to a **stacked row** that keeps the spreadsheet logic:

- Each row is a single tappable block, 64px tall collapsed.
- Line 1: Row title (grotesque, 20px) on the left; year (mono, 12px) right-aligned.
- Line 2: index + category chip + context, all mono 11–12px, in a single muted line.
- Keep the left index column as a narrow 40px gutter with a hairline, so it still reads as a sheet.
- Column-header row is hidden on mobile; instead the sheet-tab bar and a horizontal-scrolling filter strip stay sticky at top. Status bar stays sticky at bottom (shortened: item count + filter only).
- Tap target minimum 48px. The whole row is the target.

### 4.3 The chrome

**Top bar (sticky):**
- Left: `VERIDIUM` wordmark (Masthead token; on scroll past ~120px it can shrink to ~40% size and tuck into the bar, animated, optional).
- Center/left: **sheet tabs** styled like spreadsheet tabs along the bottom edge of the bar: `All · Work · Experiments · Writing · Info`. Active tab has a 2px `--accent` bottom border and full ink; others muted. These filter the same table in place.
- Right: **search/filter cell** that looks like an editable spreadsheet cell (hairline box, blinking caret, mono). Typing filters rows live.

**Status bar (sticky, bottom):**
- Left: item count, e.g. `24 ROWS` / when filtered `8 OF 24 ROWS · WORK`.
- Center: live **cell-range readout** tied to scroll position, e.g. `A07:F12` (cosmetic but on-concept; compute from first/last visible row indices).
- Right: a running clock `CET 14:02:55` updating each second, mono, tabular.

---

## 5. Components

1. **Masthead** — wordmark, optional shrink-on-scroll.
2. **Sheet-tab bar** — category filters as tabs.
3. **Search cell** — live text filter, cell-styled.
4. **Column-header row** — sortable, sticky (desktop only).
5. **Index row (collapsed)** — the default state of every entry.
6. **Drawer (expanded row)** — the project view, inline.
7. **Tag chip** — category, color-coded conditional formatting.
8. **Status bar** — counts, cell-range, clock.
9. **Info sheet** — studio statement + people + services + contact, laid out as label/value cells.
10. **Custom cell-cursor** — optional crosshair reticle on the table (Section 6.4).

---

## 6. Motion design

Centralize these as tokens. The whole personality lives here.

```
--ease-expand:   cubic-bezier(0.22, 1, 0.36, 1);   /* expo-out, soft-mechanical */
--ease-collapse: cubic-bezier(0.4, 0, 0.2, 1);
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--dur-expand:   480ms;
--dur-collapse: 320ms;
--dur-hover:    160ms;
--dur-underline:200ms;
--stagger-row:  35ms;
```

### 6.1 The row stretch (the centerpiece)

On expand:
- Row height animates open over `--dur-expand` with `--ease-expand`. **Preferred technique:** animate `grid-template-rows: 0fr → 1fr` on the drawer wrapper (smooth, no JS height measurement). Fallback: measure `scrollHeight` in JS and animate `height`. Avoid `max-height` keyframes that ease badly.
- Siblings below are pushed down by the same animation (they are in normal flow, so this is free).
- The **row title scales up** from 30px to ~36px (desktop) as it opens, and weight shifts 450→500, tracking -0.01em→-0.02em. Animate via `transform: scale()` on the text or a font-size transition (test both; scale is cheaper).
- A **3px `--accent` left border** wipes in top-to-bottom over 220ms.
- Row background fades to `--accent-wash` over `--dur-hover`.
- The index cell's number swaps to an **expand glyph** (e.g. `+` → `−`, or a filled square) with a 120ms cross-fade.
- Drawer contents fade and rise 8px (`opacity 0→1`, `translateY(8px→0)`) starting 80ms into the expand, so content arrives after the space opens, not during.

On collapse: reverse, faster (`--dur-collapse`, `--ease-collapse`). Content fades first (120ms), then height closes.

**Accordion rule:** opening a row collapses any other open row in the same gesture. Their animations overlap (one closing while one opens) and that overlap is the satisfying part. Do not queue them sequentially.

### 6.2 Desktop interaction model

- **Hover-to-peek + click-to-pin.** Hovering a row opens it; leaving collapses it. Clicking pins it open (stays open after the cursor leaves) and updates the URL to `/work/<slug>` for deep-linking. Clicking again, or opening another, unpins. A pinned row gets the `--select` 2px outline.
- This gives the page constant motion as the cursor travels, which is the whole appeal of the reference, while still supporting linking and slower readers.

### 6.3 Mobile interaction model

- **Tap-to-toggle accordion.** No hover. First tap opens (others close), tap header again to close. On open, smooth-scroll the row's top to just below the sticky bars so the drawer is fully visible.

### 6.4 Hover micro-details (desktop)

- **Row hover:** background → `--accent-wash` instantly-ish (`--dur-hover`); muted cells in that row go full `--ink`; title color stays ink but gains an accent underline that **draws in from the left** over `--dur-underline`.
- **Links / inline references:** same left-origin underline draw, accent color.
- **Column header hover:** cursor `pointer`, a sort caret (`▲`/`▼`) fades in, tiny mono tooltip `SORT BY YEAR`.
- **Tag chip hover:** chip background lifts from 14% to ~24% of its category color.
- **Custom cell-cursor (optional, high-payoff):** when the pointer is over the table, replace the cursor with a small crosshair/reticle that **snaps to the nearest cell's center or grid intersection**, reinforcing the spreadsheet metaphor. Hide the native cursor only over the table. Fall back to native cursor under `prefers-reduced-motion` or on touch.

### 6.5 Scroll behaviors

- **Sticky stack:** top bar, column-header row, and status bar all sticky. When the page scrolls past the masthead, the column-header row's bottom border thickens to `--hairline-strong` and an optional 1px shadow appears (transition 200ms).
- **Live cell-range:** the status-bar `A07:F12` readout recomputes from first/last visible row indices on scroll (throttle to animation frames).
- **Row enter animation:** as rows scroll into view, they fade + rise 10px with a `--stagger-row` (35ms) delay between consecutive rows, via IntersectionObserver. Keep subtle; one pass only, do not re-trigger on scroll-up.
- **No scroll-jacking.** Native scroll, lightly enhanced. In-page actions (clicking a filter, opening a deep link) use `scroll-behavior: smooth`.
- **Reduced motion:** disable stagger, row-scale, custom cursor, and shrink-on-scroll. Rows appear with a 1-frame opacity fade or instantly. Expand becomes a fast 150ms height change with no scale.

---

## 7. Pages / sheets

This is a single-page app; "pages" are sheet filters and expanded rows.

1. **Index (home, `All`)** — the master table, all rows.
2. **Sheet filters** — `Work`, `Experiments`, `Writing` filter the same table in place (animate filtered-out rows collapsing/removing with a quick 200ms fade + height).
3. **Project view** — an expanded drawer. Each has a clean route (`/work/<slug>`) that loads with that row pinned open and scrolled into view, so links and shares land correctly.
4. **Info sheet (`Info`)** — not a table of projects but a **label/value cell grid**:
   - Rows like `STUDIO`, `FOUNDED`, `LOCATION`, `PEOPLE`, `SERVICES`, `CLIENTS`, `CONTACT`, `SOCIAL`. Left column mono uppercase labels (`--ink-muted`), right column values in grotesque/mono as appropriate.
   - The two people (you + Jeffrey Wang) are two rows under `PEOPLE` with name + role + a contact link. Keep it as cells; do not break the metaphor with a bio card.
   - Contact email and socials are live cells. Email opens mail client; do not expose the address in a way that invites scraping if you care (optional obfuscation).

---

## 8. Drawer (project view) content model

Because assets are thin, the drawer is mostly typographic and still feels complete.

Layout inside an open row (desktop): two columns within the full table width.
- **Left (≈58%):** Display L title, then body prose (max 62ch), then a **label/value metadata block** in mono: `ROLE`, `YEAR`, `CONTEXT`, `STACK`, `STATUS`, `LINK`.
- **Right (≈42%):** media if it exists (1 image, or a short loop, or a link-preview). If no media: render a **mono/ASCII placeholder panel** (a bordered cell with the project slug, a generative pattern, or a small data table). Never an empty grey box.

Mobile: single column, title → prose → metadata → media/placeholder.

**Row data schema** (JSON/MDX/CMS-ready). Replace placeholders with real Veridium entries:

```json
{
  "id": "01",
  "title": "Project Name",
  "category": "Work",            // Work | Experiment | Writing | Object | Identity
  "context": "Client / Self",
  "year": 2025,
  "status": "Live",              // Live | WIP | Archived | Shipped
  "slug": "project-name",
  "summary": "One or two sentences. Plain. Specific.",
  "role": ["Design", "Development"],
  "stack": ["Next.js", "Tailwind"],
  "links": [{ "label": "Site", "href": "https://..." }],
  "media": []                    // optional; empty is fine
}
```

Provide 18 to 28 rows for the table to feel inhabited. Pad legitimately with experiments, writing, and objects (Kagu, music, photography work all qualify as rows), not with filler.

---

## 9. Asset substitution strategy (since you have few)

Generate visual interest from the system itself, in priority order:

1. **The grid.** Edge-to-edge hairlines are the primary texture. Spend effort making alignment perfect.
2. **Conditional formatting.** Category tag colors give a saturated, intentional palette with zero images.
3. **Scale contrast.** 30px grotesque names against 13px mono data is the main visual event.
4. **Mono diagrams / ASCII panels.** Use these as drawer media placeholders; they read as deliberate, not missing.
5. **One optional motif.** If you want a single graphic gesture, a tiny generative canvas (a cellular/grid noise, a plotter-style line) in the masthead corner is enough. Skip stock imagery entirely.

---

## 10. Accessibility & semantics

- Do **not** ship a literal `<table>` that breaks on mobile. Use a list of rows where each header is a `<button aria-expanded>` controlling a drawer region (or native `<details>`/`<summary>` if the animation can be driven from it). Visually it is a grid; semantically it is an expandable list.
- **Keyboard:** roving tab index across rows; `↑/↓` move between rows; `Enter`/`Space` toggle; `Esc` collapses the open row. `focus-visible` ring = 2px `--accent`.
- **Contrast:** `--ink` on `--paper` passes AA comfortably. `--ink-muted` (#6E6B64 on paper) is for non-essential metadata; keep anything essential at full `--ink`. Verify tag-chip text against its 14% background hits AA.
- **Motion:** honor `prefers-reduced-motion` everywhere (Section 6.5).
- **Custom cursor:** never the only affordance; rows are still obviously interactive without it.
- Alt text on the handful of real images. Decorative grid lines are CSS, not content.

---

## 11. Build notes for Claude Design

- Stack: React/Next.js + Tailwind v4 fits your existing toolchain; plain HTML/CSS/JS is also fine since the logic is light. Row data from a local JSON or MDX file to start; CMS later.
- **Grid alignment:** use one CSS grid for the header row and all data rows so columns line up exactly. CSS subgrid if drawers need to align to the same columns.
- **Expand animation:** prefer `grid-template-rows: 0fr → 1fr` on the drawer. Keep one row's state in a single source of truth (the open slug) so the accordion and the URL stay in sync.
- **Sticky stack:** test the three stacked sticky bars together; set explicit `top` offsets so the column-header row sticks beneath the top bar, not under it.
- **Fonts:** variable, subset, `swap`. Tabular numerals on all mono numbers.
- **No shadows, no radii** beyond what is specified. Resist the instinct to soften this.

### Build order

1. Tokens (color, type scale, spacing, motion) as CSS variables.
2. Static table: header bar, sheet tabs, column headers, collapsed rows, status bar. Get the grid and type sizing pixel-right before any motion.
3. Row expand/collapse with the full motion spec (Section 6.1), accordion behavior, deep-link routes.
4. Hover layer (Section 6.4), then scroll layer (Section 6.5).
5. Mobile collapse (Section 4.2) and reduced-motion paths.
6. Info sheet, search/filter, status-bar liveness (cell-range + clock).
7. Optional: custom cell-cursor, masthead shrink-on-scroll, dark sheet toggle.

---

## 12. Failure modes to avoid

- **Too few rows.** Three projects in this layout looks broken. Hit ~20 rows or change the concept.
- **Rounded corners or shadows.** They instantly turn this from "object" into "SaaS dashboard."
- **Splitting the type-size gap.** If names drift down toward 20px and data drifts up toward 16px, the whole tension collapses. Keep the jump violent.
- **Over-animating.** The row stretch and the live status bar are the show. Everything else stays at hover-speed (160ms) and quiet. Resist adding more.
- **Treating it as dark-mode-able generic UI.** The dark sheet is a view mode inside the metaphor, not a theme toggle bolted on.
