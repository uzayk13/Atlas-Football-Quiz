import { Button } from "../components/core/Button";
import { ScoreBadge } from "../components/quiz/ScoreBadge";
import { useLanguage } from "../i18n/LanguageContext";

export function ResultsScreen({ score, total, onReplay }) {
  const { t } = useLanguage();
  const great = score / total >= 0.7;
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
        gap: 20,
        background: "var(--navy-900)",
        padding: 32,
        textAlign: "center",
      }}
    >
      <div style={{ font: "var(--text-display-lg)", color: "var(--cream-050)" }}>
        {great ? t.fullTimeTrophy : t.fullTime}
      </div>
      <ScoreBadge score={score} total={total} size="lg" />
      <div style={{ font: "var(--text-body-md)", color: "var(--gray-300)", maxWidth: 260 }}>
        {great ? t.greatResult : t.okResult}
      </div>
      <Button variant="gold" size="lg" onClick={onReplay} style={{ marginTop: 8 }}>
        {t.playAgain}
      </Button>
    </div>
  );
}
