import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ScrollBarIndicator from './ScrollBarIndicator';
import './Contents.css';
import { extracurricularInfo } from '../constants/Content';

library.add(faGithub);

const ExtrasBox = ({ extracurricular }) => {
  return (
    <>
      <div className="extras-box-wrapper">
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
            <div className="content-box-inner-container">
              <div className="content-box-inner-buttons">
                <a
                  className="company"
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
                      className="fa-icon"
                      target="_blank"
                      rel="noreferrer"
                      href={extracurricular.repoLink}
                      title=""
                      whileHover={{
                        scale: 1.15,
                        color: '#c199e5e0',
                      }}
                      whileTap={{ scale: 1 }}
                      style={{ marginTop: '1px' }}
                    >
                      <FontAwesomeIcon icon="fa-brands fa-github" />
                    </motion.a>
                  </>
                )}
              </div>
              <div className="role-date">
                <span className="role">{extracurricular.role}</span>
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
