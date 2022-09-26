import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Projects.css";

const Projects = (props) => {
   useEffect(() => {
      Aos.init({ duration: 500 });
   }, []);
   return (
      <>
         {/* divider */}
         <div className="proj-box-wrapper">
            <li data-aos="zoom-in-up" className="xp-box">
               <a className="company" href="#">
                  Good stuff
               </a>
               <p>
                  LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
                  LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
               </p>
               <ul>
                  <li>Did this</li>
                  <li>Did this</li>
               </ul>
            </li>
         </div>
         {/* divider */}
         <div className="proj-box-wrapper">
            <li data-aos="zoom-in-up" className="xp-box">
               <a className="company" href="#">
                  Good stuff
               </a>
               <p>
                  LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
                  LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
               </p>
               <ul>
                  <li>Did this</li>
                  <li>Did this</li>
               </ul>
            </li>
         </div>
         {/* divider */}
         <div className="proj-box-wrapper">
            <li data-aos="zoom-in-up" className="xp-box">
               <a className="company" href="#">
                  Good stuff
               </a>
               <p>
                  LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
                  LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
               </p>
               <ul>
                  <li>Did this</li>
                  <li>Did this</li>
               </ul>
            </li>
         </div>
         {/* divider */}
         <div className="proj-box-wrapper">
            <li data-aos="zoom-in-up" className="xp-box">
               <a className="company" href="#">
                  Good stuff
               </a>
               <p>
                  LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
                  LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
               </p>
               <ul>
                  <li>Did this</li>
                  <li>Did this</li>
               </ul>
            </li>
         </div>
      </>
   );
};

export default Projects;
