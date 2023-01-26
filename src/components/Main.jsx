import React, { useRef } from 'react';
import About from './About';
import Experience from './Experience';
import './Main.css';
import Navbar from './Navbar';
import Projects from './Projects';
import Skills from './Skills';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Extras from './Extras';

const Main = () => {
  const aboutSection = useRef(null);
  const experienceSection = useRef(null);
  const projectsSection = useRef(null);
  const extrasSection = useRef(null);
  const skillsSection = useRef(null);

  const isInView = useInView(aboutSection);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="main-wrapper">
        <article className="main-container">
          <hr />
          <section className="about-section" ref={aboutSection}>
            <About />
          </section>
          <hr />
          <section className="project-section" ref={projectsSection}>
            <h3>Projects</h3>
            <div className="proj-wrapper">
              <Projects></Projects>
            </div>
          </section>
          <hr />
          <section className="xp-section" ref={experienceSection}>
            <h3>Experience</h3>
            <div className="xp-wrapper">
              <Experience></Experience>
            </div>
          </section>
          <hr />
          <section className="extras-section" ref={extrasSection}>
            <h3>Extra-curricular</h3>
            <div className="extras-wrapper">
              <Extras></Extras>
            </div>
          </section>
          <hr />
          <section className="skill-section" ref={skillsSection}>
            <Skills />
          </section>
        </article>
      </div>
      <AnimatePresence>
        {isInView ? (
          ''
        ) : (
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
