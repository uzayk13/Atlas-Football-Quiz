import { useState, useEffect } from "react";
import { FlagCrop } from "./FlagCrop";

export function FlagColorCanvas({ code, regions, palette, symbols = [], submitted = false, onProgress }) {
  const [fills, setFills] = useState({});
  const [selectedColor, setSelectedColor] = useState(palette[0]);
  const [placed, setPlaced] = useState({});
  const [draggingId, setDraggingId] = useState(null);
  const [overId, setOverId] = useState(null);

  const total = regions.length + symbols.length;
  const score =
    regions.filter((r) => fills[r.id] === r.correctColor).length +
    symbols.filter((s) => placed[s.id]).length;
  const canSubmit = regions.every((r) => fills[r.id]) && symbols.every((s) => placed[s.id]);

  useEffect(() => {
    onProgress?.(score, total, canSubmit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fills, placed]);

  function fillRegion(id) {
    if (submitted) return;
    setFills((f) => ({ ...f, [id]: selectedColor }));
  }

  function handleDrop(symbol) {
    if (draggingId === symbol.id) setPlaced((p) => ({ ...p, [symbol.id]: true }));
    setDraggingId(null);
    setOverId(null);
  }

  const pendingSymbols = symbols.filter((s) => !placed[s.id]);

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 300, height: 200, flexShrink: 0 }}>
        <svg
          viewBox="0 0 300 200"
          width="300"
          height="200"
          style={{ display: "block", borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}
        >
          {regions.map((r) => {
            let stroke = "var(--color-border-strong)";
            let strokeWidth = 1;
            if (submitted) {
              const ok = fills[r.id] === r.correctColor;
              stroke = ok ? "var(--color-success-border)" : "var(--color-danger-border)";
              strokeWidth = 4;
            }
            const fill = fills[r.id] || "#f3efe3";
            const props = { fill, stroke, strokeWidth, onClick: () => fillRegion(r.id), style: { cursor: submitted ? "default" : "pointer" } };
            if (r.shape === "rect") return <rect key={r.id} x={r.x} y={r.y} width={r.w} height={r.h} {...props} />;
            if (r.shape === "circle") return <circle key={r.id} cx={r.cx} cy={r.cy} r={r.r} {...props} />;
            if (r.shape === "polygon") return <polygon key={r.id} points={r.points} {...props} />;
            return null;
          })}
        </svg>

        {symbols.map((s) => {
          const leftPct = (s.target.x / 300) * 100;
          const topPct = (s.target.y / 200) * 100;
          if (placed[s.id]) {
            return (
              <div key={s.id} style={{ position: "absolute", left: `${leftPct}%`, top: `${topPct}%`, transform: "translate(-50%, -50%)" }}>
                <FlagCrop code={code} crop={s.crop} size={s.size} />
              </div>
            );
          }
          const isOver = overId === s.id;
          return (
            <div
              key={s.id}
              style={{
                position: "absolute",
                left: `${leftPct}%`,
                top: `${topPct}%`,
                width: s.size,
                height: s.size,
                transform: "translate(-50%, -50%)",
                boxSizing: "border-box",
                borderRadius: "var(--radius-pill)",
                border: `2px dashed ${isOver ? "var(--color-brand-primary)" : "var(--color-border-strong)"}`,
                background: isOver ? "var(--green-100)" : "transparent",
              }}
              onDragOver={(e) => { e.preventDefault(); setOverId(s.id); }}
              onDragLeave={() => setOverId((id) => (id === s.id ? null : id))}
              onDrop={(e) => { e.preventDefault(); handleDrop(s); }}
            />
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 140 }}>
        <div>
          <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--letter-spacing-caps)", color: "var(--color-text-muted)", marginBottom: 8 }}>
            Palette
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {palette.map((color) => {
              const active = selectedColor === color;
              return (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-pill)",
                    boxSizing: "border-box",
                    background: color,
                    cursor: "pointer",
                    border: `2px solid ${active ? "var(--color-brand-primary)" : "var(--color-border-strong)"}`,
                    boxShadow: active ? "0 0 0 3px var(--green-300)" : "none",
                  }}
                />
              );
            })}
          </div>
        </div>

        {pendingSymbols.length > 0 && (
          <div>
            <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--letter-spacing-caps)", color: "var(--color-text-muted)", marginBottom: 8 }}>
              Drag onto flag
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {pendingSymbols.map((s) => (
                <div
                  key={s.id}
                  draggable
                  onDragStart={() => setDraggingId(s.id)}
                  onDragEnd={() => setDraggingId(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    padding: 8,
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border)",
                    cursor: "grab",
                  }}
                >
                  <FlagCrop code={code} crop={s.crop} size={s.size} />
                  <div style={{ font: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
