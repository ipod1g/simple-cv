import React from "react";
import About from "./About";
import Experience from "./Experience";
import "./Main.css";

const Main = () => {
   return (
      <div className="main-container">
         <About />
         <h3>Experience</h3>
         <div className="xp-line"></div>
         <ul>
            <Experience></Experience>
         </ul>
      </div>
   );
};

export default Main;
