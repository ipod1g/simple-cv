import React from "react";
import { useState, useEffect, useRef, forwardRef } from "react";
import { addScaleCorrector, motion, useScroll, useSpring } from "framer-motion";
import "./ScrollBarIndicator.css";

const ScrollBarIndicator = forwardRef((props, ref) => {
   const { scrollYProgress } = useScroll({
      target: ref,
      // offset: ["start start", "end end"],
      // offset: ["-400px start", "end 600px"],

      offset: [`-400px start`, "end 600px"],
   });

   const scrollProgress = useSpring(scrollYProgress);

   useEffect(() => {
      return scrollYProgress.onChange((latest) => {
         console.log("Page scroll: ", latest);
      });
   }, []);

   return (
      <>
         <div className="progress-wrapper">
            <div className="progress">
               <svg id="progress" width="4" height="830" viewBox="0 0 2 830">
                  <line x1="1" y1="950" pathLength="1" className="bg" />
                  <motion.line
                     y1="830"
                     x1="1"
                     width="6"
                     pathLength="1"
                     className="indicator"
                     style={{ pathLength: scrollProgress }}
                  />
               </svg>
            </div>
            {props.children}
         </div>
      </>
   );
});

export default ScrollBarIndicator;
