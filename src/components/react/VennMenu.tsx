import { useCallback, useEffect, useRef, useState } from "react";
import { animate, type AnimationPlaybackControls } from "@/lib/motion";
import { flightDuration, frameAt } from "@/lib/vennMenuTimeline";
import { NAV, SITE, SOCIALS } from "@/config/site";
import {
  scrollToPageTarget,
  setPageScrollLocked,
  subscribePageScroll,
} from "@/lib/pageInteractionRuntime";

/**
 * Full-screen overlay nav: a ring of huge circles flies in from off-screen and
 * settles into an overlapping venn field, with the links wiping up behind it.
 *
 * Everything on screen is a pure function of ONE number — `progress`, 0 closed
 * to 1 open, whose shape lives in `vennMenuTimeline` — and opening or closing
 * just animates that number to its end. That is what makes a rapid toggle
 * seamless: there are no per-element animations to fall out of step, so an
 * interruption is a single scalar changing direction from wherever it is.
 *
 * This component only owns the DOM side of that: reading the frame and writing
 * it out as plain transforms — the field's swing on the field, each circle's
 * position on its spoke — so the circles themselves never re-render.
 */

/**
 * Three spokes on a 48vmax ring, in vmax before the flight's zoom spreads them.
 * Each circle is far wider than the ring, so at zoom 1 they all reach across
 * the middle and it is the `multiply` overlaps — not the circles — that draw
 * the picture. Three is the count that keeps those overlaps readable: every
 * extra circle multiplies the middle again and the whole field goes to mud.
 */
const DOTS = [
  { x: -41.568, y: -24, color: "#f4564f" },
  { x: 41.568, y: -24, color: "#4c82f7" },
  { x: 0, y: 48, color: "#3fbf4c" },
] as const;

/** Seconds for the ring to carry the whole arrangement once around. */
const RING_PERIOD = 180;
const RADIANS = Math.PI / 180;

const PRIMARY_LINKS = [
  { label: "Me", href: "#hero-section" },
  ...NAV.map((item) => ({ label: item.label, href: item.href })),
] as const;

/**
 * The portrait reads as "gone" well before it fully clears, so the dock line
 * sits some way down the viewport — but never further down than the portrait's
 * own midpoint, or a short portrait on a tall window would count as passed
 * while still fully on screen, and the docked copy would sit beside the real
 * one from the moment the page loads.
 */
const portraitDockLine = (anchor: HTMLElement) =>
  Math.min(
    Math.max(200, window.innerHeight * 0.45),
    anchor.getBoundingClientRect().height * 0.5
  );

interface Props {
  /** Pre-optimised small portrait for the back-to-top button. */
  portraitSrc: string;
  portraitAlt: string;
}

export default function VennMenu({ portraitSrc, portraitAlt }: Props) {
  const [open, setOpen] = useState(false);
  const [portraitPassed, setPortraitPassed] = useState(false);

  const fieldRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLUListElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const runningRef = useRef<AnimationPlaybackControls | null>(null);
  /** Where the overlay is on its timeline right now: 0 closed, 1 open. */
  const progressRef = useRef(0);

  /**
   * The elements the flight writes to, collected once. `render` runs on every
   * animation frame, and querying the DOM from inside it made each frame pay
   * for a tree walk it already knew the answer to.
   */
  const nodesRef = useRef<{ links: HTMLElement[]; dots: HTMLElement[] }>({
    links: [],
    dots: [],
  });

  /**
   * The drift: how the settled field keeps moving. Seeded fresh per opening —
   * the ring's whole turn, and each circle walking its own small loop — so the
   * picture is never twice the same.
   *
   * `elapsed` is the drift's own clock, in seconds, and it only advances while
   * the menu is open. Holding it still while closed is what stops the field
   * rewinding to its seed the moment a close begins.
   */
  const driftRef = useRef({
    elapsed: 0,
    ringSpin: 0,
    circles: DOTS.map(() => ({ x: 0, y: 0, phase: 0, period: 24 })),
  });
  const driftRafRef = useRef<number | null>(null);
  const driftClockRef = useRef(0);

  /** Also read per frame otherwise: matchMedia is a live object, not a value. */
  const reducedRef = useRef(false);
  /** px per vmax — the unit the circle positions are authored in. */
  const vmaxRef = useRef(0);

  const collectNodes = useCallback(() => {
    const field = fieldRef.current;
    nodesRef.current = {
      links: primaryRef.current
        ? Array.from(primaryRef.current.querySelectorAll<HTMLElement>("a"))
        : [],
      dots: field
        ? Array.from(field.querySelectorAll<HTMLElement>(".venn-menu__dot"))
        : [],
    };
  }, []);

  /* ----------------------------------------------------------------
     Back-to-top portrait — unchanged behaviour from the old shape nav.
     ---------------------------------------------------------------- */
  useEffect(() => {
    const anchor = document.querySelector<HTMLElement>("[data-portrait-anchor]");
    if (!anchor) return;

    const measure = () => {
      const passed =
        anchor.getBoundingClientRect().bottom < portraitDockLine(anchor);
      setPortraitPassed((prev) => (prev === passed ? prev : passed));
    };

    measure();
    return subscribePageScroll(measure);
  }, []);

  /* ----------------------------------------------------------------
     Open / close flight
     ---------------------------------------------------------------- */

  const stopRunning = () => {
    runningRef.current?.stop();
    runningRef.current = null;
  };

  /**
   * Re-seed each circle's drift so the settled field is never twice the same
   * picture — the original site's one real flourish. Only ever called from a
   * standstill: re-seeding mid-flight would jump the field sideways, which is
   * exactly the seam a rapid toggle must not show.
   */
  const randomize = () => {
    driftRef.current.ringSpin = Math.random() * 360;
    driftRef.current.circles = DOTS.map(() => ({
      // How far off its own centre each circle pivots, and so how wide a loop
      // it walks — up to 7.44vmax, small beside the 48vmax ring it sits on.
      x: Math.random() * 14.88 - 7.44,
      y: Math.random() * 14.88 - 7.44,
      phase: Math.random() * 360,
      period: 20 + Math.random() * 20,
    }));
  };

  /** Paint the whole overlay for a point on the timeline. */
  const render = useCallback((progress: number) => {
    const field = fieldRef.current;
    const bg = bgRef.current;
    if (!field || !bg) return;

    progressRef.current = progress;
    const { links, dots } = nodesRef.current;
    const frame = frameAt(progress, links.length, {
      reduced: reducedRef.current,
    });

    bg.style.opacity = `${frame.plate}`;

    // Written straight onto the elements as transforms rather than through
    // `--menu-zoom` / `--menu-rotation`. A custom property changing on this
    // element invalidates style for everything beneath it, so the old version
    // paid for a subtree style recalc on every frame of the flight; a
    // transform is a property the compositor can take on its own.
    field.style.transform = `rotate(${frame.rotation}deg)`;

    // Each circle's position is the flight and the drift resolved together,
    // as one translation: out along its spoke, offset by the small loop it
    // walks, and the whole arrangement turned by the ring's slow spin.
    const drift = driftRef.current;
    const vmax = vmaxRef.current;
    const unit = vmax * frame.zoom;
    const ring = (drift.ringSpin + (drift.elapsed / RING_PERIOD) * 360) * RADIANS;
    const ringCos = Math.cos(ring);
    const ringSin = Math.sin(ring);

    for (let index = 0; index < dots.length; index++) {
      const spoke = DOTS[index];
      const circle = drift.circles[index];
      if (!spoke || !circle) continue;

      // A circle turning about a point off its own centre simply walks that
      // centre around the point — which is all the per-circle drift ever was,
      // so it costs two trig calls here instead of a compositor layer.
      const turn = (circle.phase + (drift.elapsed / circle.period) * 360) * RADIANS;
      const cos = Math.cos(turn);
      const sin = Math.sin(turn);
      const pivotX = circle.x * vmax;
      const pivotY = circle.y * vmax;

      // Unzoomed: the drift is a fixed wobble, not part of the flight's spread.
      const x = spoke.x * unit + pivotX - (pivotX * cos - pivotY * sin);
      const y = spoke.y * unit + pivotY - (pivotX * sin + pivotY * cos);

      dots[index]!.style.transform = `translate3d(${
        x * ringCos - y * ringSin
      }px, ${x * ringSin + y * ringCos}px, 0)`;
    }

    for (let index = 0; index < links.length; index++) {
      links[index]!.style.transform = `translate3d(0, ${frame.links[index]}%, 0)`;
    }

    const tail = tailRef.current;
    if (tail) {
      tail.style.transform = `translate3d(0, ${frame.tail.offsetRem}rem, 0)`;
      tail.style.opacity = `${frame.tail.opacity}`;
    }
  }, []);

  /**
   * The drift's own loop, running only once the field has settled open. It is
   * deliberately not running during the flight: the flight already repaints
   * every frame, and freezing the drift's clock across it leaves the circles
   * exactly where they were rather than jumping them on.
   */
  const stopDrift = useCallback(() => {
    if (driftRafRef.current == null) return;
    cancelAnimationFrame(driftRafRef.current);
    driftRafRef.current = null;
  }, []);

  const startDrift = useCallback(() => {
    if (driftRafRef.current != null || reducedRef.current) return;
    driftClockRef.current = performance.now();

    const tick = (now: number) => {
      driftRef.current.elapsed += (now - driftClockRef.current) / 1000;
      driftClockRef.current = now;
      render(progressRef.current);
      driftRafRef.current = requestAnimationFrame(tick);
    };

    driftRafRef.current = requestAnimationFrame(tick);
  }, [render]);

  const play = useCallback(
    (toOpen: boolean) => {
      if (!fieldRef.current || !bgRef.current) return;

      const from = progressRef.current;
      const to = toOpen ? 1 : 0;
      // Nothing to fly: leave a settled field drifting rather than stalling it.
      if (from === to) return;

      stopDrift();
      stopRunning();

      // Re-seeding the drift is only safe from a standstill; mid-flight it
      // would jump the field sideways — the one seam a rapid toggle can show.
      if (toOpen && from === 0) randomize();

      // Linear, because the easing already lives inside each segment of the
      // frame — easing the scalar as well would ease it twice and stall at the
      // handover from one segment to the next.
      runningRef.current = animate(from, to, {
        duration: flightDuration(from, to, { reduced: reducedRef.current }),
        ease: "linear",
        onUpdate: render,
        onComplete: () => {
          runningRef.current = null;
          if (toOpen) startDrift();
        },
      });
    },
    [render, startDrift, stopDrift]
  );

  // Paint the closed state on mount rather than flying to it: from here on
  // every value on screen comes from `render`, never from the stylesheet.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      collectNodes();
      render(0);
      return;
    }
    play(open);
    setPageScrollLocked(open);
  }, [open, play, render, collectNodes]);

  // The circle positions are authored in vmax and now written as pixels, so
  // the conversion has to be re-taken whenever the viewport changes — and the
  // current frame repainted at the new scale.
  useEffect(() => {
    const measure = () => {
      vmaxRef.current =
        Math.max(window.innerWidth, window.innerHeight) / 100;
      render(progressRef.current);
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [render]);

  // Cached rather than queried per frame, and kept live so a preference
  // changed mid-session still takes effect.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedRef.current = query.matches;
      render(progressRef.current);
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [render]);

  useEffect(() => {
    return () => {
      stopDrift();
      stopRunning();
      setPageScrollLocked(false);
    };
  }, [stopDrift]);

  // Escape closes, and focus returns to the toggle so the tab order survives.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const goTo = (href: string) => {
    const target = document.getElementById(href.replace("#", ""));
    setOpen(false);
    if (!target) return false;
    // Let the overlay start clearing before the page moves underneath it.
    window.setTimeout(() => scrollToPageTarget(target), 120);
    return true;
  };

  return (
    <>
      <a
        className={`portrait-dock ${portraitPassed ? "is-visible" : ""}`}
        href="#hero-section"
        aria-label="Back to top"
        aria-hidden={!portraitPassed}
        tabIndex={portraitPassed ? undefined : -1}
        onClick={(event) => {
          if (goTo("#hero-section")) event.preventDefault();
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

      <div className={`venn-menu ${open ? "is-open" : ""}`}>
        {/* The circles live inside the plate: its opacity fades the whole
            field in as one, and its own white is what they multiply against. */}
        <div className="venn-menu__bg" ref={bgRef} aria-hidden="true">
          {/* The field swings as it flies in; each circle drifts on its own
              slow loop once it lands. Both are `render`'s to write. */}
          <div className="venn-menu__field" ref={fieldRef}>
            <div className="venn-menu__ring">
              {/* Position comes from `render`, which writes each dot's
                  transform in pixels — the spoke offsets live in DOTS. */}
              {DOTS.map((dot) => (
                <div key={dot.color} className="venn-menu__dot">
                  <div className="venn-menu__orbit">
                    <div
                      className="venn-menu__circle"
                      style={{ background: dot.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          ref={toggleRef}
          className="venn-menu__toggle"
          aria-expanded={open}
          aria-controls="venn-menu-panel"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="venn-menu__toggle-label">
            {open ? "Close" : "Menu"}
          </span>
        </button>

        <div
          className="venn-menu__panel"
          id="venn-menu-panel"
          ref={panelRef}
          aria-hidden={!open}
          // Keeps the closed panel's links out of the tab order without
          // unmounting them — the flight animates the same elements each time.
          inert={!open}
        >
          <nav className="venn-menu__nav" aria-label="Sections">
            <ul className="venn-menu__primary" ref={primaryRef}>
              {PRIMARY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      if (goTo(link.href)) event.preventDefault();
                    }}
                  >
                    <span className="venn-menu__dotIcon" aria-hidden="true" />
                    <span className="venn-menu__linkText">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="venn-menu__tail" ref={tailRef}>
            <a className="venn-menu__cv" href={SITE.cvUrl} target="_blank" rel="noreferrer">
              Résumé
            </a>
            <ul className="venn-menu__socials">
              {SOCIALS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
