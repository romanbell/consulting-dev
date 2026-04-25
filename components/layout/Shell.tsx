import { cn } from "@/lib/utils/cn";

export function Shell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[var(--shell-max)] px-[var(--shell-px)] relative z-3",
        className
      )}
    >
      {children}
    </div>
  );
}
