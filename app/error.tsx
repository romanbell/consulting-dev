"use client";

import Link from "next/link";
import { Shell } from "@/components/layout/Shell";

export default function ErrorPage() {
  return (
    <Shell className="min-h-screen flex flex-col justify-center items-center text-center py-40">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3 mb-6">
        VRD–001 · System Error
      </div>
      <h1
        className="font-sans font-light text-ink m-0 mb-4"
        style={{
          fontSize: "clamp(48px, 8vw, 120px)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        Error
      </h1>
      <p className="text-ink-2 text-[15px] max-w-[40ch] mb-8">
        Something went wrong. The studio is investigating.
      </p>
      <Link
        href="/"
        className="font-mono text-[12px] tracking-[0.04em] border border-ink rounded-full px-5 py-[11px] text-ink hover:bg-ink hover:text-paper transition-colors duration-200"
      >
        return_to_index →
      </Link>
    </Shell>
  );
}
