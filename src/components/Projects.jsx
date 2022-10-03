import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Projects.css";
import { useRef } from "react";
import ScrollBarIndicator from "./ScrollBarIndicator";

const Projects = (props) => {
   useEffect(() => {
      Aos.init({ duration: 500 });
   }, []);

   const ref = useRef(null);

   return (
      <>
         <ScrollBarIndicator ref={ref} />
         <ul className="proj-container" ref={ref}>
            {/* divider */}
            <div className="proj-box-wrapper">
               <li data-aos="zoom-in-up" className="xp-box">
                  <div className="inner-container">
                     <a className="company" href="#">
                        CV website
                     </a>
                     <div className="role-date">
                        <span>Solo </span>
                        <span>Sep 22</span>
                     </div>
                     <br />
                     <ul>
                        <li>
                           Created a resume-style interactive website using
                           React.js.
                        </li>
                        <br />
                        <li>
                           Focused on clean and component factored coding style
                        </li>
                     </ul>
                  </div>
               </li>
            </div>
            {/* divider */}
            <div className="proj-box-wrapper">
               <li data-aos="zoom-in-up" className="xp-box">
                  <div className="inner-container">
                     <a
                        className="company"
                        href="https://github.com/ipod1g/testers/tree/main/riot-login-clone"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        Riot Games Client Login Screen Clone
                     </a>
                     <div className="role-date">
                        <span>Solo </span>
                        <span>Aug - Sep 22</span>
                     </div>
                     <br />
                     <ul>
                        <li>
                           Developed a functional registration and login
                           authorization system connected to RDBMS (MySQL)
                           database using React and Node.js.
                        </li>
                        <br />
                        <li>
                           Implemented responsive design and utilized React Hook
                           system
                        </li>
                        <br />
                        <li>
                           Optimized loading time by changing font loading
                           method and refactoring code
                        </li>
                     </ul>
                  </div>
               </li>
            </div>
            {/* divider */}
            <div className="proj-box-wrapper">
               <li data-aos="zoom-in-up" className="xp-box">
                  <div className="inner-container">
                     <a
                        className="company"
                        href="https://github.com/ipod1g/testers/tree/main/riot-login-clone"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        Riot Games Client Login Screen Clone
                     </a>
                     <div className="role-date">
                        <span>Solo </span>
                        <span>Aug - Sep 22</span>
                     </div>
                     <br />
                     <ul>
                        <li>
                           Developed a functional registration and login
                           authorization system connected to RDBMS (MySQL)
                           database using React and Node.js.
                        </li>
                        <br />
                        <li>
                           Implemented responsive design and practised React
                           Hook system
                        </li>
                        <br />
                        <li>
                           Optimized loading time by changing font loading
                           method and refactoring code
                        </li>
                     </ul>
                  </div>
               </li>
            </div>
            {/* divider */}
         </ul>
      </>
   );
};

export default Projects;
