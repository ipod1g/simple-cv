import React, { Suspense, lazy, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { TNotionData } from '@/types/types';
import About from './About';
import Navbar from './Navbar';
import Projects from './Projects';
import Experience from './Experience';
import Extras from './Extras';
import Skills from './Skills';
import SectionTitle from '@/components/common/SectionTitle';
import Skeleton from '@/components/common/Skeleton';

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
            <SectionTitle title="Projects" />
            <Suspense fallback={<Skeleton />}>
              <Projects notionDataArray={props.notionDataArray}></Projects>
            </Suspense>
          </section>
          <hr />
          <section id="xp-section" ref={experienceSection}>
            <SectionTitle title="Experiences" />
            <Suspense fallback={<Skeleton />}>
              <Experience notionDataArray={props.notionDataArray}></Experience>
            </Suspense>
          </section>
          <hr />
          <section id="extras-section" ref={extrasSection}>
            <SectionTitle title="Extra-curricular" />
            <Suspense fallback={<Skeleton />}>
              <Extras notionDataArray={props.notionDataArray}></Extras>
            </Suspense>
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
