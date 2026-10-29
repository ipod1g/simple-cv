import { describe, expect, test } from "bun:test";
import {
  CLOSE_SPEED,
  SPAN,
  ZOOM_OUT,
  flightDuration,
  frameAt,
} from "./vennMenuTimeline";

const LINKS = 5;

/** Every animated number the overlay writes to the DOM, as one flat list. */
function values(progress: number, reduced = false): number[] {
  const frame = frameAt(progress, LINKS, { reduced });
  return [
    frame.plate,
    frame.zoom,
    frame.rotation,
    ...frame.links,
    frame.tail.offsetRem,
    frame.tail.opacity,
  ];
}

describe("venn menu timeline", () => {
  test("the ends are exactly closed and exactly open", () => {
    const closed = frameAt(0, LINKS);
    expect(closed.plate).toBe(0);
    expect(closed.zoom).toBe(ZOOM_OUT);
    expect(closed.rotation).toBe(0);
    expect(closed.links).toEqual([100, 100, 100, 100, 100]);
    expect(closed.tail.opacity).toBe(0);

    const open = frameAt(1, LINKS);
    expect(open.plate).toBe(1);
    expect(open.zoom).toBeCloseTo(1, 6);
    expect(open.rotation).toBeCloseTo(60, 4);
    open.links.forEach((y) => expect(y).toBeCloseTo(0, 4));
    expect(open.tail.opacity).toBeCloseTo(1, 4);
    expect(open.tail.offsetRem).toBeCloseTo(0, 4);
  });

  // The seamlessness of a rapid toggle rests on this: reversing direction
  // mid-flight can only ever be smooth if neighbouring progress values map to
  // neighbouring frames, with no step to jump across.
  test("no value jumps between adjacent points on the timeline", () => {
    const steps = 2000;
    let previous = values(0);

    for (let i = 1; i <= steps; i++) {
      const current = values(i / steps);
      current.forEach((value, index) => {
        // Widest travel of any single value is a link's 100%, so a 1/2000th
        // step can move it at most a fraction of that.
        expect(Math.abs(value - previous[index]!)).toBeLessThan(1);
      });
      previous = current;
    }
  });

  test("every value moves one way only, so a reversal cannot double back", () => {
    const steps = 500;
    const rising = [true, false, true, ...Array(LINKS).fill(false), false, true];
    let previous = values(0);

    for (let i = 1; i <= steps; i++) {
      const current = values(i / steps);
      current.forEach((value, index) => {
        const delta = value - previous[index]!;
        if (rising[index]) expect(delta).toBeGreaterThanOrEqual(-1e-9);
        else expect(delta).toBeLessThanOrEqual(1e-9);
      });
      previous = current;
    }
  });

  test("a frame depends only on progress, not on how it was reached", () => {
    // Opening and closing read the same curve, so an interruption at p has the
    // same appearance either way — there is no separate close animation.
    expect(values(0.42)).toEqual(values(0.42));
    expect(values(0.42)).not.toEqual(values(0.43));
  });

  test("reduced motion settles the circles but keeps the rest of the frame", () => {
    expect(frameAt(0, LINKS, { reduced: true }).zoom).toBe(1);
    expect(frameAt(0.5, LINKS, { reduced: true }).zoom).toBe(1);
    expect(frameAt(0.5, LINKS, { reduced: true }).links).toEqual(
      frameAt(0.5, LINKS).links
    );
  });

  test("duration scales with the distance left to travel", () => {
    expect(flightDuration(0, 1)).toBeCloseTo(SPAN, 6);
    expect(flightDuration(0.5, 1)).toBeCloseTo(SPAN / 2, 6);
    // A flick close from 10% in costs a tenth of the flight, not a whole one.
    expect(flightDuration(0.1, 0)).toBeCloseTo((0.1 * SPAN) / CLOSE_SPEED, 6);
    expect(flightDuration(1, 0)).toBeCloseTo(SPAN / CLOSE_SPEED, 6);
    expect(flightDuration(0.3, 0.3)).toBe(0);
  });

  test("progress outside 0..1 is clamped rather than extrapolated", () => {
    expect(values(-0.5)).toEqual(values(0));
    expect(values(1.5)).toEqual(values(1));
  });
});
