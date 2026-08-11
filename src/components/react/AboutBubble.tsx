import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AnimatePresence, LazyMotion, domMax, m } from "@/lib/motion";

/**
 * iMessage-style bubble for the About section. Anatomy mirrors shadcn/ui's
 * Bubble (Content / Reactions, side+align conventions) but is hand-rolled —
 * no shadcn scaffolding, styled with the site's tokens.
 *
 * Reactions are session-local for now. State is shaped as a map behind
 * toggleReaction() so the future all-users version (API + counts) can swap
 * in without changing the component structure.
 */

const REACTIONS = ["👍", "❤️", "🔥", "👏", "😮"] as const;
type Reaction = (typeof REACTIONS)[number];

const REACTION_LABELS: Record<Reaction, string> = {
  "👍": "thumbs up",
  "❤️": "heart",
  "🔥": "fire",
  "👏": "clap",
  "😮": "wow",
};

/** Delay between the bubble being seen and the receipt flipping to Read. */
const READ_DELAY_MS = 900;

const POP = { type: "spring" as const, stiffness: 500, damping: 26, mass: 0.8 };

function Burst({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <span className="bubble-burst" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <m.span
          key={i}
          className="bubble-burst__dot"
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0.4,
            x: Math.cos((i / 6) * Math.PI * 2) * 22,
            y: Math.sin((i / 6) * Math.PI * 2) * 22,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </span>
  );
}

export default function AboutBubble({ paragraphs }: { paragraphs: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<SVGSVGElement>(null);
  const [read, setRead] = useState(false);
  const [sentAt, setSentAt] = useState("");
  const [reactions, setReactions] = useState<Record<string, boolean>>({});
  const [burstKey, setBurstKey] = useState<string | null>(null);
  const reduced = useReducedMotion() ?? false;

  // Visitor's local time — the conversation is happening "now".
  useEffect(() => {
    setSentAt(
      new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date())
    );
  }, []);

  // Couple the tail to the portrait: the tail's tip tracks the horizontal
  // centre of [data-portrait-anchor]. The two live in different grid cells
  // (and swap from one column to two at 768px), so no static CSS offset can
  // stay aligned — measure instead. Both are in normal flow, so the offset
  // between them is scroll-invariant; only resize/reflow can change it.
  useEffect(() => {
    const root = rootRef.current;
    const portrait = document.querySelector<HTMLElement>(
      "[data-portrait-anchor]"
    );
    if (!root || !portrait) return;

    const align = () => {
      const tailWidth = tailRef.current?.getBoundingClientRect().width ?? 24;
      const rootBox = root.getBoundingClientRect();
      const portraitBox = portrait.getBoundingClientRect();
      if (!rootBox.width) return;

      const tip = portraitBox.left + portraitBox.width / 2 - rootBox.left;
      // Keep the tail on the bubble's rounded top edge, clear of the corners.
      const min = 24;
      const max = Math.max(min, rootBox.width - tailWidth - 24);
      root.style.setProperty(
        "--tail-x",
        `${Math.min(Math.max(tip - tailWidth / 2, min), max)}px`
      );
    };

    align();
    const observer = new ResizeObserver(align);
    observer.observe(root);
    observer.observe(portrait);
    window.addEventListener("resize", align, { passive: true });
    // Webfont swap reflows the hero copy above the portrait.
    document.fonts?.ready.then(align).catch(() => {});

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", align);
    };
  }, []);

  // Delivered → Read, once, shortly after the bubble is actually seen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || read) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(() => setRead(true), READ_DELAY_MS);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleReaction = (emoji: Reaction) => {
    setReactions((prev) => {
      const next = { ...prev, [emoji]: !prev[emoji] };
      if (next[emoji]) setBurstKey(`${emoji}-${Date.now()}`);
      return next;
    });
  };

  const active = REACTIONS.filter((emoji) => reactions[emoji]);

  return (
    <LazyMotion features={domMax} strict>
      <div ref={rootRef} className="bubble">
        {/* Tail — exact SVG path, pointing up at the portrait. */}
        <svg
          ref={tailRef}
          className="bubble__tail"
          viewBox="0 0 24 14"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M2 14 C6 14 10 11 12 0 C14 11 18 14 22 14 Z" />
        </svg>

        <div className="bubble__surface">
          <div className="bubble__content">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="bubble__meta" aria-hidden="true">
            <span>{sentAt}</span>
            <span
              className={`bubble__status ${read ? "bubble__status--read" : ""}`}
            >
              <span className="bubble__status-text">
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={read ? "read" : "delivered"}
                    initial={reduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {read ? "Read" : "Delivered"}
                  </m.span>
                </AnimatePresence>
              </span>
              <svg
                className="bubble__ticks"
                viewBox="0 0 20 12"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M1 6.5 L4.5 10 L11 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6.5 L11.5 10 L18 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* Selected reactions — overlapped chips, bottom-right (tail is up). */}
          <AnimatePresence>
            {active.length > 0 && (
              <m.span
                className="bubble__reactions"
                initial={reduced ? false : { opacity: 0, scale: 0.6, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.6, y: 6 }}
                transition={POP}
                aria-hidden="true"
              >
                <AnimatePresence>
                  {active.map((emoji) => (
                    <m.span
                      key={emoji}
                      className="bubble__reaction-chip"
                      initial={reduced ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={reduced ? undefined : { scale: 0 }}
                      transition={POP}
                    >
                      {emoji}
                      {burstKey?.startsWith(emoji) && (
                        <Burst key={burstKey} reduced={reduced} />
                      )}
                    </m.span>
                  ))}
                </AnimatePresence>
              </m.span>
            )}
          </AnimatePresence>
        </div>

        {/* Understated, always-visible picker. */}
        <div
          className="bubble__picker"
          role="group"
          aria-label="React to this message"
        >
          {REACTIONS.map((emoji) => (
            <m.button
              key={emoji}
              type="button"
              className="bubble__picker-btn"
              aria-pressed={Boolean(reactions[emoji])}
              aria-label={`React with ${REACTION_LABELS[emoji]}`}
              onClick={() => toggleReaction(emoji)}
              whileTap={reduced ? undefined : { scale: 0.82 }}
              whileHover={reduced ? undefined : { scale: 1.15, y: -2 }}
              transition={POP}
            >
              <span aria-hidden="true">{emoji}</span>
            </m.button>
          ))}
        </div>
      </div>
    </LazyMotion>
  );
}
