import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';

const Skills = () => {
  return (
    <>
      <SectionTitle title="Skills" />
      <div id="skills-container" className="p-4 md:ml-12 pb-8">
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
      <div id="credits" className="text-sm mb-20 flex flex-col leading-10">
        <div className="p-4 md:ml-12 mb-2">
          Background image source:
          <a
            className="text-black dark:text-blueish/90"
            target="_blank"
            rel="noreferrer"
            href="https://gifer.com/en/2r4z"
            title=""
          >
            &nbsp; here
          </a>
          <p>Special Thanks to YI Jisoo</p>
        </div>
      </div>
    </>
  );
};

export default Skills;
