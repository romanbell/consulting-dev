import { cn } from "@/lib/utils/cn";
import Link from "next/link";

export function CTA({
  children,
  href,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "default" | "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2.5 py-[11px] px-5 font-mono text-[12px] tracking-[0.04em] border rounded-full relative no-underline transition-all duration-200";

  const variants = {
    default:
      "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper hover:pr-[26px]",
    primary:
      "bg-ink text-paper border-ink hover:bg-paper hover:text-ink hover:border-ink",
    ghost:
      "bg-transparent text-ink-2 border-rule-2 hover:text-ink hover:border-ink",
  };

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="inline-block transition-transform duration-250" style={{ transitionTimingFunction: "var(--ease-studio)" }}>
          →
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      <span className="inline-block transition-transform duration-250" style={{ transitionTimingFunction: "var(--ease-studio)" }}>
        →
      </span>
    </Link>
  );
}
