import { useEffect, useMemo, useState } from "react";
import { SHAPES } from "@/config/shapes";
import {
  scrollToPageTarget,
  subscribePageScroll,
} from "@/lib/pageInteractionRuntime";

/**
 * Fixed section nav. Each entry appears once its section's mark has scrolled
 * past the dock line, and simply fades in — the marks themselves stay put in
 * the page. (An earlier version morphed the page mark into the header button
 * with a shared `layoutId`; on a back-navigation the browser restores scroll
 * mid-page, so that whole flight replayed on arrival as flicker and shift.)
 */

/** A section counts as passed once its mark's bottom edge rises above this. */
const dockLine = () => Math.max(120, window.innerHeight * 0.28);

const PORTRAIT_KEY = "portrait";

/** The portrait is far taller, so it reads as "gone" well before the marks. */
const portraitDockLine = () => Math.max(200, window.innerHeight * 0.45);

interface Props {
  /** Pre-optimised small portrait for the header avatar. */
  portraitSrc: string;
  portraitAlt: string;
}

export default function ShapeNav({ portraitSrc, portraitAlt }: Props) {
  const [anchors, setAnchors] = useState<Record<string, HTMLElement>>({});
  const [passed, setPassed] = useState<Record<string, boolean>>({});

  // Anchors are authored in the .astro markup, so they exist before hydration.
  useEffect(() => {
    const found: Record<string, HTMLElement> = {};
    for (const shape of SHAPES) {
      const el = document.querySelector<HTMLElement>(
        `[data-shape-anchor="${shape.id}"]`
      );
      if (el) found[shape.id] = el;
    }

    const portrait = document.querySelector<HTMLElement>(
      "[data-portrait-anchor]"
    );
    if (portrait) found[PORTRAIT_KEY] = portrait;

    setAnchors(found);
  }, []);

  useEffect(() => {
    const keys = Object.keys(anchors);
    if (keys.length === 0) return;

    const measure = () => {
      setPassed((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const key of keys) {
          const line = key === PORTRAIT_KEY ? portraitDockLine() : dockLine();
          const isPassed = anchors[key]!.getBoundingClientRect().bottom < line;
          if (next[key] !== isPassed) {
            next[key] = isPassed;
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    };

    if (!("IntersectionObserver" in window)) {
      measure();
      return subscribePageScroll(measure);
    }

    const observers: IntersectionObserver[] = [];
    let resizeFrame = 0;

    const updatePassed = (key: string, isPassed: boolean) => {
      setPassed((prev) =>
        prev[key] === isPassed ? prev : { ...prev, [key]: isPassed }
      );
    };

    const observeAtLine = (observedKeys: string[], line: number) => {
      // Collapse the observer root to a one-pixel horizontal dock line. The
      // browser tracks crossings in the compositor pipeline, so scrolling no
      // longer forces every anchor through getBoundingClientRect each frame.
      const bottomInset = Math.max(0, window.innerHeight - line - 1);
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const key = (entry.target as HTMLElement).dataset.dockKey;
            if (!key) continue;
            updatePassed(key, entry.boundingClientRect.bottom < line);
          }
        },
        { rootMargin: `-${line}px 0px -${bottomInset}px 0px` }
      );

      for (const key of observedKeys) {
        const anchor = anchors[key];
        if (!anchor) continue;
        anchor.dataset.dockKey = key;
        updatePassed(key, anchor.getBoundingClientRect().bottom < line);
        observer.observe(anchor);
      }
      observers.push(observer);
    };

    const mountObservers = () => {
      observers.splice(0).forEach((observer) => observer.disconnect());
      observeAtLine(
        keys.filter((key) => key !== PORTRAIT_KEY),
        dockLine()
      );
      if (anchors[PORTRAIT_KEY]) {
        observeAtLine([PORTRAIT_KEY], portraitDockLine());
      }
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(mountObservers);
    };

    mountObservers();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
      observers.forEach((observer) => observer.disconnect());
      for (const key of keys) delete anchors[key]?.dataset.dockKey;
    };
  }, [anchors]);

  // Lower `order` sits further right, so newer entries push in from the left.
  const visible = useMemo(
    () => SHAPES.filter((s) => passed[s.id]).sort((a, b) => b.order - a.order),
    [passed]
  );

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) scrollToPageTarget(target);
    return Boolean(target);
  };

  return (
    <>
      {/* Always mounted, so the avatar only ever crosses opacity — mounting it
          on scroll would decode the image mid-fade. */}
      <a
        className={`portrait-dock ${passed[PORTRAIT_KEY] ? "is-visible" : ""}`}
        href="#hero-section"
        aria-label="Back to top"
        aria-hidden={!passed[PORTRAIT_KEY]}
        tabIndex={passed[PORTRAIT_KEY] ? undefined : -1}
        onClick={(event) => {
          if (scrollTo("hero-section")) event.preventDefault();
        }}
      >
        <img
          className="portrait-dock__img"
          src={portraitSrc}
          alt={portraitAlt}
          width={48}
          height={64}
        />
      </a>

      <nav className="shape-nav" aria-label="Sections">
        <ul className="shape-nav__list">
          {visible.map((shape) => (
            <li key={shape.id} className="shape-nav__item">
              <a
                className="shape-nav__button"
                href={`#${shape.target}`}
                onClick={(event) => {
                  if (scrollTo(shape.target)) event.preventDefault();
                }}
              >
                <svg
                  className="shape-nav__mark"
                  viewBox={shape.viewBox}
                  preserveAspectRatio="xMidYMid meet"
                  style={{ aspectRatio: shape.ratio }}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={shape.d} fill={shape.color} />
                </svg>
                <span className="shape-nav__label">{shape.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
