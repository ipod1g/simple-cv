import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/common/SectionTitle';

const Skills = () => {
  return (
    <>
      <SectionTitle title="Skills" />
      <div id="skills-container" className="ml-[70px] pr-[50x] pb-4 lg:pb-3">
        <h4 className="text-xl tracking-[4px] underline underline-offset-4 font-semibold">
          Technical
        </h4>
        <p className="py-6">
          JavaScript | HTML/CSS | React | TypeScript | Next.js | Node.js | Figma
        </p>
        <h4 className="text-xl tracking-[4px] underline underline-offset-4 font-semibold">
          Language
        </h4>
        <p className="pt-6"> English - Native | Korean - Native </p>
      </div>
      <hr />
      <div id="credits" className="text-xs mb-20 flex flex-col leading-10">
        <span className="ml-16">
          Background image source:
          <motion.a
            className="text-blueish/90"
            target="_blank"
            rel="noreferrer"
            href="https://gifer.com/en/2r4z"
            title=""
            whileHover={{ scale: 1.15, color: '#c199e5e0' }}
            whileTap={{ scale: 1 }}
          >
            &nbsp; here
          </motion.a>
          <p>Special Thanks to YI Jisoo</p>
        </span>
        <hr />
      </div>
    </>
  );
};

export default Skills;
