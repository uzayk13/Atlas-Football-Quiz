import { useState } from "react";

const VARIANT_STYLES = {
  primary: {
    background: "var(--color-brand-primary)",
    color: "var(--color-text-on-brand)",
    boxShadow: "var(--shadow-button)",
  },
  gold: {
    background: "var(--color-accent-gold)",
    color: "var(--color-on-accent-gold)",
    boxShadow: "var(--shadow-button-gold)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-brand-primary)",
    boxShadow: "none",
    border: "2px solid var(--color-brand-primary)",
  },
};

const SIZE_STYLES = {
  md: { height: 52, padding: "0 24px", font: "var(--text-label-caps)" },
  lg: { height: 60, padding: "0 32px", font: "600 16px/1.2 var(--font-body)" },
};

export function Button({ children, variant = "primary", size = "md", disabled = false, onClick, style }) {
  const v = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary;
  const s = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: "var(--radius-md)",
    letterSpacing: "var(--letter-spacing-caps)",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    transition: "all var(--duration-fast) var(--ease-out)",
    opacity: disabled ? 0.5 : 1,
    ...s,
    ...v,
    ...style,
  };

  if (!disabled && variant !== "ghost") {
    if (active) {
      base.transform = "translateY(3px)";
      base.boxShadow = "none";
      base.background = variant === "gold" ? "var(--color-accent-gold-hover)" : "var(--color-brand-primary-press)";
    } else if (hover) {
      base.transform = "translateY(-1px)";
      base.background = variant === "gold" ? "var(--color-accent-gold-hover)" : "var(--color-brand-primary-hover)";
    }
  }

  return (
    <button
      style={base}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      {children}
    </button>
  );
}
