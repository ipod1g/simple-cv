import React from "react";
import { useState, useEffect } from "react";
import "./ScrollBarIndicator.css";

const ScrollBarIndicator = (props) => {
   const [scrollTop, setScrollTop] = useState(0);

   const onScroll = () => {
      const el = document.documentElement;

      const winScroll = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;

      const scrolled = ((winScroll - props.origin) / props.height) * 100;

      console.log("scrolled: " + scrolled);
      if (scrolled >= 0) {
         setScrollTop(scrolled);
      }
      console.log("scrollTop: " + scrollTop);
   };

   useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, [scrollTop]);

   return (
      <div className="progress-wrapper">
         <div
            className="progress-main"
            style={{
               height: `${scrollTop + "%"}`,
               //    maxHeight: `${props.height}px`,
               maxHeight: "100%",
            }}
         ></div>
      </div>
   );
};

export default ScrollBarIndicator;
