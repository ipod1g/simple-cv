import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { LayoutGroup, LazyMotion, domMax, m } from "@/lib/motion";
import { ICON_PATHS } from "@/lib/icons";
import type { ProjectPortfolioEntry } from "@/lib/portfolioEntries";

/**
 * clipPath carousel after Skiper UI's Skiper54 (skiper-ui.com/v1/skiper54,
 * © @gurvinder-singh02, free use with attribution). Rebuilt on Embla directly
 * rather than shadcn's wrapper — the project has no shadcn scaffolding, and
 * the effect is really just the inset() animation on the focused slide.
 *
 * Clicking the focused card expands it into a panel. The artwork is a shared
 * element (`layoutId`), so framer FLIPs the real node between the two places
 * and the content re-lays out every frame. The View Transitions API was tried
 * first and animates *snapshots* — a card-to-panel morph stretches a bitmap of
 * the old state, on fixed timing, which is what made it feel synthetic.
 */

const CLIP_FOCUSED = "inset(0 0 0 0 round 1.75rem)";
const CLIP_RESTING = "inset(14% 0 14% 0 round 1.75rem)";

/**
 * Unhurried and completely still on arrival — damping is set past critical for
 * the mass, so it eases to a stop rather than settling.
 */
const FLIGHT = {
  type: "spring" as const,
  stiffness: 120,
  damping: 26,
  mass: 1.2,
};

/** The server render has no layout phase, and Embla only exists on the client. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={dir === "prev" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"} />
    </svg>
  );
}

function LinkIcon({ name }: { name: "github" | "link" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d={ICON_PATHS[name]} fill="currentColor" />
    </svg>
  );
}

/** The tinted artwork block — identical in the card and in the panel. */
function Art({
  item,
  layout,
  clock,
}: {
  item: ProjectPortfolioEntry;
  layout: boolean;
  /** Shared playback position per project, so the panel copy resumes. */
  clock: React.RefObject<Map<string, number>>;
}) {
  // The artwork box changes aspect between the card (portrait) and the panel
  // (landscape), and framer animates layout with transforms — so a bare video
  // would be stretched by the non-uniform scale for the whole flight. Giving
  // the media its own `layout` makes framer counter-scale it each frame, so it
  // stays correctly proportioned and re-crops instead of squashing.
  const content = item.video ? (
    <m.video
      layout
      transition={FLIGHT}
      // The card and panel copies are separate nodes, so this is a handover,
      // not one continuous stream — close enough to read as uninterrupted.
      ref={(el) => {
        if (!el) return;
        const at = clock.current.get(item.id);
        if (at != null && Math.abs(el.currentTime - at) > 0.05) {
          el.currentTime = at;
        }
        // A freshly mounted copy sits paused for a frame before autoplay
        // takes over, which shows as a stutter at the start of the flight.
        el.play().catch(() => {});
      }}
      onTimeUpdate={(event) =>
        clock.current.set(item.id, event.currentTarget.currentTime)
      }
      className="pcar__art-video"
      src={item.video}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  ) : (
    <span className="pcar__art-mono" aria-hidden="true">
          {item.monogram}
    </span>
  );

  // Always the same element type: swapping m.span for span would remount the
  // subtree and restart any video inside it. Only the layoutId is dropped,
  // since just one of the two copies may carry it for framer to animate.
  return (
    <m.span
      layoutId={layout ? `art-${item.id}` : undefined}
      className="pcar__art"
      transition={FLIGHT}
      // Shared-layout elements are crossfaded by default, which dips the
      // artwork's opacity as it launches. Both copies are identical, so
      // pinning it keeps the flight solid.
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {content}
    </m.span>
  );
}

export default function ProjectCarousel({
  items,
}: {
  items: ProjectPortfolioEntry[];
}) {
  const reduced = useReducedMotion() ?? false;
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    watchDrag: true,
  });
  const [current, setCurrent] = useState(0);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const clockRef = useRef<Map<string, number>>(new Map());
  const [atTop, setAtTop] = useState(true);

  const open = items.find((item) => item.id === openSlug) ?? null;

  // Reveal only once Embla has actually written its transform. It measures
  // again right after init (fonts, images), so waiting a frame avoids showing
  // the first, provisional position.
  useIsomorphicLayoutEffect(() => {
    if (!embla || !rootRef.current) return;
    const root = rootRef.current;
    const id = requestAnimationFrame(() => root.classList.add("is-ready"));
    return () => cancelAnimationFrame(id);
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setCurrent(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  // showModal() must run against the already-rendered dialog, and before paint
  // so the artwork's first flight frame is on top of the backdrop.
  useIsomorphicLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openSlug && !dialog.open) dialog.showModal();
  }, [openSlug]);

  const close = useCallback(() => {
    // Deliberately asymmetric: it flies open, and fades shut. Flying home
    // needs the artwork's panel-sized box to still be measurable, but the
    // dialog has to be gone for the flight to be visible at all — and
    // deferring the close to win that produced a stalled, snapping animation.
    // A fade is honest and predictable; the CSS handles it.
    dialogRef.current?.close();
    setOpenSlug(null);
    setAtTop(true);
    openerRef.current?.focus();
  }, []);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <LazyMotion features={domMax} strict>
      <LayoutGroup>
        <div className="pcar" ref={rootRef}>
          <div className="pcar__viewport" ref={emblaRef}>
            <ul className="pcar__track">
              {items.map((item, index) => {
                const focused = current === index;
                const isOpen = openSlug === item.id;
                return (
                  <li className="pcar__slide" key={item.id}>
                    <button
                      type="button"
                      className={`pcar__card ${focused ? "is-focused" : ""}`}
                      style={{ ["--accent" as string]: item.accent }}
                      aria-haspopup="dialog"
                      onClick={(event) => {
                        // An unfocused card centres first — expanding a
                        // half-clipped card would fly from a cropped box.
                        if (!focused) {
                          embla?.scrollTo(index);
                          return;
                        }
                        openerRef.current = event.currentTarget;
                        setOpenSlug(item.id);
                      }}
                    >
                      <m.span
                        className="pcar__clip"
                        initial={false}
                        animate={{
                          clipPath:
                            focused || reduced ? CLIP_FOCUSED : CLIP_RESTING,
                        }}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }
                        }
                      >
                        <Art item={item} layout={!isOpen && !reduced} clock={clockRef} />
                      </m.span>

                      <span className="pcar__meta">
                        <m.span
                          className="pcar__title"
                          layoutId={
                            !isOpen && !reduced
                              ? `title-${item.id}`
                              : undefined
                          }
                          transition={FLIGHT}
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                        >
                          {item.title}
                        </m.span>
                        <span className="pcar__sub">
                          {item.subtitle ? `${item.subtitle} · ` : ""}
                          {item.duration}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pcar__controls">
            <button
              type="button"
              className="pcar__arrow"
              onClick={scrollPrev}
              aria-label="Previous project"
            >
              <Arrow dir="prev" />
            </button>

            <div className="pcar__dots">
              {items.map((item, index) => (
                <button
                      key={item.id}
                  type="button"
                  className={`pcar__dot ${current === index ? "is-active" : ""}`}
                  aria-label={item.title}
                  onClick={() => embla?.scrollTo(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="pcar__arrow"
              onClick={scrollNext}
              aria-label="Next project"
            >
              <Arrow dir="next" />
            </button>
          </div>
        </div>

        {/* Native <dialog> for the focus trap, Esc handling and inert
            background; the animation is framer's, not the dialog's. */}
        <dialog
          ref={dialogRef}
          className="pdialog"
          aria-label={open?.title}
          style={open ? { ["--accent" as string]: open.accent } : undefined}
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClick={(event) => {
            if (event.target === dialogRef.current) close();
          }}
          onScroll={(event) => setAtTop(event.currentTarget.scrollTop <= 0)}
          data-lenis-prevent
        >
          {open && (
            <m.div
              className="pdialog__sheet"
              // Only from the top of the scroll, as iOS sheets do — otherwise
              // every downward flick while reading would try to dismiss.
              drag={atTop ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              // Rigid upward, rubber-banded downward.
              dragElastic={{ top: 0, bottom: 0.55 }}
              dragDirectionLock
              onDragEnd={(_event, info) => {
                // Either a decisive flick or a long pull counts as dismiss.
                if (info.velocity.y > 600 || info.offset.y > 160) close();
              }}
            >
              <div className="pdialog__grab" aria-hidden="true"></div>

              <div className="pdialog__dismiss">
                <button
                  type="button"
                  className="pdialog__close"
                  onClick={close}
                  aria-label={`Close ${open.title}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={ICON_PATHS.close} fill="currentColor" />
                  </svg>
                </button>
              </div>

              <div className="pdialog__inner">
                <Art item={open} layout={!reduced} clock={clockRef} />

                <m.p
                  className="pdialog__eyebrow"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.165, 0.84, 0.44, 1],
                    delay: reduced ? 0 : 0.18,
                  }}
                >
                  {open.subtitle && <span>{open.subtitle}</span>}
                  <span>{open.duration}</span>
                </m.p>

                {/* Travels up from the card's caption, so it sits outside the
                    fading copy block — an opacity animation on an ancestor
                    would drag the morphing title along with it. */}
                <m.h2
                  className="pdialog__title"
                  layoutId={reduced ? undefined : `title-${open.id}`}
                  transition={FLIGHT}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  {open.title}
                </m.h2>

                <m.div
                  className="pdialog__copy"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.165, 0.84, 0.44, 1],
                    delay: reduced ? 0 : 0.28,
                  }}
                >
                  {(open.github || open.url) && (
                    <div className="pdialog__links">
                      {open.github && (
                        <a
                          className="pdialog__link"
                          href={open.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${open.title} on GitHub (opens in a new tab)`}
                        >
                          <LinkIcon name="github" />
                        </a>
                      )}
                      {open.url && (
                        <a
                          className="pdialog__link"
                          href={open.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit ${open.title} (opens in a new tab)`}
                        >
                          <LinkIcon name="link" />
                        </a>
                      )}
                    </div>
                  )}

                  <ul className="pdialog__points">
                    {open.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>

                  {open.bodyHtml && (
                    <div
                      className="pdialog__body prose"
                      // Repo-authored markdown, rendered at build time.
                      dangerouslySetInnerHTML={{ __html: open.bodyHtml }}
                    />
                  )}
                </m.div>
              </div>
            </m.div>
          )}
        </dialog>
      </LayoutGroup>
    </LazyMotion>
  );
}
