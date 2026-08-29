import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
          }}
        >
          not found
        </h1>
        <Link
          href="/"
          style={{
            fontSize: 13,
            color: "var(--ink-soft)",
            borderBottom: "1px solid currentColor",
          }}
        >
          back
        </Link>
      </div>
    </main>
  );
}
