import { Micro } from "@/components/typography/Micro";
import { Headline } from "@/components/typography/Headline";
import { METHOD_STEPS } from "@/lib/content/method";
import { GLYPH_MAP } from "./MethodGlyphs";

export function Method() {
  return (
    <section
      id="method"
      className="grid gap-12"
      style={{
        gridTemplateColumns: "140px 1fr",
        padding: "104px 0",
      }}
    >
      <div>
        <Micro variant="accent">§ 03 — Method</Micro>
      </div>
      <div>
        <Headline className="mb-12">
          Four movements, from <span className="text-accent-ink">question</span>{" "}
          to system.
        </Headline>
        <div className="grid grid-cols-4 gap-0 border-t border-ink max-[1080px]:grid-cols-2">
          {METHOD_STEPS.map((step, i) => {
            const Glyph = GLYPH_MAP[step.glyphId];
            return (
              <div
                key={step.n}
                className="border-r border-b border-rule p-5 pb-[110px] relative min-h-[240px] transition-colors duration-250 hover:bg-paper-2"
                style={{
                  borderRightWidth: (i + 1) % 4 === 0 ? 0 : undefined,
                }}
              >
                <div className="font-mono text-[10px] text-ink-3 tracking-[0.12em]">
                  {step.n} / {step.code}
                </div>
                <h3 className="font-sans font-medium text-[17px] tracking-[-0.01em] my-2 mx-0">
                  {step.title}
                </h3>
                <p className="m-0 text-ink-2 text-[13px] leading-[1.5]">
                  {step.body}
                </p>
                <div
                  className="absolute bottom-[22px] left-5 text-ink"
                  aria-hidden="true"
                >
                  <Glyph />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
