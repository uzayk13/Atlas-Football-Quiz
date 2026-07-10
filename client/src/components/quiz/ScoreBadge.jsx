export function ScoreBadge({ score, total, size = "md" }) {
  const big = size === "lg";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 6,
        padding: big ? "12px 28px" : "6px 16px",
        borderRadius: "var(--radius-pill)",
        background: "var(--color-accent-gold)",
        color: "var(--color-on-accent-gold)",
      }}
    >
      <span style={{ font: big ? "var(--text-display-lg)" : "var(--text-display-sm)" }}>{score}</span>
      <span style={{ font: big ? "var(--text-body-lg)" : "var(--text-body-sm)", opacity: 0.75 }}>/ {total}</span>
    </div>
  );
}
