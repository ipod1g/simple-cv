import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
   return (
      <nav className="nav-bar">
         <button
            onClick={() => {
               props.scrollToSection(props.aboutSection);
            }}
         >
            Ab.
         </button>
         <button
            onClick={() => {
               props.scrollToSection(props.experienceSection);
            }}
         >
            Xp.
         </button>
         <button
            onClick={() => {
               props.scrollToSection(props.projectsSection);
            }}
         >
            Pj.
         </button>
         <button
            onClick={() => {
               props.scrollToSection(props.skillsSection);
            }}
         >
            Sk.
         </button>
      </nav>
   );
};

export default Navbar;
