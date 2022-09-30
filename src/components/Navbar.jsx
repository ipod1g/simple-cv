import React from "react";
import { motion } from "framer-motion";
import "./Navbar.css";

const Navbar = (props) => {
   return (
      <motion.nav className="nav-bar" whileHover={{ scale: 1.1 }}>
         <motion.button
            onClick={() => {
               props.scrollToSection(props.aboutSection);
            }}
            style={{ marginRight: "4px" }}
            whileHover={{ scale: 1.2, letterSpacing: "4px" }}
         >
            About
         </motion.button>
         <motion.button
            onClick={() => {
               props.scrollToSection(props.experienceSection);
            }}
            style={{ marginRight: "6px" }}
            whileHover={{ scale: 1.2, letterSpacing: "4px" }}
         >
            Work
         </motion.button>
         <motion.button
            onClick={() => {
               props.scrollToSection(props.projectsSection);
            }}
            whileHover={{ scale: 1.2, letterSpacing: "4px" }}
         >
            Project
         </motion.button>
         <motion.button
            onClick={() => {
               props.scrollToSection(props.skillsSection);
            }}
            style={{ marginRight: "9px" }}
            whileHover={{ scale: 1.2, letterSpacing: "4px" }}
         >
            Skill
         </motion.button>
      </motion.nav>
   );
};

export default Navbar;
