import { cn } from "@/lib/utils/cn";

export function Headline({
  children,
  level = 2,
  className,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}) {
  const Tag = `h${level}` as const;
  const sizes = {
    1: "text-[clamp(44px,5.2vw,84px)] font-light leading-[1.02] tracking-[-0.035em] max-w-[18ch]",
    2: "text-[36px] font-normal leading-[1.05] tracking-[-0.025em] max-w-[24ch]",
    3: "text-[24px] font-normal leading-[1.15] tracking-[-0.015em]",
  };

  return (
    <Tag
      className={cn(
        "font-sans text-ink m-0 text-balance",
        sizes[level],
        className
      )}
    >
      {children}
    </Tag>
  );
}
