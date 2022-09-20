import React from "react";
import About from "./About";
import Experience from "./Experience";
import "./Main.css";

const Main = () => {
   return (
      <div className="main-container">
         <About></About>
         <Experience></Experience>
         <p>LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT</p>
      </div>
   );
};

export default Main;
