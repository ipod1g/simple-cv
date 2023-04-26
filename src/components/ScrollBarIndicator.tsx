import React from 'react';
import { forwardRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
// import './ScrollBarIndicator.css';

const ScrollBarIndicator = forwardRef((props, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    /* intersection offset when [going down, going up]
       offset: ["target container", "target container"], */
    offset: ['start 0.5', '0.5 0'],
  });

  const scrollProgress = useSpring(scrollYProgress);

  /* To test for scrollbar */
  // useEffect(() => {
  //    return scrollYProgress.onChange((latest) => {
  //       console.log("Page scroll: ", latest);
  //       console.log(ref);
  //    });
  // }, []);

  return (
    <>
      <div
        id="progress-wrapper"
        className="relative -z-10 mt-[35px] left-[22px] lg:left-10"
      >
        <div
          id="progress-container"
          className="absolute top-0 -left-[1px] h-full m-0 p-0"
        >
          <svg
            className="-rotate-180"
            id="progress"
            width="4"
            height="100%"
            viewBox="0 0 4 100%"
          >
            <defs>
              <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6c5faf56" />
                <stop offset="100%" stopColor="#631fb079" />
              </linearGradient>
            </defs>
            <line
              x1="1"
              y1="100%"
              pathLength="1"
              className="bg stroke-slate-500/50"
            />
            <motion.line
              y1="100%"
              x1="1"
              width="6"
              pathLength="1"
              className="indicator"
              style={{ pathLength: scrollProgress }}
            />
          </svg>
        </div>
      </div>
    </>
  );
});

export default ScrollBarIndicator;
