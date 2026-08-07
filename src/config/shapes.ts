/**
 * Scroll-morph navigation.
 *
 * Each section owns one geometric mark. While the section is still in play the
 * mark sits large inside it; once the section scrolls past the dock threshold
 * the same element morphs (framer-motion `layoutId`) into a small button in the
 * fixed header, which scrolls back to that section.
 *
 * `order` controls the docked position: lower numbers sit further right, so
 * newly docked marks appear to push in from the left.
 */
export type ShapeKind = "circle" | "rect" | "trapezoid";

export interface ShapeDef {
  id: string;
  /** Section the docked button scrolls to. */
  target: string;
  label: string;
  kind: ShapeKind;
  color: string;
  order: number;
}

export const SHAPES: ShapeDef[] = [
  {
    id: "me",
    target: "hero-section",
    label: "Me",
    kind: "circle",
    color: "#f43f3f",
    order: 0,
  },
  {
    id: "experience",
    target: "work-section",
    label: "Experience",
    kind: "rect",
    color: "#4c82f7",
    order: 1,
  },
  {
    id: "projects",
    target: "project-section",
    label: "Projects",
    kind: "trapezoid",
    color: "#3fbf4c",
    order: 2,
  },
];
