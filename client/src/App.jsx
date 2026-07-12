import { useState, useEffect } from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { FieldsScreen } from "./screens/FieldsScreen";
import { FlagScreen } from "./screens/FlagScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { LanguageToggle } from "./components/core/LanguageToggle";
import { useLanguage } from "./i18n/LanguageContext";
import { buildPlayer, shuffle, flagTotal, FIELDS } from "./data/players";

// stage: "loading" | "home" | "fields" | "flag" | "results"
export default function App() {
  const { t } = useLanguage();
  const [stage, setStage] = useState("loading");
  const [allPlayers, setAllPlayers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [cycleScore, setCycleScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/players")
      .then((r) => {
        if (!r.ok) throw new Error(`Server error ${r.status}`);
        return r.json();
      })
      .then((rows) => {
        const players = rows.map(buildPlayer);
        setAllPlayers(players);
        setStage("home");
      })
      .catch((err) => setError(err.message));
  }, []);

  function startGame() {
    setQueue(shuffle(allPlayers));
    setQueueIndex(0);
    setCycleScore(0);
    setStage("fields");
  }

  function handleFieldsDone(roundScore) {
    setCycleScore((s) => s + roundScore);
    setStage("flag");
  }

  function handleFlagDone(flagScore) {
    setCycleScore((s) => s + flagScore);
    const next = queueIndex + 1;
    if (next >= queue.length) {
      setStage("results");
    } else {
      setQueueIndex(next);
      setStage("fields");
    }
  }

  function handleReplay() {
    setQueue(shuffle(allPlayers));
    setQueueIndex(0);
    setCycleScore(0);
    setStage("fields");
  }

  const player = queue[queueIndex];
  const total = queue.length;
  const grandTotal = queue.reduce((sum, p) => sum + FIELDS.length + flagTotal(p.flag), 0);

  if (stage === "loading") {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--navy-900)" }}>
        <LanguageToggle />
        <div style={{ font: "var(--text-display-sm)", color: "var(--cream-050)" }}>{t.loading}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "var(--navy-900)", padding: 32, textAlign: "center" }}>
        <LanguageToggle />
        <div style={{ font: "var(--text-display-sm)", color: "var(--red-400)" }}>{t.connectionError}</div>
        <div style={{ font: "var(--text-body-sm)", color: "var(--gray-300)" }}>{error}</div>
        <div style={{ font: "var(--text-body-sm)", color: "var(--gray-500)" }}>{t.connectionHint}</div>
      </div>
    );
  }

  return (
    <>
      <LanguageToggle />
      {stage === "home" && <HomeScreen onStart={startGame} />}
      {stage === "fields" && <FieldsScreen key={`fields-${queueIndex}`} player={player} roundNum={queueIndex + 1} total={total} onNext={handleFieldsDone} />}
      {stage === "flag" && <FlagScreen key={`flag-${queueIndex}`} player={player} roundNum={queueIndex + 1} total={total} onNext={handleFlagDone} />}
      {stage === "results" && <ResultsScreen score={cycleScore} total={grandTotal} onReplay={handleReplay} />}
    </>
  );
}
