import { Button } from "../components/core/Button";

export function HomeScreen({ onStart }) {
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
        padding: 32,
        textAlign: "center",
      }}
    >
      <div style={{ font: "700 20px/1 var(--font-body)", letterSpacing: "0.3em", color: "var(--gold-400)" }}>
        ATLAS FC
      </div>
      <div style={{ font: "var(--text-display-xl)", color: "var(--cream-050)" }}>QUIZ</div>
      <div style={{ font: "var(--text-body-md)", color: "var(--gray-300)", maxWidth: 280 }}>
        Type each answer — nationality, club, full name, position — then color in the flag by hand.
      </div>
      <Button variant="gold" size="lg" onClick={onStart} style={{ marginTop: 12 }}>
        ⚽ Kick Off
      </Button>
    </div>
  );
}
