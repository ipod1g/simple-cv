/**
 * Scroll-morph navigation.
 *
 * Each section owns one geometric mark. While the section is still in play the
 * mark sits large, overlapping the section title; once it scrolls past the
 * dock threshold the same element morphs (framer-motion `layoutId`) into a
 * small button in the fixed header, which scrolls back to that section.
 *
 * Geometry lives here as exact SVG paths — the anchor and the docked button
 * render the SAME path, and both containers use the same `ratio`, so the
 * layout animation is a uniform scale and the silhouette never distorts.
 *
 * `order` controls the docked position: lower numbers sit further right, so
 * newly docked marks appear to push in from the left.
 */
export interface ShapeDef {
  id: string;
  /** Section the docked button scrolls to. */
  target: string;
  label: string;
  color: string;
  /** SVG viewBox — path coordinates live in this space. */
  viewBox: string;
  /** Path outline of the shape, drawn in viewBox space. */
  d: string;
  /** width / height of the viewBox; applied to both endpoints. */
  ratio: number;
  order: number;
}

export const SHAPES: ShapeDef[] = [
  {
    id: "me",
    target: "hero-section",
    label: "Me",
    color: "#f43f3f",
    viewBox: "4 -6 200 138",
    d: "M80.3338 3.4702 A100 57.5 -20 1 0 119.6662 111.5298 A100 57.5 -20 1 0 80.3338 3.4702 Z",
    ratio: 200 / 138,
    order: 0,
  },
  {
    id: "experience",
    target: "work-section",
    label: "Experience",
    color: "#4c82f7",
    viewBox: "0 0 200 150",
    d: "M14 36 L172 8 L200 118 L42 146 Z",
    ratio: 200 / 150,
    order: 1,
  },
  {
    id: "projects",
    target: "project-section",
    label: "Projects",
    color: "#3fbf4c",
    viewBox: "0 0 110 120",
    d: "M0 120 L33 5 L110 38 L97 120 Z",
    ratio: 110 / 120,
    order: 2,
  },
];
