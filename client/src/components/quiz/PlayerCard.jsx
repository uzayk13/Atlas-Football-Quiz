export function PlayerCard({ photoUrl }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        background: "var(--color-bg-surface)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--color-border)",
        padding: "var(--space-6)",
        width: 220,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "var(--navy-800)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {photoUrl ? (
          <img src={photoUrl} alt="Player" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <svg width="60" height="60" viewBox="0 0 24 24" fill="var(--cream-100)">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-9 2.2-9 5v3h18v-3c0-2.8-4.6-5-9-5z" />
          </svg>
        )}
      </div>
    </div>
  );
}
