import React, { useRef } from 'react';
import About from './About';
import Experience from './Experience';
import Navbar from './Navbar';
import Projects from './Projects';
import Skills from './Skills';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Extras from './Extras';
import Image from 'next/image';
import Background from '../../public/assets/spaceloop-blur.webp';

const Main = (props: { notionData }) => {
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
      <main id="main-wrapper" className="h-fit w-full relative">
        <Image
          className="h-full object-cover fixed -z-10 inset-0 opacity-10 blur-sm object-left lg:object-center"
          src={Background}
          width={1920}
          height={1080}
          style={{
            filter: 'blur(4px)',
            zIndex: -10,
            objectFit: 'cover',
            objectPosition: 'left',
            position: 'fixed',
            inset: 0,
            height: '100%',
            opacity: 0.1,
          }}
          alt={''}
        />
        <article id="main-container" className="h-fit w-full">
          <hr />
          <section id="about-section" ref={aboutSection}>
            <About />
          </section>
          <hr />
          {props.notionData ? (
            <>
              <section id="project-section" ref={projectsSection}>
                <Projects notionData={props.notionData}></Projects>
              </section>
              <hr />
              <section id="xp-section" ref={experienceSection}>
                <Experience notionData={props.notionData}></Experience>
              </section>
              <hr />
              <section id="extras-section" ref={extrasSection}>
                <Extras notionData={props.notionData}></Extras>
              </section>
              <hr />
            </>
          ) : (
            <div>Loading...</div>
          )}
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
