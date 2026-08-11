import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AnimatePresence, LazyMotion, domMax, m } from "@/lib/motion";
import { mountSplitLineReveals } from "@/lib/pageInteractionRuntime";
import type { ExperiencePortfolioEntry } from "@/lib/portfolioEntries";

/**
 * Evozyne-style product list, repurposed for work history: a flat stack of
 * oversized titles that expand one at a time. Each entry carries its own hue,
 * which only surfaces on hover/expand so the page stays black-on-white at rest.
 */

/** Slow, long-tailed ease — the reference's reveals decelerate for a while. */
const EASE = [0.16, 1, 0.3, 1] as const;

/** Text-swap hover: the label rides up as an identical clone rides in. */
function SwapLabel({ children }: { children: string }) {
  return (
    <span className="swap">
      <span className="swap__line">{children}</span>
      <span className="swap__line swap__line--clone" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

function Item({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: ExperiencePortfolioEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const panelId = `${uid}-panel`;
  const reduced = useReducedMotion() ?? false;

  return (
    <m.article
      className={`xp ${isOpen ? "is-open" : ""}`}
      style={{ ["--accent" as string]: item.accent }}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
    >
      <h3 className="xp__heading">
        <button
          type="button"
          className="xp__toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="xp__eyebrow">
            {item.subtitle && <span>{item.subtitle}</span>}
            <time dateTime={item.iso}>{item.duration}</time>
          </span>

          {/* The full name goes in a sibling so the splitter, which rewrites
              textContent, never swallows the screen-reader-only text. */}
          <span className="xp__title" data-split-lines>
            {item.displayTitle}
          </span>
          {item.displayTitle !== item.title && (
            <span className="sr-only">{item.title}</span>
          )}

          {/* Plus that rotates into a cross, as the reference's toggle does. */}
          <span className="xp__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 4 V20 M4 12 H20" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            key="panel"
            id={panelId}
            className="xp__panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { height: 0 } : { height: 0, opacity: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    height: { duration: 0.6, ease: EASE },
                    opacity: { duration: 0.35, ease: "easeOut" },
                  }
            }
          >
            <div className="xp__panel-inner">
              {item.abstract && <p className="xp__abstract">{item.abstract}</p>}

              <ul className="xp__points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {item.url && (
                <a
                  className="xp__cta"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SwapLabel>Visit site</SwapLabel>
                  <span className="sr-only">
                    {" "}
                    — {item.title} (opens in a new tab)
                  </span>
                  <svg
                    className="xp__cta-arrow"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M6 18 L18 6 M9 6 H18 V15" />
                  </svg>
                </a>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.article>
  );
}

export default function ExperienceAccordion({
  items,
}: {
  items: ExperiencePortfolioEntry[];
}) {
  // One open at a time, most recent role expanded on arrival.
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const listRef = useRef<HTMLDivElement>(null);

  // Run after hydration, not from the layout script: React owns this subtree
  // and would discard any spans injected into it before mount.
  useEffect(() => {
    if (!listRef.current) return;
    return mountSplitLineReveals(listRef.current);
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <div className="xp-list" ref={listRef}>
        {items.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            index={index}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>
    </LazyMotion>
  );
}
