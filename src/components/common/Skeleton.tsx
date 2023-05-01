import React from 'react';

const Skeleton = (props: { shape: string }) => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

  switch (props.shape) {
    case 'diamond':
      return (
        <div
          className="relative mb-20 ml-4 lg:ml-16 w-3/4 h-64 bg-black/30 before:bg-white before:absolute before:rotate-45 before:w-3
        before:h-3 before:mt-7 before:z-50 before:-left-[26px] before:lg:-left-[85px] before:content-['']"
        >
          <div className={`h-full w-full absolute ${shimmer}`}>
            <p className="ml-12 mt-12 text-xl text-purple-300 animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      );

    case 'circle':
      return (
        <div
          className="relative mb-20 ml-4 lg:ml-16 w-3/4 h-64 bg-black/30 before:bg-white before:absolute before:rotate-45 before:w-3
        before:h-3 before:mt-7 before:z-50 before:-left-[26px] before:lg:-left-[85px] before:content-[''] before:rounded-full"
        >
          <div className={`h-full w-full absolute ${shimmer}`}>
            <p className="ml-12 mt-12 text-xl text-purple-300">Loading...</p>
          </div>
        </div>
      );

    case 'triangle':
      return (
        <div
          className="relative mb-20 ml-4 lg:ml-16 w-3/4 h-64 bg-black/30 before:bg-transparent before:absolute before:w-3
          before:h-3 before:mt-7 before:z-50 before:content-[''] before:border-l-[8px] before:border-l-transparent before:border-t-[14px] before:border-t-white before:border-r-[8px] before:border-r-transparent before:-left-[29px] before:lg:-left-[86px]"
        >
          <div className={`h-full w-full absolute ${shimmer}`}>
            <p className="ml-12 mt-12 text-xl text-purple-300 animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div
          className="relative mb-20 ml-4 lg:ml-16 w-3/4 h-64 bg-black/30 before:bg-white before:absolute before:rotate-45 before:w-3
      before:h-3 before:mt-7 before:z-50 before:-left-[26px] before:lg:-left-[85px] before:content-[''] before:rounded-full"
        >
          <div className={`h-full w-full absolute ${shimmer}`}>
            <p className="ml-12 mt-12 text-xl text-purple-300">Loading...</p>
          </div>
        </div>
      );
  }
};

export default Skeleton;
