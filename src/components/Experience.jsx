import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Experience.css";

const Experience = (props) => {
   useEffect(() => {
      Aos.init({ duration: 500 });
   }, []);
   return (
      <>
         {/* divider */}
         <div className="xp-box-wrapper">
            <li data-aos="fade-left" className="xp-box">
               <h4>I was a soldier</h4>
               <div className="role-date">
                  <span>Soldier</span>
                  <span>2019 - 2021</span>
               </div>
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
         <div className="xp-box-wrapper">
            <li data-aos="fade-left" className="xp-box">
               <h4>I was a soldier</h4>
               <div className="role-date">
                  <span>Soldier</span>
                  <span>2019 - 2021</span>
               </div>
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
         <div className="xp-box-wrapper">
            <li data-aos="fade-left" className="xp-box">
               <h4>I was a soldier</h4>
               <div className="role-date">
                  <span>Soldier</span>
                  <span>2019 - 2021</span>
               </div>
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

export default Experience;
