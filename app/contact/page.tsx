import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Micro } from "@/components/typography/Micro";
import { CTA } from "@/components/ui/CTA";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Veridium. Data engineering, AI systems, and technical consulting based in New York.",
};

export default function ContactPage() {
  return (
    <Shell>
      <Nav />
      <main id="main" className="py-20">
        <Micro variant="accent" className="block mb-6">
          § 05 — Correspondence
        </Micro>
        <h1
          className="font-sans font-light text-ink m-0 mb-12 max-w-[16ch] text-balance"
          style={{
            fontSize: "clamp(44px, 5.4vw, 92px)",
            letterSpacing: "-0.038em",
            lineHeight: 0.98,
          }}
        >
          Let&apos;s build <em className="not-italic text-accent-ink font-normal">something</em>.
        </h1>

        <div className="flex gap-3 flex-wrap mb-9">
          <CTA href={`mailto:${siteConfig.social.email}`} variant="primary">
            send_an_email
          </CTA>
          <CTA href={siteConfig.social.linkedin}>find_us_on_linkedin</CTA>
        </div>

        <div className="font-mono text-[11px] text-ink-3 tracking-[0.06em] flex gap-10 flex-wrap mb-14">
          <span>
            Email <strong className="text-ink font-normal">{siteConfig.social.email}</strong>
          </span>
          <span>
            Based in <strong className="text-ink font-normal">New York, NY</strong>
          </span>
          <span>
            Availability{" "}
            <strong className="text-accent-ink font-normal">Q3 2026 open</strong>
          </span>
        </div>

        <div className="grid grid-cols-4 gap-0 border-t border-rule max-[1080px]:grid-cols-2">
          {[
            {
              label: "Email",
              value: siteConfig.social.email,
              href: `mailto:${siteConfig.social.email}`,
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/veridium",
              href: siteConfig.social.linkedin,
            },
            {
              label: "GitHub",
              value: "github.com/veridium",
              href: siteConfig.social.github,
            },
            {
              label: "Location",
              value: "New York, NY",
              href: "#",
            },
          ].map((link, i, arr) => (
            <a
              key={link.label}
              href={link.href}
              className="flex flex-col gap-4.5 py-7 pr-6 no-underline text-ink relative transition-[padding] duration-300 hover:pl-3.5 group"
              style={{
                transitionTimingFunction: "var(--ease-studio)",
                borderRight: i < arr.length - 1 ? "1px solid var(--rule)" : "none",
              }}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span className="font-mono text-[10px] text-ink-3 tracking-[0.12em] uppercase">
                {link.label}
              </span>
              <span className="font-sans text-[17px] tracking-[-0.01em] text-ink group-hover:text-accent-ink transition-colors duration-200">
                {link.value}
              </span>
              <span className="font-mono text-[12px] text-ink-3 self-start group-hover:text-accent-ink group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-250" style={{ transitionTimingFunction: "var(--ease-studio)" }}>
                ↗
              </span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </Shell>
  );
}
