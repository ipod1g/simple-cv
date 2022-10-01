import React, { useRef } from "react";
import About from "./About";
import Experience from "./Experience";
import "./Main.css";
import Navbar from "./Navbar";
import Projects from "./Projects";
import ScrollBarIndicator from "./ScrollBarIndicator";
import Skills from "./Skills";
import { motion, useScroll } from "framer-motion";

const Main = () => {
   const aboutSection = useRef(null);
   const experienceSection = useRef(null);
   const projectsSection = useRef(null);
   const skillsSection = useRef(null);
   const ref = useRef({ experienceSection, projectsSection });

   const scrollToSection = (elementRef) => {
      window.scrollTo({
         top: elementRef.current.offsetTop,
         behavior: "smooth",
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
               <section className="xp-section" ref={experienceSection}>
                  <h3>Experience</h3>
                  <div className="xp-wrapper">
                     <ScrollBarIndicator scrollType="xp">
                        <ul className="xp-container">
                           <Experience></Experience>
                        </ul>
                     </ScrollBarIndicator>
                  </div>
               </section>
               <hr />
               <section className="project-section" ref={projectsSection}>
                  <h3>Projects</h3>
                  <div className="proj-wrapper">
                     <ScrollBarIndicator scrollType="proj">
                        <ul>
                           <Projects></Projects>
                        </ul>
                     </ScrollBarIndicator>
                  </div>
               </section>
               <hr />
               <section className="skill-section" ref={skillsSection}>
                  <Skills />
               </section>
               <hr />
            </article>
         </div>
         <Navbar
            scrollToSection={scrollToSection}
            aboutSection={aboutSection}
            experienceSection={experienceSection}
            projectsSection={projectsSection}
            skillsSection={skillsSection}
         />
      </>
   );
};

export default Main;
