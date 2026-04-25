import { cn } from "@/lib/utils/cn";

export function Lede({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-[52ch] text-ink-2 text-[14.5px] leading-[1.55]",
        className
      )}
    >
      {children}
    </p>
  );
}
