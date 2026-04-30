import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-rule">
      {/* ===== DESKTOP ===== */}
      <div className="hidden min-[769px]:block pt-10 pb-14">
        <div className="flex items-end justify-between gap-10 overflow-hidden">
          <span
            className="font-sans font-medium leading-[0.85] overflow-hidden whitespace-nowrap min-w-0 flex-1"
            style={{
              fontSize: "clamp(64px, 15vw, 240px)",
              letterSpacing: "-0.06em",
              color: "transparent",
              WebkitTextStroke: "1px var(--rule-2)",
            }}
          >
            VERIDIUM
          </span>
          <div
            className="flex flex-col gap-2.5 shrink-0"
            style={{ paddingBottom: "clamp(10px, 2.2vw, 36px)" }}
          >
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="flex flex-col gap-1 no-underline text-ink group"
            >
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3 leading-none">
                Email
              </span>
              <span className="font-mono text-[13px] text-ink leading-tight group-hover:text-accent-ink">
                {siteConfig.social.email}{" "}
                <span className="inline-block ml-1 text-ink-3 group-hover:text-accent-ink group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250" style={{ transitionTimingFunction: "var(--ease-studio)" }}>
                  ↗
                </span>
              </span>
            </a>
            <a
              href={siteConfig.social.linkedin}
              className="flex flex-col gap-1 no-underline text-ink group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3 leading-none">
                LinkedIn
              </span>
              <span className="font-mono text-[13px] text-ink leading-tight group-hover:text-accent-ink">
                linkedin.com/veridium{" "}
                <span className="inline-block ml-1 text-ink-3 group-hover:text-accent-ink group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250" style={{ transitionTimingFunction: "var(--ease-studio)" }}>
                  ↗
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 pt-10 mt-6 border-t border-rule text-[12px] text-ink-3 max-[1080px]:grid-cols-2">
          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink mb-3.5 block">
              Studio
            </span>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              <li><Link href="/#fieldwork" className="hover:text-ink">About</Link></li>
              <li><Link href="/work" className="hover:text-ink">Work</Link></li>
              <li><Link href="/#method" className="hover:text-ink">Method</Link></li>
            </ul>
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink mb-3.5 block">
              Elsewhere
            </span>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              <li><a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a></li>
              <li><a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a></li>
            </ul>
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink mb-3.5 block">
              Colophon
            </span>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              <li>Set in Geist &amp; Geist Mono</li>
              <li>Hand-built, 2026</li>
              <li>&copy; Veridium Solutions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      {/* About first, then subdued contact links, then the big VERIDIUM
          wordmark anchored near the bottom. Copyright now lives in the
          fixed bottom bar (MobileBottomCTA). */}
      <div className="min-[769px]:hidden pt-8 pb-6">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent-ink block mb-3">
          About
        </span>
        <p className="m-0 mb-9 text-[15px] leading-[1.55] text-ink-2 max-w-[44ch]">
          Veridium is a two-person studio that works like a four-person team.
          Founded in 2024, we sit where strategy meets engineering — embedding
          with teams who already know their business and need a partner who
          can work across schema, pipeline, and P&amp;L without losing sight of
          any of them.
        </p>

        <div className="flex flex-col gap-0 mb-10 border-t border-dashed border-rule-2">
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="flex items-center justify-between py-3 border-b border-dashed border-rule-2 no-underline min-h-[44px] active:bg-paper-2"
          >
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3">
              Email
            </span>
            <span className="font-mono text-[12px] text-ink-2">
              {siteConfig.social.email}{" "}
              <span className="text-ink-3">↗</span>
            </span>
          </a>
          <a
            href={siteConfig.social.linkedin}
            className="flex items-center justify-between py-3 border-b border-dashed border-rule-2 no-underline min-h-[44px] active:bg-paper-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3">
              LinkedIn
            </span>
            <span className="font-mono text-[12px] text-ink-2">
              linkedin.com/veridium{" "}
              <span className="text-ink-3">↗</span>
            </span>
          </a>
        </div>

        <span
          className="font-sans font-medium leading-[0.85] block"
          style={{
            fontSize: "clamp(48px, 14vw, 80px)",
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: "1px var(--rule-2)",
          }}
        >
          VERIDIUM
        </span>
      </div>
    </footer>
  );
}
