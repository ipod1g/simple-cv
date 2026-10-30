import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { LazyMotion, domAnimation, m } from "@/lib/motion";
import { SKILL_GROUPS } from "@/config/site";

const PRIMARY_SKILL_COUNT = 5;

export default function SkillsGrid() {
  const reduced = useReducedMotion() ?? false;
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set());

  const toggleGroup = (title: string) => {
    setExpandedGroups(current => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return <LazyMotion features={domAnimation} strict>
    <div className="skills-scene">
      <m.ul className="skills-scene__list"
        variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.06 } } }}
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
        {SKILL_GROUPS.map((group, index) => {
          const expanded = expandedGroups.has(group.title);
          const hiddenCount = Math.max(0, group.items.length - PRIMARY_SKILL_COUNT);
          const visibleItems = expanded ? group.items : group.items.slice(0, PRIMARY_SKILL_COUNT);
          const listId = `skills-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return <m.li key={group.title} className="skillc"
            style={{ ["--accent" as string]: index % 2 ? "var(--color-me)" : "var(--color-accent)" }}
            variants={{
              hidden: reduced ? {} : { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.5, ease: [0.165, 0.84, 0.44, 1] } },
            }}>
            <div className="skillc__head">
              <span className="skillc__icon" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="skillc__title">{group.title}</h3>
            </div>
            <ul id={listId} className="skillc__chips">{visibleItems.map(name => <li key={name} className="skillc__chip">{name}</li>)}</ul>
            {hiddenCount > 0 && <button type="button" className="skillc__more"
              aria-expanded={expanded} aria-controls={listId}
              aria-label={expanded ? `Show primary ${group.title} skills` : `Show ${hiddenCount} more ${group.title} skills`}
              onClick={() => toggleGroup(group.title)}>{expanded ? "Show primary" : `+${hiddenCount} more`} <span aria-hidden="true">↗</span></button>}
          </m.li>;
        })}
      </m.ul>
    </div>
  </LazyMotion>;
}
