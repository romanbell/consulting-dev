# Veridium Studio — Portfolio Site

Veridium is a two-person data and technology studio based in New York, founded in 2024 by Jeffrey Wang and Roman Bellisari. This repository contains the production portfolio site: a server-rendered, multi-route Next.js application designed to feel like work that came out of a serious design studio. The reference points are Studio Lin (typographic discipline, editorial rigor) and locomotive.ca (motion craft, scroll choreography).

## Local Development

```bash
pnpm install
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript strict check
```

Requires Node 20 LTS or later. Uses pnpm as the package manager.

## Branch Strategy

This repo ships two versions of the site on two branches. See [BRANCHES.md](./BRANCHES.md) for the full delta.

| Branch   | Codename    | Description |
|----------|-------------|-------------|
| `main`   | Editorial   | Restrained motion. Static chip cloud, crosshair cursor in hero only, no custom cursor, no terminal. The "respectable" version. |
| `motion` | Kinetic     | Full motion. 3-row marquee, hero terminal, custom cursor with magnetic CTAs, page transitions. |

Both branches share the same content (`lib/`), routing, IA, SEO config, and accessibility floor.

## Design Token Table

All tokens are CSS custom properties defined in `app/globals.css` under `:root`, consumed by Tailwind v4 via `@theme`.

| Token | Value | Usage |
|-------|-------|-------|
| `--paper` | `#F3F0E8` | Primary background |
| `--paper-2` | `#EDE9DF` | Secondary background (cards, hovers) |
| `--ink` | `#17171A` | Primary text |
| `--ink-2` | `#45454A` | Secondary text |
| `--ink-3` | `#8A8A8E` | Tertiary text, labels |
| `--rule` | `#D9D4C6` | Primary dividers |
| `--rule-2` | `#C8C2B0` | Secondary dividers (dashed) |
| `--accent` | `oklch(0.62 0.07 180)` | Accent color (teal), dots, indicators |
| `--accent-ink` | `oklch(0.48 0.08 180)` | Accent for text (darker teal) |
| `--ease-studio` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Universal easing curve |

## Motion Principles

- **Easing**: `cubic-bezier(0.2, 0.7, 0.2, 1)` everywhere, defined as `--ease-studio` in CSS.
- **Scroll reveals**: 900ms duration, 10px translateY, fade in. Children stagger by 70ms.
- **Line-draw rules**: 1200ms, width 0 to 100%.
- **Hover underlines**: 350ms scaleX from left.
- **Reduced motion**: All non-essential animation is gated behind `prefers-reduced-motion: reduce`. Elements snap to their end state instantly. Tested.

## SEO Checklist

Before each deploy, verify:

- [ ] All routes return 200 and render full content in view-source
- [ ] `<title>` and `<meta name="description">` are set per-route
- [ ] Open Graph and Twitter Card meta tags present on all routes
- [ ] JSON-LD blocks present: Organization (home), WebSite (home), BreadcrumbList (work routes), CreativeWork (project pages)
- [ ] `sitemap.xml` enumerates all routes including project slugs
- [ ] `robots.txt` allows all crawlers including GPTBot, ClaudeBot, PerplexityBot
- [ ] Canonical URLs are correct
- [ ] No content is JS-only (all copy is in the server-rendered HTML)

## LLM Crawler Policy

The `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, and Google-Extended. This is intentional: the studio wants maximum discoverability by both traditional search engines and LLM-based retrieval systems.

## Decisions Log

1. **Tailwind v4 over v3**: v4 uses `@theme` for CSS variable integration, eliminating the need for a large `tailwind.config.ts`. Tokens live in CSS where they belong.
2. **Two branches (main/motion)**: Client requested A/B comparison of editorial vs. kinetic feel. Same content, different component layers. Diff is auditable.
3. **Lenis for smooth scroll**: Lightweight, well-maintained, provides the locomotive-style feel without the bundle weight of GSAP ScrollTrigger.
4. **Framer Motion over GSAP**: Better React integration, tree-shakeable, plays well with Server Components. Only loaded in client components that need it.
5. **No shadcn/ui**: The design language is too specific. Generic component libraries would fight the aesthetic. Primitives are simple enough to write from scratch.
6. **No CMS**: Content is colocated as TypeScript constants. Two-person studio does not need a CMS. Content changes are code changes with full type safety.
7. **Static generation for project pages**: `generateStaticParams` pre-renders all eight project routes at build time. Zero runtime cost for the most-crawled pages.
8. **distDir set to `.next-build`**: Local development workaround for a root-owned `.next` directory from a prior build. On Vercel, this can be changed back to `.next` or removed entirely.
9. **All content SSR-first**: Every word of copy appears in the initial HTML payload. Marquee, terminal, and hover plate hydrate on top of static content. A crawler sees everything.

## Deployment (Vercel)

1. Import project from GitHub
2. Framework preset: Next.js (auto-detected)
3. Build command: `pnpm build`
4. Output directory: `.next-build` (or remove `distDir` from `next.config.ts` for default)
5. Node.js version: 20.x
6. No environment variables required for the base build

All routes are statically generated at build time. No Edge or serverless functions needed for the core site.

## Browser Support

Last 2 versions of: Chrome, Firefox, Safari (16+), Edge. Tested on iOS Safari, Chrome Android.

Viewport range: 360px to 2560px.

## Credits

- **Veridium** — Jeffrey Wang, Roman Bellisari
- Set in **Geist** and **Geist Mono** by Vercel
- Built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lenis
- Hand-built, 2026
