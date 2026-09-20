// A small blocky, "pixel art" human face -- used as President's (the chat
// assistant) avatar. Built from plain <rect> squares on an 8x8 grid rather
// than a photo or line icon, so it reads as a friendly retro character mark
// rather than a generic UI glyph.
//
// Only face pixels (1) are drawn, in currentColor, so the icon adapts to
// whatever surface it sits on. The eyes and mouth (2) are left as cutouts --
// simply not drawn -- so whatever sits behind the icon (the gold launcher
// button, the navy header chip) shows through as the "features", always
// contrasting correctly against the face without hardcoding a second color.
const GRID: number[][] = [
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 2, 1, 1, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 2, 2, 2, 2, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
];

export default function PixelFace({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
      {GRID.flatMap((row, y) =>
        row.map((cell, x) =>
          cell !== 1 ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
        )
      )}
    </svg>
  );
}
