import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import { faReact, faNode } from "@fortawesome/free-brands-svg-icons";
import ScrollBarIndicator from "./ScrollBarIndicator";
import "./Projects.css";

library.add(faGithub);

const Projects = () => {
   const projContainerRef = useRef(null);

   return (
      <>
         <ul className="proj-container" ref={projContainerRef}>
            {/* divider */}
            <div className="proj-box-wrapper">
               <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{
                     opacity: 1,
                     scale: 1,
                  }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  viewport={{ once: true }}
               >
                  <li className="xp-box">
                     <div className="inner-container">
                        <div className="inner-buttons">
                           <a className="company" href="#">
                              CV website
                           </a>
                           |
                           <motion.a
                              className="fa-icon"
                              target="_blank"
                              rel="noreferrer"
                              href="https://github.com/ipod1g/simple-cv"
                              title=""
                              whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                              whileTap={{ scale: 1 }}
                              style={{ marginTop: "1px" }}
                           >
                              <FontAwesomeIcon icon="fa-brands fa-github" />
                           </motion.a>
                        </div>
                        <div className="role-date">
                           <span>Solo </span>
                           <span>Sep 22</span>
                        </div>
                        <hr />
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
               </motion.div>
            </div>
            {/* divider */}
            <div className="proj-box-wrapper">
               <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{
                     opacity: 1,
                     scale: 1,
                  }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  viewport={{ once: true }}
               >
                  <li className="xp-box">
                     <div className="inner-container">
                        <div className="inner-buttons">
                           <a
                              className="company"
                              href="https://testers4bono.netlify.app"
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              Riot Games Client Login Screen Clone
                           </a>
                           |
                           <motion.a
                              className="fa-icon"
                              target="_blank"
                              rel="noreferrer"
                              href="https://github.com/ipod1g/testers/tree/main/riot-login-clone"
                              title=""
                              whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                              whileTap={{ scale: 1 }}
                              style={{ marginTop: "1px" }}
                           >
                              <FontAwesomeIcon icon="fa-brands fa-github" />
                           </motion.a>
                        </div>
                        <div className="role-date">
                           <span>Solo </span>
                           <span>Aug - Sep 22</span>
                        </div>
                        <hr />
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
                              Increased performance by changing font loading
                              method and continuously refactoring code for
                              better efficiency
                           </li>
                        </ul>
                     </div>
                  </li>
               </motion.div>
            </div>
            {/* divider */}
            <div className="proj-box-wrapper">
               <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{
                     opacity: 1,
                     scale: 1,
                  }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  viewport={{ once: true }}
               >
                  <li className="xp-box">
                     <div className="inner-container">
                        <div className="inner-buttons">
                           <a
                              className="company"
                              href="https://bonoku.shop"
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              Portfolio Website v1
                           </a>
                           |
                           <motion.a
                              className="fa-icon"
                              target="_blank"
                              rel="noreferrer"
                              href="https://github.com/ipod1g/portfolio-1/"
                              title=""
                              whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                              whileTap={{ scale: 1 }}
                              style={{ marginTop: "1px" }}
                           >
                              <FontAwesomeIcon icon="fa-brands fa-github" />
                           </motion.a>
                        </div>
                        <div className="role-date">
                           <span>Solo </span>
                           <span>Aug 22</span>
                        </div>
                        <hr />
                        <ul>
                           <li>
                              Developed a simplistic interactive website with
                              vanilla Javascript
                           </li>
                           <br />
                           <li>
                              Deployed in custom domain and improved
                              crawlability by using semantic elements for
                              enhanced SEO
                           </li>
                        </ul>
                     </div>
                  </li>
               </motion.div>
            </div>
            {/* divider */}
         </ul>
         <ScrollBarIndicator ref={projContainerRef} />
      </>
   );
};

export default Projects;
