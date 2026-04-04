import React from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tanstack Start", "Vue", "Astro"],
  },
  {
    title: "Backend & infra",
    items: [
      "Node.js",
      "Cloudflare Workers",
      "AWS",
      "Google Cloud",
      "GitHub Actions",
    ],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    title: "Design & tooling",
    items: ["Figma", "Storybook"],
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut" as const, duration: 0.45 },
  },
};

const Skills = () => {
  return (
    <>
      <SectionTitle title="Skills" />
      <div id="skills-container" className="p-4 md:ml-12 pb-10">
        <motion.div
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 max-w-5xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {SKILL_GROUPS.map((group) => (
            <motion.article
              key={group.title}
              variants={item}
              className="group relative overflow-hidden rounded-lg border border-neutral-300/25 bg-white/60 px-5 py-5 dark:border-neutral-600/25 dark:bg-black/35 backdrop-blur-sm transition-colors duration-300 hover:border-[#c9a96e]/50 dark:hover:border-[#c9a96e]/40"
            >
              <div
                className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#c9a96e] to-[#c9a96e]/40 opacity-80 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <h3 className="pl-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                {group.title}
              </h3>
              <ul className="pl-3 flex flex-wrap gap-2">
                {group.items.map((name) => (
                  <li key={name} className="leading-normal">
                    <span className="inline-block rounded-md border border-neutral-200/80 bg-neutral-50/90 px-2.5 py-1 text-sm text-neutral-800 transition-colors duration-200 dark:border-neutral-700/80 dark:bg-neutral-900/60 dark:text-neutral-100 group-hover:border-[#c9a96e]/35 dark:group-hover:border-[#c9a96e]/30">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 max-w-md"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
            Spoken languages
          </h4>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-neutral-300/40 px-4 py-2 text-sm font-medium dark:border-neutral-600/50">
              English — Native
            </span>
            <span className="rounded-full border border-neutral-300/40 px-4 py-2 text-sm font-medium dark:border-neutral-600/50">
              Korean — Native
            </span>
          </div>
        </motion.div>
      </div>
      <hr />
      <div id="credits" className="text-sm mb-20 flex flex-col leading-10">
        <div className="p-4 md:ml-12 mb-2">
          <p className="text-neutral-600 dark:text-neutral-400">
            Special thanks to YI Jisoo
          </p>
        </div>
      </div>
    </>
  );
};

export default Skills;
