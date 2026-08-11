import Lenis from "lenis";

/**
 * Browser-side coordination for arrival, reveal, scrolling, focus, and dialog
 * behavior. Astro document code and hydrated React islands share this module;
 * Lenis therefore lives on window rather than in either bundle.
 */

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

const SPLIT_SELECTOR = "[data-split-lines]";
const splitSources = new WeakMap<HTMLElement, string>();

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getLenis(): Lenis | null {
  return typeof window === "undefined" ? null : window.__lenis ?? null;
}

function initSmoothScroll(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (window.__lenis !== undefined) return window.__lenis;

  if (prefersReducedMotion()) {
    window.__lenis = null;
    return null;
  }

  const lenis = new Lenis({
    // Keep wheel motion polished without letting the page trail the gesture
    // for a full second. The quartic curve responds early, then settles softly.
    duration: 0.8,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
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

function isRestoredNavigation(): boolean {
  const entry = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;
  return entry?.type === "back_forward" || window.scrollY > 0;
}

function isOnScreen(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function settleInstantly(element: Element, ...classes: string[]): void {
  element.classList.add("is-instant", ...classes);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => element.classList.remove("is-instant"));
  });
}

function splitOne(element: HTMLElement): void {
  const source = splitSources.get(element) ?? element.textContent ?? "";
  if (!splitSources.has(element)) splitSources.set(element, source);

  const words = source.split(/\s+/).filter(Boolean);
  if (words.length === 0) return;

  element.textContent = "";
  const spans = words.map((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    element.append(span);
    if (index < words.length - 1) {
      element.append(document.createTextNode(" "));
    }
    return span;
  });

  const lines: HTMLSpanElement[][] = [];
  let lastTop: number | null = null;
  for (const span of spans) {
    const top = span.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) > 1) {
      lines.push([span]);
      lastTop = top;
    } else {
      lines[lines.length - 1]!.push(span);
    }
  }

  element.textContent = "";
  lines.forEach((lineWords, lineIndex) => {
    const line = document.createElement("span");
    line.className = "line";
    line.style.setProperty("--index", String(lineIndex));
    lineWords.forEach((span, wordIndex) => {
      line.append(span);
      if (wordIndex < lineWords.length - 1) {
        line.append(document.createTextNode(" "));
      }
    });
    element.append(line);
    if (lineIndex < lines.length - 1) {
      element.append(document.createTextNode(" "));
    }
  });

  element.classList.add("is-split");
}

function unsplit(element: HTMLElement): void {
  const source = splitSources.get(element);
  if (source != null) element.textContent = source;
  element.classList.add("is-split");
}

/**
 * Mounts split-line measurement and reveal behavior under a caller-owned root.
 * Hydrated islands use this scoped lifecycle after React has mounted.
 */
export function mountSplitLineReveals(root: ParentNode): () => void {
  let targets = Array.from(root.querySelectorAll<HTMLElement>(SPLIT_SELECTOR));

  if (root === document) {
    targets = targets.filter((element) => !element.closest("astro-island"));
  }

  if (targets.length === 0) return () => {};

  if (prefersReducedMotion()) {
    targets.forEach((element) => {
      unsplit(element);
      element.classList.add("is-inview");
    });
    return () => {};
  }

  const splitAll = () => targets.forEach(splitOne);
  splitAll();

  const restored = isRestoredNavigation();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((element) => {
    if (restored && isOnScreen(element)) {
      settleInstantly(element, "is-inview");
      return;
    }
    observer.observe(element);
  });

  let lastWidth = window.innerWidth;
  const onResize = () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    splitAll();
  };
  window.addEventListener("resize", onResize, { passive: true });
  document.fonts?.ready.then(splitAll).catch(() => {});

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", onResize);
  };
}

function mountHashNavigation(): () => void {
  const onClick = (event: MouseEvent) => {
    const link = (event.target as HTMLElement)?.closest?.(
      'a[href^="#"]'
    ) as HTMLAnchorElement | null;
    if (!link || link.dataset.noSmooth != null) return;

    const id = link.getAttribute("href")!.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    scrollToPageTarget(target);
    history.replaceState(null, "", `#${id}`);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

function mountDialogs(): () => void {
  const cleanups: Array<() => void> = [];

  for (const trigger of document.querySelectorAll<HTMLButtonElement>(
    "[data-dialog-open]"
  )) {
    const dialog = document.getElementById(
      trigger.dataset.dialogOpen!
    ) as HTMLDialogElement | null;
    if (!dialog) continue;

    const open = () => dialog.showModal();
    const restoreFocus = () => trigger.focus();
    const dismissBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };

    trigger.addEventListener("click", open);
    dialog.addEventListener("close", restoreFocus);
    dialog.addEventListener("click", dismissBackdrop);
    cleanups.push(() => {
      trigger.removeEventListener("click", open);
      dialog.removeEventListener("close", restoreFocus);
      dialog.removeEventListener("click", dismissBackdrop);
    });
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}

function mountGenericReveals(): () => void {
  const reveals = document.querySelectorAll(".reveal");
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-revealed"));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -40px 0px" }
  );

  const restored = isRestoredNavigation();
  reveals.forEach((element) => {
    if (restored && isOnScreen(element)) {
      settleInstantly(element, "is-revealed");
      return;
    }
    observer.observe(element);
  });

  return () => observer.disconnect();
}

/** Mounts the complete document interaction lifecycle. */
export function mountPageInteractionRuntime(): () => void {
  initSmoothScroll();
  const cleanups = [
    mountSplitLineReveals(document),
    mountHashNavigation(),
    mountDialogs(),
    mountGenericReveals(),
  ];
  return () => cleanups.forEach((cleanup) => cleanup());
}

/** Subscribe to page scroll changes regardless of Lenis or native scrolling. */
export function subscribePageScroll(callback: () => void): () => void {
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

/** Scroll to a page target with the active runtime policy. */
export function scrollToPageTarget(target: HTMLElement): void {
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
