import Link from "next/link";

const NAV_ITEMS = [
  { n: "01", label: "Work", href: "/#manifest" },
  { n: "02", label: "Studio", href: "/#fieldwork" },
  { n: "03", label: "Method", href: "/#method" },
  { n: "04", label: "Contact", href: "/#contact" },
];

export function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="grid grid-cols-[1fr_auto] items-end border-t border-rule py-6 pb-6"
      style={{ padding: "28px 0 24px" }}
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 text-[15px] font-medium tracking-[0.22em] font-sans hover:text-ink"
      >
        <span
          className="inline-block h-[7px] w-[7px] rounded-full bg-accent"
          style={{
            boxShadow: "0 0 0 3px rgba(0,152,139,0.12)",
            animation: "pulse 3s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        VERIDIUM
      </Link>
      <ul className="flex gap-8 list-none p-0 m-0 text-[13px] text-ink-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.n}>
            <Link href={item.href} className="relative group">
              <span className="font-mono text-[9px] text-ink-3 mr-1.5 tracking-[0.08em]">
                {item.n}
              </span>
              {item.label}
              <span
                className="absolute left-0 right-0 -bottom-1.5 h-px bg-ink origin-left scale-x-0 transition-transform duration-350"
                style={{ transitionTimingFunction: "var(--ease-studio)" }}
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
