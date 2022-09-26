import React, { useRef } from "react";
import About from "./About";
import Experience from "./Experience";
import "./Main.css";
import Projects from "./Projects";
import ScrollBarIndicator from "./ScrollBarIndicator";
import Skills from "./Skills";

const Main = () => {
   return (
      <div className="main-wrapper">
         <section className="main-container">
            <hr />
            <About />
            <hr />
            <h3>Experience</h3>
            <div className="xp-wrapper">
               <ScrollBarIndicator height={740} origin={0} />
               <ul className="xp-container">
                  {/* <div className="xp-line"></div> */}
                  <Experience></Experience>
               </ul>
            </div>
            <hr />
            <h3>Projects</h3>
            <div className="proj-wrapper">
               <ScrollBarIndicator height={901} origin={700} />
               <ul>
                  {/* <div className="proj-line"></div> */}
                  <Projects></Projects>
               </ul>
            </div>
            <hr />
            <Skills />
            <hr />
         </section>
      </div>
   );
};

export default Main;
