import React from 'react';

// fix wrap behavior
const PrimaryTitle = ({ title }: { title: string }) => {
  return (
    <div className="title-text font-semibold text-xl transition-all cursor-pointer pr-2 dark:text-white duration-1000">
      <span className="font-extralight text-xl opacity-70">|&nbsp;&nbsp;</span>
      {title}
    </div>
  );
};

export default PrimaryTitle;
