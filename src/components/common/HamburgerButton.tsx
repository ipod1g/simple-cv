import React from 'react';

const HamburgerButton = () => {
  return (
    <button id="hamburger-button">
      <div
        className="absolute top-4 -mt-0.5 h-[3px] w-8 rounded-sm bg-white/90 transition-all duration-300 
      before:absolute before:h-[3px] before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded-sm before:bg-white/90 before:transition-all before:duration-500 before:content-['']
       after:absolute after:h-[3px] after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded-sm after:bg-white/90 after:transition-all after:duration-500 after:content-['']"
      ></div>
    </button>
  );
};

export default HamburgerButton;
