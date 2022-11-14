import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ScrollBarIndicator from "./ScrollBarIndicator";
import "./Contents.css";

library.add(faGithub);

const ExtrasBox = ({
   title,
   extrasLink,
   githubLink,
   role,
   date,
   desc1,
   desc2,
   desc3,
}) => {
   return (
      <>
         <div className="extras-box-wrapper">
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
                        <a
                           className="company"
                           href={extrasLink}
                           target="_blank"
                           rel="noreferrer"
                        >
                           {title}
                        </a>
                        {githubLink && (
                           <>
                              |
                              <motion.a
                                 className="fa-icon"
                                 target="_blank"
                                 rel="noreferrer"
                                 href={githubLink}
                                 title=""
                                 whileHover={{
                                    scale: 1.15,
                                    color: "#c199e5e0",
                                 }}
                                 whileTap={{ scale: 1 }}
                                 style={{ marginTop: "1px" }}
                              >
                                 <FontAwesomeIcon icon="fa-brands fa-github" />
                              </motion.a>
                           </>
                        )}
                     </div>
                     <div className="role-date">
                        <span className="role">{role}</span>
                        <span>{date}</span>
                     </div>
                     <hr />
                     <ul>
                        <li dangerouslySetInnerHTML={{ __html: desc1 }}></li>
                        {desc2 ? (
                           <>
                              <br />
                              <li
                                 dangerouslySetInnerHTML={{ __html: desc2 }}
                              ></li>
                           </>
                        ) : null}
                        {desc3 ? (
                           <>
                              <br />
                              <li
                                 dangerouslySetInnerHTML={{ __html: desc3 }}
                              ></li>
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

const extrasArray = [
   /* PROJECT, PROJECT LINK, GITHUB LINK, ROLE, DATE, DESC1, DESC2, DESC3 */
   [
      "Cathay Hackathon 2022 Shortlist",
      "#",
      "https://github.com/ipod1g/battleship",
      "UI/UX design & Frontend developer",
      "Nov 22",
      "Designed and developed an AI integrated inflight service solution using <u>Flutter</u> and <u>Firebase</u> in linkage with Google Cloud Console API for prototype showcasing",
      "Qualified for the final rounds as top 20 teams amongst 100 participating teams with a pitching video of our solution",
   ],
   [
      "PLANCKS 2022 Hong Kong Round 2nd Runner Up ",
      "https://www.dpg-physik.de/vereinigungen/fachuebergreifend/ak/akjdpg/events/wettbewerbe/plancks",
      "",
      "Physics Competition Participant",
      "Mar 22",
      "Solved 5/6 masters-level challenging physics questions in the Hong Kong preliminary rounds – in collaboration with 2 members from Hong Kong University of Science and Technology (HKUST)",
      "Acquired critical thinking power beyond textbooks by enforcing research paper comprehension, and experienced professional discussions with academically excellent peers",
   ],
];

export default function Extras() {
   // For scrolldimension
   const extrasContainerRef = useRef(null);

   return (
      <>
         <ul className="xp-container" ref={extrasContainerRef}>
            {extrasArray.map(
               ([
                  title,
                  extrasLink,
                  githubLink,
                  role,
                  date,
                  desc1,
                  desc2,
                  desc3,
               ]) => (
                  <ExtrasBox
                     title={title}
                     extrasLink={extrasLink}
                     githubLink={githubLink}
                     role={role}
                     date={date}
                     desc1={desc1}
                     desc2={desc2}
                     desc3={desc3}
                     // Try to fix the key issue
                     key={title}
                  ></ExtrasBox>
               )
            )}
         </ul>
         <ScrollBarIndicator ref={extrasContainerRef} />
      </>
   );
}
