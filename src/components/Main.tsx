import React, { Suspense, lazy, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { TNotionData } from '@/types/types';
import About from './About';
import Navbar from './Navbar';
import Skills from './Skills';
import SectionTitle from '@/components/common/SectionTitle';
import Skeleton from '@/components/common/Skeleton';
import dynamic from 'next/dynamic';
import LazySections from './LazySections';

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
      <main id="main-wrapper" className="h-fit w-full relative overflow-hidden">
        <article id="main-container" className="h-fit w-full">
          <hr />
          <section id="about-section" ref={aboutSection}>
            <About />
          </section>
          <hr />
          <LazySections notionDataArray={props.notionDataArray} />
          <section id="skill-section" ref={skillsSection}>
            <Skills />
          </section>
        </article>
        <AnimatePresence>
          {!isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed right-0 top-0"
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
      </main>
    </>
  );
};

export default Main;
