import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./Experience.css";
import ScrollBarIndicator from "./ScrollBarIndicator";

const Experience = (props) => {
   // For scrolldimension
   const xpContainerRef = useRef(null);

   return (
      <>
         <ul className="xp-container" ref={xpContainerRef}>
            {/* divider */}
            <div className="xp-box-wrapper">
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
                     <h4>Summer Undergraduate Research Internship Program </h4>
                     <div className="role-date">
                        <span className="role">
                           Computational Biomolecules (hydrogel){" "}
                        </span>
                        <span>May - Jul 22</span>
                     </div>
                     <hr />
                     <ul>
                        <li>
                           {" "}
                           Simulated biophysical system with MARTINI force field
                           and GROMACS to compare for compatibility of result
                           under the supervision of Professor Wang Yi and
                           awarded the best poster presentation prize amongst 18
                           other teams by the professors
                        </li>
                        <br />
                        <li>
                           Utilized server-side simulation processing in
                           LINUX-based OS and enhanced efficiency for the
                           project by cooperating with a partner
                        </li>
                     </ul>
                  </li>
               </motion.div>
            </div>
            {/* divider */}
            <div className="xp-box-wrapper">
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
                     <h4>Republic of Korea Army (ROKA)</h4>
                     <div className="role-date">
                        <span className="role">
                           Mortar Squad Leader in the 28th Division
                        </span>
                        <span>Jun 20 – Dec 21</span>
                     </div>
                     <hr />
                     <ul>
                        <li>
                           Led, managed, and supervised a 12-person squad in 23
                           field trainings under variating environments
                        </li>
                        <br />
                        <li>
                           Prepared and reviewed situation reports and
                           operational briefs for officers
                        </li>
                     </ul>
                  </li>
               </motion.div>
            </div>
            {/* divider */}
            <div className="xp-box-wrapper">
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
                     <h4>
                        United States - Republic of Korea Combined Command Post
                        Training
                     </h4>
                     <div className="role-date">
                        <span className="role">
                           English Linguist in the Combined Ground Component
                           Command
                        </span>
                        <span>Jun – Aug 21</span>
                     </div>
                     <hr />
                     <ul>
                        <li>
                           Engaged in US-ROK training as a real-time English
                           linguist for the department of Hospitality and
                           Personnel under deployment
                        </li>
                        <br />
                        <li>
                           Translated diplomatically and strategically in-depth
                           documents for both parties in clear technical
                           wordings
                        </li>
                     </ul>
                  </li>
               </motion.div>
            </div>
         </ul>
         <ScrollBarIndicator ref={xpContainerRef} />
         {/* divider */}
      </>
   );
};

export default Experience;
