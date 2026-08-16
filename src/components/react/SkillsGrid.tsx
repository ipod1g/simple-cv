import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { LazyMotion, domAnimation, m } from "@/lib/motion";
import { SKILL_GROUPS, type SkillIcon } from "@/config/site";

const PRIMARY_SKILL_COUNT = 5;

/**
 * Playful scattered clusters: each group is an icon tile + tinted title +
 * pill chips, loosely offset rather than gridded, with hand-drawn doodles
 * (blobs, squiggles, sparkles) floating between them.
 */

/** Stroke icons, 24 viewBox — small enough to keep out of lib/icons.ts. */
const ICON_PATHS: Record<SkillIcon, string> = {
  globe:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3Z",
  code: "m9 8-4 4 4 4m6-8 4 4-4 4",
  server:
    "M4.5 4.5h15a1 1 0 0 1 1 1v4h-17v-4a1 1 0 0 1 1-1Zm-1 9.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-4Zm4-7h.01M7.5 16.5h.01",
  cloud:
    "M7 18.5a4.5 4.5 0 1 1 .84-8.92A5.5 5.5 0 0 1 18.55 11 3.75 3.75 0 0 1 18 18.5H7Z",
  layers: "m12 4 8 4.5-8 4.5-8-4.5L12 4Zm-8 9 8 4.5 8-4.5",
  database:
    "M12 4c4.42 0 8 1.25 8 2.8S16.42 9.6 12 9.6 4 8.35 4 6.8 7.58 4 12 4Zm8 2.8v10.4c0 1.55-3.58 2.8-8 2.8s-8-1.25-8-2.8V6.8m16 5.2c0 1.55-3.58 2.8-8 2.8s-8-1.25-8-2.8",
  card: "M4.5 6h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm-1 4h17m-13 4h4",
  pen: "M4.5 19.5 5.4 16 16.55 4.85a2.05 2.05 0 0 1 2.9 2.9L8.3 18.9l-3.8.6Zm9.5-12.4 2.9 2.9",
};

function Squiggle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 90 18" aria-hidden="true">
      <path
        d="M2 14C14 2 26 2 38 10s24 8 36-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 32 26" aria-hidden="true">
      <path
        d="M4 22 9 14M14 18l1-9M22 19l7-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SkillsGrid() {
  const reduced = useReducedMotion() ?? false;
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set()
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
  };

  const cluster = {
    hidden: reduced ? {} : { opacity: 0, y: 22, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduced ? 0 : 0.7,
        ease: [0.165, 0.84, 0.44, 1] as const,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="skills-scene">
        {/* Decorative scatter — blobs, squiggles, sparkles, stray dots. */}
        <div className="skills-doodles" aria-hidden="true">
          <span className="doodle doodle--blob doodle--blob-a"></span>
          <span className="doodle doodle--blob doodle--blob-b"></span>
          <span className="doodle doodle--blob doodle--blob-c"></span>
          <span className="doodle doodle--blob doodle--blob-d"></span>
          <Squiggle className="doodle doodle--squiggle-a" />
          <Squiggle className="doodle doodle--squiggle-b" />
          <Sparkle className="doodle doodle--sparkle-a" />
          <Sparkle className="doodle doodle--sparkle-b" />
          <span className="doodle doodle--dot doodle--dot-a"></span>
          <span className="doodle doodle--dot doodle--dot-b"></span>
          <span className="doodle doodle--dot doodle--dot-c"></span>
        </div>

        <m.ul
          className="skills-scene__list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {SKILL_GROUPS.map((group) => {
            const expanded = expandedGroups.has(group.title);
            const hiddenCount = Math.max(
              0,
              group.items.length - PRIMARY_SKILL_COUNT
            );
            const visibleItems = expanded
              ? group.items
              : group.items.slice(0, PRIMARY_SKILL_COUNT);
            const listId = `skills-${group.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <m.li
                key={group.title}
                variants={cluster}
                className="skillc"
                style={{ ["--accent" as string]: group.color }}
              >
                <div className="skillc__head">
                  <span className="skillc__icon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={ICON_PATHS[group.icon]} />
                    </svg>
                  </span>
                  <h3 className="skillc__title">{group.title}</h3>
                </div>
                <ul id={listId} className="skillc__chips">
                  {visibleItems.map((name) => (
                    <li key={name} className="skillc__chip">
                      {name}
                    </li>
                  ))}
                </ul>
                {hiddenCount > 0 && (
                  <button
                    type="button"
                    className="skillc__more"
                    aria-expanded={expanded}
                    aria-controls={listId}
                    aria-label={
                      expanded
                        ? `Show primary ${group.title} skills`
                        : `Show ${hiddenCount} more ${group.title} skills`
                    }
                    onClick={() => toggleGroup(group.title)}
                  >
                    {expanded ? "Show primary" : `+${hiddenCount} more`}
                  </button>
                )}
              </m.li>
            );
          })}
        </m.ul>
      </div>
    </LazyMotion>
  );
}
