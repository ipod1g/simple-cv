import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ScrollBarIndicator from './ScrollBarIndicator';
// import './Contents.css';
import { extracurricularInfo } from '../constants/Content';

library.add(faGithub);

const ExtrasBox = ({ extracurricular }) => {
  return (
    <>
      <div
        id="extras-box-wrapper"
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
            className="w-[70vw] pt-0 pr-3 pb-5 pl-4 mt-4 mx-0 mb-12 list-none box-border glass
            lg:w-[50vw] lg:ml-[55px] lg:mr-[50px] lg:pr-[18px]
            "
          >
            <div className="flex flex-col">
              <div className="flex gap-3">
                <a
                  id="company"
                  className="transition-all hover:transition-all hover:text-purple-400/70 hover:text-line-purple hover:scale-105"
                  href={extracurricular.refLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {extracurricular.title}
                </a>
                {extracurricular.repoLink && (
                  <>
                    |
                    <motion.a
                      target="_blank"
                      rel="noreferrer"
                      href={extracurricular.repoLink}
                      className="text-blueish/90 mt-[1px]"
                      title=""
                      whileHover={{
                        scale: 1.15,
                        color: '#c199e5e0',
                      }}
                      whileTap={{ scale: 1 }}
                    >
                      <FontAwesomeIcon
                        icon={faGithub}
                        // icon="fa-brands fa-github"
                      />
                    </motion.a>
                  </>
                )}
              </div>
              <div className="flex justify-between -mt-[18px]">
                <span className="italic text-sm">{extracurricular.role}</span>
                <span>{extracurricular.duration}</span>
              </div>
              <hr />
              <ul>
                <li
                  dangerouslySetInnerHTML={{
                    __html: extracurricular.description1,
                  }}
                ></li>
                {extracurricular.description2 && (
                  <>
                    <br />
                    <li
                      dangerouslySetInnerHTML={{
                        __html: extracurricular.description2,
                      }}
                    ></li>
                  </>
                )}
                {extracurricular.description3 && (
                  <>
                    <br />
                    <li
                      dangerouslySetInnerHTML={{
                        __html: extracurricular.description3,
                      }}
                    ></li>
                  </>
                )}
              </ul>
            </div>
          </li>
        </motion.div>
      </div>
    </>
  );
};

export default function Extras() {
  // For scrolldimension
  const extrasContainerRef = useRef(null);

  return (
    <>
      <ul className="xp-container" ref={extrasContainerRef}>
        {extracurricularInfo.map((extracurricular, i) => (
          <ExtrasBox
            key={'extrabox' + i}
            extracurricular={extracurricular}
          ></ExtrasBox>
        ))}
      </ul>
      <ScrollBarIndicator ref={extrasContainerRef} />
    </>
  );
}
