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
    "inline-flex items-center gap-2 py-2 px-4 font-mono text-[11px] tracking-[0.03em] border rounded-full relative no-underline transition-all duration-200";

  const variants = {
    default:
      "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper",
    primary:
      "bg-ink text-paper border-ink hover:bg-transparent hover:text-ink",
    ghost:
      "bg-transparent text-ink-2 border-rule-2 hover:text-ink hover:border-ink",
  };

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const inner = (
    <>
      {children}
      <span
        className="inline-block transition-transform duration-250"
        style={{ transitionTimingFunction: "var(--ease-studio)" }}
      >
        →
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], className)}
        target="_blank"
        rel="noopener noreferrer"
        data-magnetic
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      data-magnetic
    >
      {inner}
    </Link>
  );
}
