# Branch Differences: `main` (Editorial) vs. `motion` (Kinetic)

Both branches share the same content (`lib/`), routing, IA, SEO configuration, accessibility floor, and core layout components. The differences are confined to the motion and interaction layers.

## Summary

| Feature | `main` (Editorial) | `motion` (Kinetic) |
|---------|--------------------|--------------------|
| Hero layout | 3-column with spec col | 2-column (no spec col) |
| Hero terminal | Not present | Live studio log with typewriter stream |
| Toolchain display | Static filterable chip cloud | 3-row infinite marquee (hover-pause) |
| Cursor | Crosshair in hero only | Custom disc cursor + trail + magnetic CTAs |
| CTA hover | Standard hover states | Magnetic lerp toward cursor |
| Method glyphs | Static with hover animation | Scroll-linked motion |
| Page transitions | None | Fade/wipe on internal navigation |
| Body cursor | Default system cursor | `cursor: none` with custom cursor component |

## File-by-File Deltas

### Added in `motion` branch only

- `components/motion/HeroTerminal.tsx` — Streaming studio log with randomized entries, ok/info/warn levels, auto-scroll, typewriter effect. SSR renders final state; hydration replaces with animated version.
- `components/motion/ToolchainMarquee.tsx` — 3-row infinite marquee. Rows 1+3 scroll left, row 2 scrolls right. Hover pauses all rows. `prefers-reduced-motion` fallback renders static grid.
- `components/motion/CustomCursor.tsx` — 14px disc cursor with 0.28 lerp. Hover state expands to 56px, text state to 84px. Magnetic effect on `[data-magnetic]` elements. Label slot for context text.

### Modified in `motion` branch

- `components/home/Hero.tsx` — Removed spec column, added terminal block. Changed to 2-column grid. Added `data-magnetic` attribute to CTA buttons.
- `components/home/Toolchain.tsx` — Replaced `<ToolchainChips>` with `<ToolchainMarquee>`.
- `app/layout.tsx` — Added `<CustomCursor>` component. Added `cursor: none` to body styles.
- `app/globals.css` — Added marquee keyframes, cursor styles, magnetic CTA `will-change` hints.

### Unchanged across both branches

- All files in `lib/` (content, SEO, motion utilities)
- All files in `app/` routes except `layout.tsx`
- `components/layout/` (Shell, Nav, Footer, StatusBar)
- `components/typography/` (Micro, Headline, Lede, Rule, Callsign)
- `components/ui/` (CTA)
- `components/motion/Reveal.tsx`, `IndexFAB.tsx`, `HoverPlate.tsx`, `LiveClock.tsx`, `SmoothScroll.tsx`
- Configuration files (next.config.ts, tsconfig.json, package.json, etc.)
- SEO files (sitemap.ts, robots.ts, JSON-LD builders)

## What to Evaluate

When comparing the two branches:

1. **Hero impact**: Does the terminal add energy or noise? Does the spec column add rigor or clutter?
2. **Toolchain readability**: Is the marquee more engaging than the chip cloud, or does it sacrifice scannability?
3. **Cursor feel**: Does the custom cursor add polish or create friction? Test on trackpad and mouse.
4. **Performance**: Compare Lighthouse scores. The motion branch loads more client JS.
5. **Accessibility**: Both branches must pass WCAG 2.1 AA. The motion branch adds more `aria-hidden` decorative elements.
