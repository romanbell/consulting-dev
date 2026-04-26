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
    "inline-flex items-center gap-2 py-2 px-4 font-mono text-[11px] tracking-[0.03em] rounded-full relative no-underline transition-all duration-200 cta-btn";

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

  // Use inline styles for colors to beat the global a:hover rule
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: "transparent",
      color: "#17171A",
      border: "1px solid #17171A",
    },
    primary: {
      background: "#17171A",
      color: "#F3F0E8",
      border: "1px solid #17171A",
    },
    ghost: {
      background: "transparent",
      color: "#45454A",
      border: "1px solid var(--rule-2)",
    },
  };

  const style = variantStyles[variant] ?? variantStyles.default;

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, className)}
        style={style}
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
      className={cn(base, className)}
      style={style}
      data-magnetic
    >
      {inner}
    </Link>
  );
}
