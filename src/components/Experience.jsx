import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Contents.css';
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
      <div className="xp-box-wrapper">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          viewport={{ once: true }}
        >
          <li className="content-box">
            <h4>{experience.title}</h4>
            <div className="role-date">
              <span className="role">{experience.jobTitle}</span>
              <span>{experience.duration}</span>
            </div>
            <hr />
            <ul>
              {description()}
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
      <ul className="xp-container" ref={xpContainerRef}>
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
