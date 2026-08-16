import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ICON_PATHS } from "@/lib/icons";
import type { ProjectPortfolioEntry } from "@/lib/portfolioEntries";

/**
 * clipPath carousel after Skiper UI's Skiper54 (skiper-ui.com/v1/skiper54,
 * © @gurvinder-singh02, free use with attribution). Rebuilt on Embla directly
 * rather than shadcn's wrapper — the project has no shadcn scaffolding, and
 * the effect is really just the inset() animation on the focused slide.
 *
 * The carousel is the whole feature: cards no longer expand into a panel, so
 * this island carries no animation library at all. The focus effect is a CSS
 * transition on `clip-path`, which the compositor handles without React in the
 * loop — the only state here is which slide Embla has selected.
 *
 * Playback is deliberately narrow: exactly one video runs, the focused one,
 * and only while the carousel is on screen. Autoplaying every slide is what
 * makes a carousel of videos expensive, and the off-screen ones are decoding
 * frames nobody is looking at.
 */

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
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d={ICON_PATHS[name]} fill="currentColor" />
    </svg>
  );
}

export default function ProjectCarousel({
  items,
}: {
  items: ProjectPortfolioEntry[];
}) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    watchDrag: true,
  });
  const [current, setCurrent] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [onScreen, setOnScreen] = useState(false);

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

  // A carousel scrolled past is still a carousel decoding video, so playback
  // follows visibility as well as focus.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!("IntersectionObserver" in window)) {
      setOnScreen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(Boolean(entry?.isIntersecting)),
      { rootMargin: "200px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // One video plays at a time. The rest are paused and rewound, so a slide
  // scrolled back to starts from the top rather than mid-clip.
  useEffect(() => {
    const focusedId = items[current]?.id;
    for (const [id, video] of videosRef.current) {
      const shouldPlay = onScreen && id === focusedId;
      if (shouldPlay) {
        video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [current, items, onScreen]);

  const registerVideo = useCallback(
    (id: string) => (el: HTMLVideoElement | null) => {
      if (el) videosRef.current.set(id, el);
      else videosRef.current.delete(id);
    },
    []
  );

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div className="pcar" ref={rootRef}>
      <div className="pcar__viewport" ref={emblaRef}>
        <ul className="pcar__track">
          {items.map((item, index) => {
            const focused = current === index;
            return (
              <li className="pcar__slide" key={item.id}>
                <div
                  className={`pcar__card ${focused ? "is-focused" : ""}`}
                  style={{ ["--accent" as string]: item.accent }}
                >
                  <span className="pcar__clip">
                    <span className="pcar__art">
                      {item.video ? (
                        <video
                          ref={registerVideo(item.id)}
                          className="pcar__art-video"
                          src={item.video}
                          muted
                          loop
                          playsInline
                          // Nothing is fetched until this slide is the one
                          // playing — the effect above starts it.
                          preload="none"
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="pcar__art-mono" aria-hidden="true">
                          {item.monogram}
                        </span>
                      )}
                    </span>
                  </span>

                  {/* Only the off-centre cards are clickable, and clicking
                      brings them to the centre. The focused card has no
                      expanded state to open, so it is not a control at all —
                      its links are, and they are real anchors. */}
                  {!focused && (
                    <button
                      type="button"
                      className="pcar__pick"
                      onClick={() => embla?.scrollTo(index)}
                    >
                      <span className="sr-only">Show {item.title}</span>
                    </button>
                  )}

                  <div className="pcar__meta">
                    <span className="pcar__title">{item.title}</span>
                    <span className="pcar__sub">
                      {item.subtitle ? `${item.subtitle} :: ` : ""}
                      {item.duration}
                    </span>

                    {(item.github || item.url) && (
                      <span className="pcar__links">
                        {item.github && (
                          <a
                            className="pcar__link"
                            href={item.github}
                            target="_blank"
                            rel="noreferrer"
                            // Off-centre cards are faded out; leaving their
                            // links tabbable would send focus to a project
                            // the reader cannot see.
                            tabIndex={focused ? undefined : -1}
                            aria-label={`${item.title} on GitHub (opens in a new tab)`}
                          >
                            <LinkIcon name="github" />
                          </a>
                        )}
                        {item.url && (
                          <a
                            className="pcar__link"
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={focused ? undefined : -1}
                            aria-label={`Visit ${item.title} (opens in a new tab)`}
                          >
                            <LinkIcon name="link" />
                          </a>
                        )}
                      </span>
                    )}
                  </div>
                </div>
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
  );
}
