import { cn } from "@/lib/utils/cn";

export function Micro({
  children,
  variant = "default",
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  variant?: "default" | "ink" | "mute" | "accent";
  className?: string;
  as?: "span" | "div" | "p";
}) {
  const colors = {
    default: "text-ink-2",
    ink: "text-ink",
    mute: "text-ink-3",
    accent: "text-accent-ink",
  };

  return (
    <Tag
      className={cn(
        "font-mono text-[10px] tracking-[0.14em] uppercase font-normal",
        colors[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}
