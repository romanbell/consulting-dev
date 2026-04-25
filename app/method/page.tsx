import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Micro } from "@/components/typography/Micro";
import { Headline } from "@/components/typography/Headline";
import { METHOD_STEPS } from "@/lib/content/method";
import { GLYPH_MAP } from "@/components/home/MethodGlyphs";

export const metadata: Metadata = {
  title: "Method",
  description:
    "Four movements from question to system. How Veridium approaches data and technology projects.",
};

export default function MethodPage() {
  return (
    <Shell>
      <Nav />
      <main id="main" className="py-20">
        <Micro variant="accent" className="block mb-4">
          § 03 — Method
        </Micro>
        <Headline level={1} className="mb-6 max-w-[22ch]">
          Four movements, from{" "}
          <span className="text-accent-ink">question</span> to system.
        </Headline>
        <p className="text-ink-2 text-[15px] max-w-[52ch] mb-16">
          Every project follows the same arc. The steps are consistent because
          the discipline is the point. What changes is the problem.
        </p>

        <div className="flex flex-col gap-0">
          {METHOD_STEPS.map((step, i) => {
            const Glyph = GLYPH_MAP[step.glyphId];
            return (
              <div
                key={step.n}
                className="grid gap-12 py-16 border-t border-rule"
                style={{ gridTemplateColumns: "80px 1fr 320px" }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="font-mono text-[10px] text-ink-3 tracking-[0.12em]">
                    {step.n}
                  </div>
                  <div className="text-ink" aria-hidden="true">
                    <Glyph />
                  </div>
                </div>
                <div>
                  <Micro variant="accent" className="block mb-2">
                    {step.code}
                  </Micro>
                  <h2 className="font-sans font-medium text-[28px] tracking-[-0.02em] m-0 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-[15px] leading-[1.6] text-ink-2 max-w-[52ch] m-0">
                    {step.body}
                  </p>
                </div>
                <div className="font-mono text-[11px] text-ink-3 leading-[1.8] pt-2">
                  Movement {String(i + 1).padStart(2, "0")} of 04
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </Shell>
  );
}
