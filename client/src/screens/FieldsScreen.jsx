import { useState } from "react";
import { Button } from "../components/core/Button";
import { ProgressBar } from "../components/core/ProgressBar";
import { PlayerCard } from "../components/quiz/PlayerCard";
import { ScoreBadge } from "../components/quiz/ScoreBadge";
import { TextAnswerField } from "../components/quiz/TextAnswerField";
import { FIELDS } from "../data/players";
import { isAnswerCorrect } from "../utils/answer";
import { useLanguage } from "../i18n/LanguageContext";
import { NATIONALITY_TR } from "../i18n/translations";

// Nationality is accepted in English (as stored in the DB) or Turkish.
function isFieldCorrect(key, input, answer) {
  if (isAnswerCorrect(input, answer)) return true;
  if (key === "nationality") {
    const tr = NATIONALITY_TR[answer];
    if (tr) return isAnswerCorrect(input, tr);
  }
  return false;
}

function correctAnswerDisplay(key, answer) {
  if (key === "nationality") {
    const tr = NATIONALITY_TR[answer];
    if (tr) return `${answer} / ${tr}`;
  }
  return answer;
}

export function FieldsScreen({ player, roundNum, total, onNext }) {
  const { t } = useLanguage();
  const [picks, setPicks] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allPicked = FIELDS.every((f) => (picks[f.key] || "").trim());
  const roundScore = FIELDS.filter((f) => isFieldCorrect(f.key, picks[f.key], player.answers[f.key])).length;

  function submit() {
    if (!allPicked || submitted) return;
    setSubmitted(true);
  }

  return (
    <div style={{ height: "100%", width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "center", background: "var(--color-bg-app)", padding: "24px 20px", overflowY: "auto" }}>
      <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--letter-spacing-caps)", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
            {t.playerProgress(roundNum, total)}
          </div>
          <ProgressBar value={roundNum} max={total} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <PlayerCard photoUrl={player.photoUrl} />
          <div style={{ font: "var(--text-display-sm)", color: "var(--color-text-primary)" }}>{player.firstName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FIELDS.map((f) => {
            const state = submitted ? (isFieldCorrect(f.key, picks[f.key], player.answers[f.key]) ? "correct" : "wrong") : null;
            return (
              <TextAnswerField
                key={f.key}
                label={t.fields[f.key]}
                value={picks[f.key]}
                disabled={submitted}
                state={state}
                correctAnswer={correctAnswerDisplay(f.key, player.answers[f.key])}
                correctAnswerLabel={t.correctAnswer}
                placeholder={t.typeAnswer}
                onChange={(val) => setPicks((p) => ({ ...p, [f.key]: val }))}
              />
            );
          })}
        </div>

        {submitted && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--navy-900)", borderRadius: "var(--radius-lg)", padding: "14px 18px" }}>
            <div style={{ font: "var(--text-body-md)", color: "var(--cream-050)" }}>{t.scoreSoFar}</div>
            <ScoreBadge score={roundScore} total={FIELDS.length} />
          </div>
        )}

        <div>
          {!submitted ? (
            <Button size="lg" disabled={!allPicked} onClick={submit} style={{ width: "100%" }}>
              {t.submit}
            </Button>
          ) : (
            <Button variant="gold" size="lg" onClick={() => onNext(roundScore)} style={{ width: "100%" }}>
              {t.next}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
