import React from "react";
import { useState, useEffect, useRef, useImperativeHandle } from "react";
import { motion, useScroll } from "framer-motion";
import "./ScrollBarIndicator.css";
import { forwardRef } from "react";

const ScrollBarIndicator = forwardRef((props, ref) => {
   const childRef = ref;
   // const ref = useRef(null);

   console.log("this is childRef " + childRef);

   useImperativeHandle(ref, () => ({
      focus: () => {
         ref.current.focus();
      },
   }));
   // const { scrollXpProgress } = useScroll({
   //    target: ref1,
   //    offset: ["start start", "end end"],
   // });

   // const { scrollProjProgress } = useScroll({
   //    target: ref2,
   //    offset: ["start start", "end end"],
   // });

   return (
      <>
         <div className="progress-wrapper">
            <div className="progress">
               <svg id="progress" width="4" height="1000" viewBox="0 0 2 1000">
                  <line x1="1" y1="1000" pathLength="1" className="bg" />
                  <motion.line
                     y1="1000"
                     x1="1"
                     width="6"
                     pathLength="1"
                     className="indicator"
                     // style={
                     //    props.scrollType === "xp"
                     //       ? { pathLength: scrollXpProgress }
                     //       : { pathLength: scrollProjProgress }
                     // }
                  />
               </svg>
            </div>
            {props.children}
         </div>
      </>
   );
});

export default ScrollBarIndicator;
