// Zooms into a region of assets/flags/{code}.svg centered at (crop.fx, crop.fy).
// Uses CSS background-image so the flag's native aspect ratio is always preserved.
export function FlagCrop({ code, crop, size = 44 }) {
  const zoom = crop.zoom ?? 3.0;

  // CSS background-position % formula:
  // places the (fx, fy) point of the image at the center of the container.
  const bgX = zoom === 1 ? "50%" : `${(100 * (crop.fx * zoom - 0.5)) / (zoom - 1)}%`;
  const bgY = zoom === 1 ? "50%" : `${(100 * (crop.fy * zoom - 0.5)) / (zoom - 1)}%`;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        overflow: "hidden",
        border: "2px solid var(--color-border-strong)",
        boxShadow: "var(--shadow-sm)",
        backgroundImage: `url(/flags/${code}.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${zoom * 100}%`,
        backgroundPosition: `${bgX} ${bgY}`,
      }}
    />
  );
}
