import { useState } from "react";
import { Button } from "../components/core/Button";
import { ProgressBar } from "../components/core/ProgressBar";
import { ScoreBadge } from "../components/quiz/ScoreBadge";
import { FlagColorCanvas } from "../components/quiz/FlagColorCanvas";
import { flagTotal } from "../data/players";
import { useLanguage } from "../i18n/LanguageContext";

export function FlagScreen({ player, roundNum, total, onNext }) {
  const { t } = useLanguage();
  const { flag } = player;
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState({ score: 0, total: flagTotal(flag), canSubmit: false });

  return (
    <div style={{ height: "100%", width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "center", background: "var(--color-bg-app)", padding: "24px 20px", overflowY: "auto" }}>
      <div style={{ width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--letter-spacing-caps)", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
            {t.flagProgress(roundNum, total)}
          </div>
          <ProgressBar value={roundNum} max={total} />
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ font: "var(--text-display-sm)", color: "var(--color-text-primary)" }}>
            {t.colorFlag(player.firstName)}
          </div>
          <div style={{ font: "var(--text-body-sm)", color: "var(--color-text-muted)", marginTop: 4 }}>
            {t.flagHint}{flag.symbols.length > 0 ? t.flagHintDrag : ""}
          </div>
        </div>

        <FlagColorCanvas
          code={player.code}
          regions={flag.regions}
          palette={flag.palette}
          symbols={flag.symbols}
          submitted={submitted}
          onProgress={(score, tot, canSubmit) => setProgress({ score, total: tot, canSubmit })}
        />

        {submitted && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--navy-900)", borderRadius: "var(--radius-lg)", padding: "14px 18px" }}>
              <div style={{ font: "var(--text-body-md)", color: "var(--cream-050)" }}>{t.flagScore}</div>
              <ScoreBadge score={progress.score} total={progress.total} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center" }}>
              <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--letter-spacing-caps)", color: "var(--color-text-muted)" }}>{t.realFlag}</div>
              <img
                src={`/flags/${player.code}.svg`}
                alt={`${player.firstName}'s real flag`}
                style={{ width: 100, height: 67, borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-strong)", objectFit: "cover" }}
              />
            </div>
          </div>
        )}

        <div>
          {!submitted ? (
            <Button size="lg" disabled={!progress.canSubmit} onClick={() => setSubmitted(true)} style={{ width: "100%" }}>
              {t.checkFlag}
            </Button>
          ) : (
            <Button variant="gold" size="lg" onClick={() => onNext(progress.score)} style={{ width: "100%" }}>
              {roundNum < total ? t.nextPlayer : t.seeFinalScore}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
