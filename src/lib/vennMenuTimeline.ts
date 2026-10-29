import { cubicBezier } from "@/lib/motion";

/**
 * The venn overlay's whole appearance as a pure function of one number.
 *
 * `progress` is 0 closed, 1 open, and `frameAt` says what every moving part
 * looks like at that point — nothing else in the menu holds animation state.
 * That is what makes a rapid toggle seamless: opening and closing are the same
 * curve read in opposite directions, so an interruption is one scalar changing
 * direction rather than a set of per-element animations restarting out of step.
 *
 * Keeping it here, free of the DOM, is also what lets the continuity that the
 * seamlessness depends on be tested directly.
 */

/** Circles start this far out — 1 is the settled, overlapping arrangement. */
export const ZOOM_OUT = 3;
export const ROTATION_IN = 60;

/* Segment offsets, in seconds along the open flight. */
/** The plate goes opaque first, or the page shows through the moving field. */
export const PLATE_DURATION = 0.3;
const GEOMETRY_START = PLATE_DURATION;
const GEOMETRY_DURATION = 1.8;
/** Links start wiping up while the circles are still flying in. */
const LINK_START = 0.8;
const LINK_DURATION = 0.8;
const LINK_STEP = 0.08;
const TAIL_DURATION = 0.8;

/** Wall-clock length of the full open flight, in seconds. */
export const SPAN = GEOMETRY_START + GEOMETRY_DURATION;
/** Closing runs the same timeline backwards, but with less ceremony. */
export const CLOSE_SPEED = 1.9;
/** Reduced motion keeps the timeline — it just crosses it almost instantly. */
export const REDUCED_SPAN = 0.2;

const easeOutQuart = cubicBezier(0.165, 0.84, 0.44, 1);
const easeOutCubic = cubicBezier(0.215, 0.61, 0.355, 1);

/** Progress of a segment that runs from `start` for `duration`. */
function segment(time: number, start: number, duration: number): number {
  return Math.min(1, Math.max(0, (time - start) / duration));
}

export interface MenuFrame {
  /** Opacity of the white plate the circles multiply against. */
  plate: number;
  /** How far out along their spokes the circles sit. */
  zoom: number;
  /** The field's swing, in degrees. */
  rotation: number;
  /** Per-link vertical offset, as a percentage of the link's own height. */
  links: number[];
  tail: { offsetRem: number; opacity: number };
}

export interface FrameOptions {
  /** Under reduced motion the circles are simply there from the first frame. */
  reduced?: boolean;
}

export function frameAt(
  progress: number,
  linkCount: number,
  { reduced = false }: FrameOptions = {}
): MenuFrame {
  const time = Math.min(1, Math.max(0, progress)) * SPAN;

  const flight = reduced
    ? 1
    : easeOutQuart(segment(time, GEOMETRY_START, GEOMETRY_DURATION));

  const links = Array.from({ length: linkCount }, (_, index) => {
    const wipe = easeOutCubic(
      segment(time, LINK_START + index * LINK_STEP, LINK_DURATION)
    );
    return (1 - wipe) * 100;
  });

  const rise = easeOutCubic(
    segment(time, LINK_START + linkCount * LINK_STEP, TAIL_DURATION)
  );

  return {
    plate: segment(time, 0, PLATE_DURATION),
    zoom: ZOOM_OUT + (1 - ZOOM_OUT) * flight,
    rotation: ROTATION_IN * flight,
    links,
    tail: { offsetRem: (1 - rise) * 2, opacity: rise },
  };
}

/**
 * How long to spend travelling between two points on the timeline. Scaled by
 * the distance left to cover, so a flick close from 10% in unwinds in a tenth
 * of the time rather than replaying the whole flight in reverse.
 */
export function flightDuration(
  from: number,
  to: number,
  { reduced = false }: FrameOptions = {}
): number {
  const span = reduced ? REDUCED_SPAN : SPAN;
  const opening = to > from;
  return (Math.abs(to - from) * span) / (opening ? 1 : CLOSE_SPEED);
}
