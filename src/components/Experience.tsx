import React, { useRef } from 'react';
import { motion } from 'framer-motion';
// import './Contents.css';
import ScrollBarIndicator from './ScrollBarIndicator';
import { experienceInfo } from '../constants/Content';

const ExperienceBox = ({ experience }) => {
  const description = () => {
    return Object.keys(experience)
      .filter((objKey) => objKey.startsWith('description'))
      .map((desc) => (
        <React.Fragment key={desc}>
          {desc === 'description1' || <br />}
          <li
            dangerouslySetInnerHTML={{
              __html: experience[desc],
            }}
          ></li>
        </React.Fragment>
      ));
  };

  return (
    <>
      <div
        id="xp-box-wrapper"
        className="before:content-[''] before:bg-white before:inline-block before:absolute before:rounded-full before:border before:border-solid before:border-greyish before:mt-[6px] before:w-[10px] before:h-[10px] before:z-50 before:left-[17px] lg:before:left-[35px]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          viewport={{ once: true }}
        >
          <li
            id="content-box"
            className="w-[70vw] pt-0 pr-3 pb-5 pl-4 mt-4 mx-0 mb-12 list-none box-border glass"
          >
            <h4 className="mt-0 text-lg">{experience.title}</h4>
            <div className="flex justify-between -mt-[18px]">
              <span className="italic text-sm">{experience.jobTitle}</span>
              <span>{experience.duration}</span>
            </div>
            <hr />
            <ul className="mb-3">
              {/* {description()} */}
              {/* )} */}
            </ul>
          </li>
        </motion.div>
      </div>
    </>
  );
};

export default function Experience() {
  // For scrolldimension
  const xpContainerRef = useRef(null);

  return (
    <>
      <ul id="xp-container" ref={xpContainerRef}>
        {experienceInfo.map((experience, i) => (
          <ExperienceBox
            key={'experiencebox' + i}
            experience={experience}
          ></ExperienceBox>
        ))}
      </ul>
      <ScrollBarIndicator ref={xpContainerRef} />
    </>
  );
}
