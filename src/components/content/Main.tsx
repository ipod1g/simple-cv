import React from 'react';
import { motion } from 'framer-motion';
import About from './About';
import SideNavbar from '../common/SideNavbar';
import Skills from './Skills';

const Main = (props: { children: React.ReactNode }) => {
  return (
    <>
      <main id="main-wrapper" className="h-fit w-full relative overflow-hidden">
        <article
          id="main-container"
          className="h-fit w-full lg:w-[75vw] py-6 px-12"
        >
          <section id="about-section">
            <About />
          </section>
          <hr />
          {props.children}
          <section id="skill-section">
            <Skills />
          </section>
        </article>
        <SideNavbar />
      </main>
    </>
  );
};

export default Main;
