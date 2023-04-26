import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  return (
    <>
      <h3>Skills</h3>
      <div id="skills-container" className="ml-[70px] pr-[50x] pb-4 lg:pb-3">
        <h4 className="text-xl tracking-widest underline">Technical</h4>
        <p>
          JavaScript | HTML/CSS | React | TypeScript | Next.js | Node.js | Figma
        </p>
        <h4 className="text-xl tracking-widest underline">Language</h4>
        <p> English - Native | Korean - Native </p>
      </div>
      <hr />
      <div id="credits" className="text-sm mb-20 flex flex-col">
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
            here
          </motion.a>
          <p>Special Thanks to YI Jisoo</p>
        </span>
        <hr />
      </div>
    </>
  );
};

export default Skills;
