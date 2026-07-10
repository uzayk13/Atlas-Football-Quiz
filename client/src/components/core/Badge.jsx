const POSITION_COLORS = {
  GK: { bg: "var(--gold-100)", fg: "var(--gold-600)", border: "var(--gold-300)" },
  DF: { bg: "var(--green-100)", fg: "var(--green-800)", border: "var(--green-300)" },
  MF: { bg: "#e5edfb", fg: "var(--navy-700)", border: "var(--navy-600)" },
  FW: { bg: "var(--color-danger-bg)", fg: "var(--red-600)", border: "var(--color-danger-border)" },
};

export function Badge({ children, tone = "neutral" }) {
  const c =
    POSITION_COLORS[children] ??
    (tone === "neutral"
      ? { bg: "var(--cream-100)", fg: "var(--color-text-secondary)", border: "var(--color-border-strong)" }
      : POSITION_COLORS.MF);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "var(--radius-pill)",
        font: "var(--text-label-caps)",
        letterSpacing: "var(--letter-spacing-caps)",
        background: c.bg,
        color: c.fg,
        border: `1.5px solid ${c.border}`,
      }}
    >
      {children}
    </span>
  );
}
