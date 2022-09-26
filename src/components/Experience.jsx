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
            <li data-aos="zoom-in-up" className="xp-box">
               <h4>Summer Undergraduate Research Internship Program</h4>
               <div className="role-date">
                  <span>Computational Biomolecules (hydrogel) </span>
                  <span>May - July 22</span>
               </div>
               <br />
               <ul>
                  <li>
                     {" "}
                     Simulated biophysical system with MARTINI force field and
                     GROMACS to compare for compatibility of result under the
                     supervision of Professor Wang Yi and awarded the best
                     poster presentation prize amongst 18 other teams by the
                     professors
                  </li>
                  <br />
                  <li>
                     Utilized server-side simulation processing in LINUX-based
                     OS and enhanced efficiency for the project by cooperating
                     with a partner
                  </li>
               </ul>
            </li>
         </div>
         {/* divider */}
         <div className="xp-box-wrapper">
            <li data-aos="zoom-in-up" className="xp-box">
               <h4>Republic of Korea Army (ROKA)</h4>
               <div className="role-date">
                  <span>Mortar Squad Leader in the 28th Division</span>
                  <span>June 20 – Dec 21</span>
               </div>
               <br />
               <ul>
                  <li>
                     Led, managed, and supervised a 12-person squad in 23 field
                     trainings under variating environments
                  </li>
                  <br />
                  <li>
                     Prepared and reviewed situation reports and operational
                     briefs for officers
                  </li>
               </ul>
            </li>
         </div>
         {/* divider */}
         <div className="xp-box-wrapper">
            <li data-aos="zoom-in-up" className="xp-box">
               <h4>
                  United States - Republic of Korea Combined Command Post
                  Training
               </h4>
               <div className="role-date">
                  <span>
                     English Linguist in the Combined Ground Component Command
                  </span>
                  <span>June – August 21</span>
               </div>
               <br />
               <ul>
                  <li>
                     Engaged in US-ROK training as a real-time English linguist
                     for the department of Hospitality and Personnel under
                     deployment
                  </li>
                  <br />
                  <li>
                     Translated diplomatically and strategically in-depth
                     documents for both parties in clear technical wordings
                  </li>
               </ul>
            </li>
         </div>
      </>
   );
};

export default Experience;
