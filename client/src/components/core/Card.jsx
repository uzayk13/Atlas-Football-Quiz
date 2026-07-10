export function Card({ children, style, padded = true }) {
  return (
    <div
      style={{
        background: "var(--color-bg-surface)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--color-border)",
        padding: padded ? "var(--space-6)" : 0,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
