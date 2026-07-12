import { useLanguage } from "../../i18n/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      onClick={toggleLang}
      style={{
        position: "fixed",
        top: 14,
        right: 14,
        zIndex: 1000,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        borderRadius: "var(--radius-pill)",
        border: "2px solid rgba(255,255,255,0.3)",
        background: "rgba(10,22,38,0.85)",
        color: "var(--cream-050)",
        font: "700 13px/1 var(--font-body)",
        letterSpacing: "0.05em",
        cursor: "pointer",
      }}
    >
      {lang === "en" ? "🇹🇷 TR" : "🇬🇧 EN"}
    </button>
  );
}
