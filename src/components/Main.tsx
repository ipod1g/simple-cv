import React, { lazy, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { TNotionData } from '@/types/types';
import About from './About';
import Navbar from './Navbar';
import Projects from './Projects';
import Experience from './Experience';
import Extras from './Extras';
import Skills from './Skills';

const Main = (props: { notionDataArray: TNotionData[] }) => {
  const aboutSection = useRef(null);
  const experienceSection = useRef(null);
  const projectsSection = useRef(null);
  const extrasSection = useRef(null);
  const skillsSection = useRef(null);

  const isInView = useInView(aboutSection);

  const scrollToSection = (
    elementRef: React.MutableRefObject<HTMLElement | null>
  ) => {
    if (!window) return;
    window.scrollTo({
      top: elementRef.current!.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <main id="main-wrapper" className="h-fit w-full relative">
        <article id="main-container" className="h-fit w-full">
          <hr />
          <section id="about-section" ref={aboutSection}>
            <About />
          </section>
          <hr />
          <section id="project-section" ref={projectsSection}>
            <Projects notionDataArray={props.notionDataArray}></Projects>
          </section>
          <hr />
          <section id="xp-section" ref={experienceSection}>
            <Experience notionDataArray={props.notionDataArray}></Experience>
          </section>
          <hr />
          <section id="extras-section" ref={extrasSection}>
            <Extras notionDataArray={props.notionDataArray}></Extras>
          </section>
          <hr />
          <section id="skill-section" ref={skillsSection}>
            <Skills />
          </section>
        </article>
      </main>
      <AnimatePresence>
        {!isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed' }}
          >
            <Navbar
              scrollToSection={scrollToSection}
              aboutSection={aboutSection}
              projectsSection={projectsSection}
              extrasSection={extrasSection}
              experienceSection={experienceSection}
              skillsSection={skillsSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Main;
