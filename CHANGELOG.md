# Changelog

## 2.0.0 — 2026-04-25

Complete rebuild from scratch. New stack, new architecture, new design system.

### Added
- Next.js 15 (App Router) with React 19 and TypeScript strict mode
- Tailwind CSS v4 with CSS variable design token layer
- Geist + Geist Mono via `next/font` (zero-CLS, self-hosted)
- Framer Motion for scroll reveals and component animations
- Lenis for smooth scroll
- Multi-route architecture: `/`, `/work`, `/work/[slug]`, `/studio`, `/method`, `/contact`
- Static generation for all routes via `generateStaticParams`
- Full SEO layer: per-route metadata, JSON-LD (Organization, WebSite, BreadcrumbList, CreativeWork), sitemap, robots
- Explicit LLM crawler allowlist (GPTBot, ClaudeBot, PerplexityBot)
- Eight project detail pages with framing, approach, stack justification, and reflection
- Design system primitives: Shell, Nav, Footer, StatusBar, Micro, Headline, Lede, Rule, Callsign, CTA
- Motion components: Reveal, IndexFAB, HoverPlate, SmoothScroll, LiveClock
- Two-branch strategy: `main` (Editorial) and `motion` (Kinetic)
- WCAG 2.1 AA accessibility: skip link, focus styles, aria labels, semantic HTML, reduced motion support
- `humans.txt`, custom 404, custom error page

### Fixed
- Typo in source copy: "quietly fail.t data initiatives quietly fail." corrected to "quietly fail."
- All content now server-rendered (previous site had discoverability issues from client-side-only rendering)

### Removed
- Previous Next.js project (Pages Router, client-rendered)
- npm in favor of pnpm
