import React from "react";
import "./Experience.css";

const Experience = (props) => {
   return (
      <>
         {/* divider */}
         <li className="xp-box">
            <h4>I was a soldier</h4>
            <p>LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT</p>
            <p>LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT</p>
            <ul>
               <li>Did this</li>
               <li>Did this</li>
            </ul>
         </li>
         {/* divider */}
         <li className="xp-box">
            <h4>I was a soldier</h4>
            <p>
               LONGTEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG
               TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXTS
               LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT
            </p>
            <ul>
               <li>Did this</li>
               <li>Did this</li>
            </ul>
         </li>
      </>
   );
};

export default Experience;
