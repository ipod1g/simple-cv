import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
   faGithub,
   faLinkedin,
   faInstagram,
   faReact,
} from "@fortawesome/free-brands-svg-icons";
import "./ProfileTab.css";
import Selfie from "../assets/selfie.jpeg";
import CV from "../assets/CVSep.pdf";

library.add(faReact, faGithub, faLinkedin, faInstagram, faEnvelope);

const ProfileTab = () => {
   return (
      <>
         <aside className="profile-tab-container">
            <div className="profile-tab">
               <div className="selfie-wrapper">
                  <img
                     id="selfie"
                     src={Selfie}
                     alt="My selfie"
                     height="100px"
                     width="100px"
                  />
               </div>
               <summary>
                  <span style={{ fontSize: "1.1rem", color: "#c199e5e0" }}>
                     Ku Bon Kwan (Bono) <br />
                  </span>
                  BSc in Physics, CUHK <br />
                  Frontend |&nbsp;
                  <FontAwesomeIcon
                     icon="fa-brands fa-react"
                     color="rgb(12, 211, 218)"
                  />
                  &nbsp; React{" "}
                  <p
                     style={{
                        fontStyle: "italic",
                     }}
                     className="intro"
                  >
                     Prospective mentality, a self-motivator, and a creative and
                     persevering deep problem solver{" "}
                  </p>
               </summary>
               <div className="origins">
                  👨‍👩‍👦‍👦 <span>KR</span> 🎒
                  <span>MY</span> 🎓<span>HK</span>{" "}
               </div>
               {/* 🇰🇷 🇲🇾 🇭🇰*/}
               <motion.button
                  whileHover={{
                     scale: 1.1,
                     border: "1px rgba(238, 238, 238, 0.291) solid",
                  }}
                  whileTap={{ scale: 0.99 }}
               >
                  <a href={CV} download="CVSep.pdf">
                     Download CV
                  </a>
               </motion.button>
            </div>
         </aside>

         <footer className="footer">
            <div className="social">
               <motion.a
                  className="fa-icon"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/ipod1g"
                  title=""
                  whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                  whileTap={{ scale: 1 }}
               >
                  <FontAwesomeIcon icon="fa-brands fa-github" />
               </motion.a>
               <motion.a
                  className="fa-icon"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/bono420/"
                  title=""
                  whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                  whileTap={{ scale: 1 }}
               >
                  <FontAwesomeIcon icon="fa-brands fa-instagram" />
               </motion.a>
               <motion.a
                  className="fa-icon"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/bon-kwan-ku-340082245/"
                  title=""
                  whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                  whileTap={{ scale: 1 }}
               >
                  <FontAwesomeIcon icon="fa-brands fa-linkedin" />
               </motion.a>
               <motion.a
                  className="fa-icon"
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:kubonkwan99@gmail.com"
                  title=""
                  whileHover={{ scale: 1.15, color: "#c199e5e0" }}
                  whileTap={{ scale: 1 }}
               >
                  <FontAwesomeIcon icon="fa-regular fa-envelope" />
               </motion.a>
            </div>
            <div style={{ fontSize: "11px", marginTop: "4px" }}>
               © 2022 Bono | All Rights Reserved.
            </div>
         </footer>
      </>
   );
};

export default ProfileTab;
