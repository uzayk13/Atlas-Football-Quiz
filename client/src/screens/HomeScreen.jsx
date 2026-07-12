import { Button } from "../components/core/Button";
import { useLanguage } from "../i18n/LanguageContext";

export function HomeScreen({ onStart }) {
  const { t } = useLanguage();
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        background: "var(--navy-900)",
        padding: "max(32px, env(safe-area-inset-top)) max(32px, env(safe-area-inset-right)) max(32px, env(safe-area-inset-bottom)) max(32px, env(safe-area-inset-left))",
        textAlign: "center",
      }}
    >
      <div style={{ font: "700 20px/1 var(--font-body)", letterSpacing: "0.3em", color: "var(--gold-400)" }}>
        {t.appName}
      </div>
      <div style={{ font: "var(--text-display-xl)", color: "var(--cream-050)" }}>{t.appSubtitle}</div>
      <div style={{ font: "var(--text-body-md)", color: "var(--gray-300)", maxWidth: 280 }}>
        {t.homeTagline}
      </div>
      <Button variant="gold" size="lg" onClick={onStart} style={{ marginTop: 12 }}>
        {t.kickOff}
      </Button>
    </div>
  );
}
