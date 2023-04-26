import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ScrollBarIndicator from './ScrollBarIndicator';
// import './Contents.css';
import { projectsInfo } from '../constants/Content';

library.add(faGithub);

const ProjectsBox = ({ projects }) => {
  const description = () => {
    return Object.keys(projects)
      .filter((objKey) => objKey.startsWith('description'))
      .map((desc) => (
        <React.Fragment key={desc}>
          {desc === 'description1'}
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
      <div
        id="proj-box-wrapper"
        className="before:content-[''] before:bg-white before:inline-block before:absolute before:rounded-full before:border before:border-solid before:border-greyish before:mt-[6px] before:w-[10px] before:h-[10px] before:z-50 before:left-[17px] lg:before:left-[35px] before:rotate-45"
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
            <div className="flex flex-col">
              <div className="flex gap-3">
                <a
                  id="company"
                  // color: #c199e5e0;
                  className="transition-all hover:transition-all hover:text-purple-400/70 hover:text-line-purple hover:scale-105"
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
                      id="fa-icon"
                      className="text-blueish/90"
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
                      <FontAwesomeIcon
                        icon={faGithub}
                        // icon="fa-brands fa-github"
                      />
                    </motion.a>
                  </>
                )}
              </div>
              <div className="flex justify-between -mt-[18px]">
                <span className="italic text-sm">{projects.workScale}</span>
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
