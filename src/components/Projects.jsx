import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ScrollBarIndicator from './ScrollBarIndicator';
import './Contents.css';
import { projectsInfo } from '../constants/Content';

library.add(faGithub);

const ProjectsBox = ({ projects }) => {
  const description = () => {
    return Object.keys(projects)
      .filter((objKey) => objKey.startsWith('description'))
      .map((desc) => (
        <React.Fragment key={desc}>
          {desc === 'description1' || <br />}
          <li
            dangerouslySetInnerHTML={{
              __html: projects[desc],
            }}
          ></li>
        </React.Fragment>
      ));
  };

  return (
    <>
      <div className="proj-box-wrapper">
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
                  href={projects.liveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {projects.title}
                </a>
                {projects.repoLink && (
                  <>
                    |
                    <motion.a
                      className="fa-icon"
                      target="_blank"
                      rel="noreferrer"
                      href={projects.repoLink}
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
                <span className="role">{projects.workScale}</span>
                <span>{projects.duration}</span>
              </div>
              <hr />
              <ul>{description()}</ul>
            </div>
          </li>
        </motion.div>
      </div>
    </>
  );
};

export default function Projects() {
  // For scrolldimension
  const projContainerRef = useRef(null);

  return (
    <>
      <ul className="xp-container" ref={projContainerRef}>
        {projectsInfo.map((project, i) => (
          <ProjectsBox key={'projectbox' + i} projects={project}></ProjectsBox>
        ))}
      </ul>
      <ScrollBarIndicator ref={projContainerRef} />
    </>
  );
}
