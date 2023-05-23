import React from 'react';

const PrimaryTitle = ({ title }: { title: string }) => {
  return (
    <div className="title-text font-semibold text-xl transition-all cursor-pointer max-w-[75%] dark:text-white duration-1000">
      <span className="font-extralight text-xl opacity-70">|&nbsp;&nbsp;</span>
      {title}
    </div>
  );
};

export default PrimaryTitle;
