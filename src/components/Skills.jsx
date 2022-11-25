import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
   return (
      <>
         <h3>Skills</h3>
         <div className="skills-container">
            <h4>Technical</h4>
            <p>
               JavaScript | HTML/CSS | React | TypeScript | Next.js | Node.js |
               Figma
            </p>
            <h4>Language</h4>
            <p> English - Native | Korean - Native </p>
         </div>
         <hr />
         <div className="credits">
            <span>
               Background image source:
               <motion.a
                  className="fa-icon"
                  target="_blank"
                  rel="noreferrer"
                  href="https://gifer.com/en/2r4z"
                  title=""
                  whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                  whileTap={{ scale: 1 }}
               >
                  here
               </motion.a>
               <p>Special Thanks to YI Jisoo</p>
            </span>
            <hr />
         </div>
      </>
   );
};

export default Skills;
