import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./Experience.css";
import ScrollBarIndicator from "./ScrollBarIndicator";

const ExperienceBox = ({ work, role, date, desc1, desc2, desc3 }) => {
   return (
      <>
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
                  <h4>{work}</h4>
                  <div className="role-date">
                     <span className="role">{role}</span>
                     <span>{date}</span>
                  </div>
                  <hr />
                  <ul>
                     <li>{desc1}</li>
                     {desc2 ? (
                        <>
                           <br />
                           <li>{desc2}</li>
                        </>
                     ) : null}
                     {desc3 ? (
                        <>
                           <br />
                           <li>{desc3}</li>
                        </>
                     ) : null}
                  </ul>
               </li>
            </motion.div>
         </div>
      </>
   );
};

const worksArray = [
   /* WORK TITLE, ROLE, DATE, DESC1, DESC2, DESC3 */
   [
      "Summer Undergraduate Research Internship Program",
      "Computational Biomolecules (hydrogel)",
      "May - Jul 22",
      "Simulated biophysical system with MARTINI force field and GROMACS to compare for compatibility of result under the supervision of Professor Wang Yi",
      "Awarded the best poster presentation prize amongst 18 other teams by the professors",
      "Utilized server-side simulation processing inLINUX-based OS and enhanced efficiency for the project by cooperating with a partner",
   ],
   [
      "Republic of Korea Army (ROKA)",
      "Mortar Squad Leader in the 28th Division",
      "Jun 20 – Dec 21",
      "Led, managed, and supervised a 12-person squad in 23 field trainings under variating environments",
      "Prepared and reviewed situation reports and operational briefs for officers",
   ],
   [
      "United States - Republic of Korea Combined Command Post Training",
      "English Linguist in the Combined Ground Component Command",
      "Jun – Aug 21",
      "Engaged in US-ROK training as a real-time English linguist for the department of Hospitality and Personnel under deployment",
      "Translated diplomatically and strategically in-depth documents for both parties in clear technical wordings",
   ],
];

export default function Experience() {
   // For scrolldimension
   const xpContainerRef = useRef(null);

   return (
      <>
         <ul className="xp-container" ref={xpContainerRef}>
            {worksArray.map(([work, role, date, desc1, desc2, desc3]) => (
               <ExperienceBox
                  work={work}
                  role={role}
                  date={date}
                  desc1={desc1}
                  desc2={desc2}
                  desc3={desc3}
                  // Try to fix the key issue
                  key={work}
               ></ExperienceBox>
            ))}
         </ul>
         <ScrollBarIndicator ref={xpContainerRef} />
      </>
   );
}
