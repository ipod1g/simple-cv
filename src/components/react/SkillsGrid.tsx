import { LazyMotion, domMax, m } from "@/lib/motion";
import { SKILL_GROUPS, SPOKEN_LANGUAGES } from "@/config/site";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut" as const, duration: 0.45 },
  },
};

export default function SkillsGrid() {
  return (
    <LazyMotion features={domMax} strict>
      <m.ul
        className="skills__grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {SKILL_GROUPS.map((group) => (
          <m.li key={group.title} variants={card} className="skills__card">
            <span className="skills__bar" aria-hidden="true" />
            <h3 className="skills__group">{group.title}</h3>
            <ul className="skills__items">
              {group.items.map((name) => (
                <li key={name}>
                  <span className="skills__chip">{name}</span>
                </li>
              ))}
            </ul>
          </m.li>
        ))}
      </m.ul>

      <m.div
        className="skills__languages"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="skills__group">Spoken languages</h3>
        <ul className="skills__items">
          {SPOKEN_LANGUAGES.map((language) => (
            <li key={language}>
              <span className="skills__chip skills__chip--pill">{language}</span>
            </li>
          ))}
        </ul>
      </m.div>
    </LazyMotion>
  );
}
