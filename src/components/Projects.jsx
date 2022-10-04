import React, { useEffect, useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Projects.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faReact, faNode } from "@fortawesome/free-brands-svg-icons";
import ScrollBarIndicator from "./ScrollBarIndicator";

// library.add(faReact, faNode);

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
                           Created a glass-morphism themed interactive and
                           responsive resume website using React and
                           framer-motion
                        </li>
                        <br />
                        <li>
                           Focused on clean and reusable component factored
                           coding style for convenient updates to contents
                        </li>
                        <br />
                        <li>
                           Optimized loading time by converting assets to
                           appropriate file types like webp
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
                           authorization system connected to RDBMS(MySQL)
                           database using React and Node.js.
                        </li>
                        <br />
                        <li>
                           Implemented custom responsive design and utilized
                           React Hooks API
                        </li>
                        <br />
                        <li>
                           Increased performance by changing font loading method
                           and continuously refactoring code for better
                           efficiency
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
                        Portfolio Website v1
                     </a>
                     <div className="role-date">
                        <span>Solo </span>
                        <span>Aug 22</span>
                     </div>
                     <br />
                     <ul>
                        <li>
                           Developed a simplistic interactive website with
                           vanilla Javascript
                        </li>
                        <br />
                        <li>
                           Deployed in custom domain and improved crawlability
                           by following semantic format for enhanced SEO
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
