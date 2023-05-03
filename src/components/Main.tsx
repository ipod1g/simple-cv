import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TNotionData } from '@/types/types';
import About from './About';
import Navbar from './Navbar';
import Skills from './Skills';

const Main = (props: { children: React.ReactNode }) => {
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
          <section id="about-section">
            <About />
          </section>
          <hr />
          {props.children}
          <section id="skill-section">
            <Skills />
          </section>
        </article>
        <AnimatePresence>
          {/* {!isInView && ( */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed right-0 top-0"
          >
            <Navbar scrollToSection={scrollToSection} />
          </motion.div>
          {/* )} */}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Main;
