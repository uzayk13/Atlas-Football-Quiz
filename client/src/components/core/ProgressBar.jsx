export function ProgressBar({ value, max = 10 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      style={{
        width: "100%",
        height: 12,
        background: "var(--cream-200)",
        borderRadius: "var(--radius-pill)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "var(--color-brand-primary)",
          borderRadius: "var(--radius-pill)",
          transition: `width var(--duration-med) var(--ease-out)`,
        }}
      />
    </div>
  );
}
