import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { LayoutGroup, LazyMotion, domMax, m } from "@/lib/motion";
import { SHAPES, type ShapeDef } from "@/config/shapes";
import { scrollToTarget, subscribeScroll } from "@/lib/scroll";

/**
 * A mark docks once its bottom edge rises above this line. Set well below the
 * header so the flight starts while the shape is still clearly on screen —
 * docking at the last moment reads as a pop, not a morph.
 */
const dockLine = () => Math.max(120, window.innerHeight * 0.28);

function Mark({ shape, docked }: { shape: ShapeDef; docked: boolean }) {
  return (
    <m.span
      className={`mark mark--${shape.kind}`}
      data-docked={docked ? "" : undefined}
      style={{ background: shape.color }}
      aria-hidden="true"
    />
  );
}

export default function ShapeNav() {
  const [anchors, setAnchors] = useState<Record<string, HTMLElement>>({});
  const [docked, setDocked] = useState<Record<string, boolean>>({});
  const reduced = useReducedMotion();

  // Anchors are authored in the .astro markup, so they exist before hydration.
  useEffect(() => {
    const found: Record<string, HTMLElement> = {};
    for (const shape of SHAPES) {
      const el = document.querySelector<HTMLElement>(
        `[data-shape-anchor="${shape.id}"]`
      );
      if (el) found[shape.id] = el;
    }
    setAnchors(found);
  }, []);

  useEffect(() => {
    if (Object.keys(anchors).length === 0) return;

    const measure = () => {
      setDocked((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const shape of SHAPES) {
          const anchor = anchors[shape.id];
          if (!anchor) continue;
          const isDocked = anchor.getBoundingClientRect().bottom < dockLine();
          if (next[shape.id] !== isDocked) {
            next[shape.id] = isDocked;
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    };

    // Lenis emits at most once per frame, so three rect reads per event is
    // cheap enough to measure synchronously — and unlike rAF, it still runs
    // when the tab is in the background.
    measure();
    return subscribeScroll(measure);
  }, [anchors]);

  const dockedShapes = useMemo(
    () =>
      SHAPES.filter((shape) => docked[shape.id]).sort(
        (a, b) => b.order - a.order
      ),
    [docked]
  );

  // Soft, slightly under-damped spring so the mark travels rather than snaps.
  const transition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 170, damping: 22, mass: 1.1 };

  return (
    // domMax, not domAnimation — layoutId needs the projection feature.
    <LazyMotion features={domMax} strict>
      <LayoutGroup>
        <nav className="shape-nav" aria-label="Sections">
          <ul className="shape-nav__list">
            {dockedShapes.map((shape) => (
              <li key={shape.id}>
                <a
                  className="shape-nav__button"
                  href={`#${shape.target}`}
                  onClick={(event) => {
                    const target = document.getElementById(shape.target);
                    if (!target) return;
                    event.preventDefault();
                    scrollToTarget(target);
                  }}
                >
                  <m.span
                    layoutId={`shape-${shape.id}`}
                    layout
                    transition={transition}
                    className="shape-nav__mark"
                  >
                    <Mark shape={shape} docked />
                  </m.span>
                  <span className="shape-nav__label">{shape.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {SHAPES.map((shape) => {
          const anchor = anchors[shape.id];
          if (!anchor || docked[shape.id]) return null;
          return createPortal(
            <m.span
              key={shape.id}
              layoutId={`shape-${shape.id}`}
              layout
              transition={transition}
              className="shape-anchor__mark"
            >
              <Mark shape={shape} docked={false} />
            </m.span>,
            anchor
          );
        })}
      </LayoutGroup>
    </LazyMotion>
  );
}
