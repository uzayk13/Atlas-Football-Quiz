import { Button } from "../components/core/Button";
import { ScoreBadge } from "../components/quiz/ScoreBadge";

export function ResultsScreen({ score, total, onReplay }) {
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
        {great ? "FULL TIME 🏆" : "FULL TIME"}
      </div>
      <ScoreBadge score={score} total={total} size="lg" />
      <div style={{ font: "var(--text-body-md)", color: "var(--gray-300)", maxWidth: 260 }}>
        {great ? "You scored like a true fan. Go again?" : "Next one's yours — run it back."}
      </div>
      <Button variant="gold" size="lg" onClick={onReplay} style={{ marginTop: 8 }}>
        Play Again
      </Button>
    </div>
  );
}
