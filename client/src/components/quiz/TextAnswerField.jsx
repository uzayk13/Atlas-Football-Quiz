import { useState } from "react";

export function TextAnswerField({ label, value, onChange, disabled, state, correctAnswer, placeholder = "Type your answer…" }) {
  const [focused, setFocused] = useState(false);

  let borderColor = "var(--color-border)";
  let background = "var(--color-bg-surface)";
  let color = "var(--color-text-primary)";

  if (state === "correct") {
    borderColor = "var(--color-success-border)";
    background = "var(--color-success-bg)";
    color = "var(--green-800)";
  } else if (state === "wrong") {
    borderColor = "var(--color-danger-border)";
    background = "var(--color-danger-bg)";
    color = "var(--red-600)";
  } else if (focused) {
    borderColor = "var(--color-brand-primary)";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--letter-spacing-caps)", color: "var(--color-text-muted)" }}>
        {label}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value || ""}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: "100%",
          height: 52,
          boxSizing: "border-box",
          borderRadius: "var(--radius-md)",
          border: `2px solid ${borderColor}`,
          background,
          color,
          font: "var(--text-body-md)",
          fontWeight: 600,
          padding: "0 14px",
          outline: "none",
        }}
      />
      {state === "wrong" && correctAnswer && (
        <div style={{ font: "var(--text-body-sm)", color: "var(--red-600)" }}>
          Correct answer: {correctAnswer}
        </div>
      )}
    </div>
  );
}
