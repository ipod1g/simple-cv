import React from "react";
import About from "./About";
import Experience from "./Experience";
import "./Main.css";
import Projects from "./Projects";

const Main = () => {
   return (
      <div className="main-wrapper">
         <section className="main-container">
            <About />
            <hr />
            <h3>Experience</h3>
            <ul>
               <div className="xp-line"></div>
               <Experience></Experience>
            </ul>
            <hr />
            <h3>Projects</h3>
            <ul>
               <div className="proj-line"></div>
               <Projects></Projects>
            </ul>
            <hr />
         </section>
      </div>
   );
};

export default Main;
