import { useEffect } from "react";

export const PROTOTYPE_VARIANTS = [
  { key: "A", name: "Character menu" },
  { key: "B", name: "Editorial split" },
  { key: "C", name: "Work-first index" },
] as const;

export type PrototypeVariant = "A" | "B" | "C";

export default function PrototypeSwitcher({ current, onChange }: {
  current: PrototypeVariant;
  onChange: (variant: PrototypeVariant) => void;
}) {
  const index = PROTOTYPE_VARIANTS.findIndex(({ key }) => key === current);
  const cycle = (direction: number) => {
    onChange(PROTOTYPE_VARIANTS[(index + direction + 3) % 3]!.key);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable], video, [role=slider]")) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        cycle(event.key === "ArrowLeft" ? -1 : 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, onChange]);

  if (!import.meta.env.DEV) return null;
  return <div className="prototype-switcher" aria-label="Prototype layouts">
    <button type="button" onClick={() => cycle(-1)} aria-label="Previous layout">←</button>
    <div aria-live="polite"><small>LAYOUT STUDY / {index + 1} OF 3</small><strong>{current} — {PROTOTYPE_VARIANTS[index]!.name}</strong></div>
    <button type="button" onClick={() => cycle(1)} aria-label="Next layout">→</button>
  </div>;
}
