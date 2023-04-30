import React from 'react';
import { forwardRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollBarIndicator = forwardRef((props, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    /* intersection offset when [going down, going up]
    offset: ["target container", "target container"], */
    offset: ['start 0.5', '0.5 0'],
  });

  const scrollProgress = useSpring(scrollYProgress);

  /* To test for scrollbar */
  // useEffect(() => {
  //   return scrollYProgress.onChange((latest) => {
  //     console.log('Page scroll: ', latest);
  //   });
  // }, []);

  return (
    <>
      <div id="progress-wrapper" className="relative">
        <div
          id="progress-container"
          className="absolute top-12 pb-24 h-full ml-8"
        >
          <svg
            className="-rotate-180"
            id="progress"
            width="8"
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
              className="stroke-slate-500/50 stroke-[4px]"
            />
            <motion.line
              y1="100%"
              x1="1"
              pathLength="1"
              id="indicator"
              className="stroke-[4px]"
              style={{ pathLength: scrollProgress, stroke: 'url(#linear)' }}
            />
          </svg>
        </div>
      </div>
    </>
  );
});

ScrollBarIndicator.displayName = 'ScrollBarIndicator';

export default ScrollBarIndicator;
