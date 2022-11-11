import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ScrollBarIndicator from "./ScrollBarIndicator";
import "./Projects.css";

library.add(faGithub);

const ProjectsBox = ({
   project,
   projLink,
   githubLink,
   role,
   date,
   desc1,
   desc2,
   desc3,
}) => {
   return (
      <>
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
               <li className="content-box">
                  <div className="content-box-inner-container">
                     <div className="content-box-inner-buttons">
                        <a className="company" href={projLink}>
                           {project}
                        </a>
                        |
                        <motion.a
                           className="fa-icon"
                           target="_blank"
                           rel="noreferrer"
                           href={githubLink}
                           title=""
                           whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                           whileTap={{ scale: 1 }}
                           style={{ marginTop: "1px" }}
                        >
                           <FontAwesomeIcon icon="fa-brands fa-github" />
                        </motion.a>
                     </div>
                     <div className="role-date">
                        <span className="role">{role}</span>
                        <span>{date}</span>
                     </div>
                     <hr />
                     <ul>
                        <li dangerouslySetInnerHTML={{ __html: desc1 }}>
                           {/* {desc1} */}
                        </li>
                        {desc2 ? (
                           <>
                              <br />
                              <li dangerouslySetInnerHTML={{ __html: desc2 }}>
                                 {/* {desc2} */}
                              </li>
                           </>
                        ) : null}
                        {desc3 ? (
                           <>
                              <br />
                              <li dangerouslySetInnerHTML={{ __html: desc3 }}>
                                 {/* {desc3} */}
                              </li>
                           </>
                        ) : null}
                     </ul>
                  </div>
               </li>
            </motion.div>
         </div>
      </>
   );
};

const projectsArray = [
   /* PROJECT, PROJECT LINK, GITHUB LINK, ROLE, DATE, DESC1, DESC2, DESC3 */
   [
      "Battleship Online",
      "#",
      "https://github.com/ipod1g/battleship",
      "Team - with Sim Ho",
      "Oct 22 – Present",
      "Developed an online version of battleship using modern frameworks - <u>Next.js</u> and <u>TypeScript</u>",
      "Collaborated with an experienced full-stack developer to gain constant insights and feedbacks for code improvements with GitHub features",
      "Prevented exploits and cheats by managing game data with server-side authentication",
   ],
   [
      "CV Website",
      "#",
      "https://github.com/ipod1g/simple-cv",
      "Personal",
      "Sep 22",
      "Created a glass-morphism themed interactive and responsive resume website using <u>React</u> and <u>framer-motion</u>",
      "Focused on clean and reusable component factored coding style for convenient updates to contents",
      "Optimized loading time by converting assets to appropriate file types like webp",
   ],
   [
      "Riot Games Client Login Screen Clone",
      "https://testers4bono.netlify.app",
      "https://github.com/ipod1g/riotlogin-clone-client",
      "Personal",
      "Aug – Sep 22",
      "Developed a functional registration and login authorization system connected to <u>RDBMS(MySQL)</u> database using <u>React</u> and <u>Node.js</u>",
      "Implemented custom responsive design and utilized React Hooks API",
      "Increased performance by changing font loading method and continuously refactoring code for better efficiency",
   ],
   [
      "Portfolio Website v1",
      "https://bonoku.shop",
      "https://github.com/ipod1g/portfolio-1/",
      "Personal",
      "Aug 22",
      "Developed a simplistic interactive website with vanilla Javascript",
      "Deployed in custom domain and improved crawlability by using semantic elements for enhanced SEO",
   ],
];

export default function Projects() {
   // For scrolldimension
   const projContainerRef = useRef(null);

   return (
      <>
         <ul className="xp-container" ref={projContainerRef}>
            {projectsArray.map(
               ([
                  project,
                  projLink,
                  githubLink,
                  role,
                  date,
                  desc1,
                  desc2,
                  desc3,
               ]) => (
                  <ProjectsBox
                     project={project}
                     projLink={projLink}
                     githubLink={githubLink}
                     role={role}
                     date={date}
                     desc1={desc1}
                     desc2={desc2}
                     desc3={desc3}
                     // Try to fix the key issue
                     key={project}
                  ></ProjectsBox>
               )
            )}
         </ul>
         <ScrollBarIndicator ref={projContainerRef} />
      </>
   );
}
