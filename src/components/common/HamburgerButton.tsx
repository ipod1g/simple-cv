import React from 'react';

const HamburgerButton = () => {
  return (
    <button
      id="hamburger-button"
      className="text-black dark:text-white hover:text-purple-800 dark:hover:text-purple-400"
    >
      {/* <div
        className="absolute top-4 -mt-0.5 h-[3px] w-8 rounded-sm bg-black dark:bg-white/90 transition-transform duration-300
      before:absolute before:h-[3px] before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded-sm before:bg-black dark:before:bg-white/90 before:transition-all before:duration-500 before:content-['']
       after:absolute after:h-[3px] after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded-sm after:bg-black dark:after:bg-white/90 after:transition-all after:duration-500 after:content-['']"
      ></div> */}
      <svg
        className="h-full w-full"
        viewBox="0 0 80 48"
        width="40"
        height="40"
        stroke="currentColor"
        fill="currentColor"
      >
        <rect width="80" height="8" rx="4"></rect>
        <rect y="24" width="80" height="8" rx="4"></rect>
        <rect y="48" width="80" height="8" rx="4"></rect>
      </svg>
    </button>
  );
};

export default HamburgerButton;
