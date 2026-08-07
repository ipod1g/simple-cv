import Lenis from "lenis";

/**
 * The layout script and the React islands are separate bundles, so a
 * module-level variable would give us one Lenis per chunk. The instance is
 * parked on `window` so every chunk shares exactly one.
 */
declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getLenis(): Lenis | null {
  return typeof window === "undefined" ? null : window.__lenis ?? null;
}

export function initSmoothScroll(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (window.__lenis !== undefined) return window.__lenis;

  if (prefersReducedMotion()) {
    window.__lenis = null;
    return null;
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  window.__lenis = lenis;
  return lenis;
}

/**
 * Subscribes to scroll position changes and returns an unsubscribe function.
 *
 * Lenis overrides `window.scrollTo` and does not emit native `scroll` events,
 * so a plain window listener silently never fires while it is active. Polling
 * with rAF is not an option either — rAF is suspended in background tabs.
 */
export function subscribeScroll(callback: () => void): () => void {
  const lenis = initSmoothScroll();
  window.addEventListener("resize", callback, { passive: true });

  if (lenis) {
    lenis.on("scroll", callback);
    return () => {
      lenis.off("scroll", callback);
      window.removeEventListener("resize", callback);
    };
  }

  window.addEventListener("scroll", callback, { passive: true });
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

/** Scrolls to an element through Lenis when active, natively otherwise. */
export function scrollToTarget(target: HTMLElement) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -16, duration: 1.2 });
    return;
  }
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}
