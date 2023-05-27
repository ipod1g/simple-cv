import React from 'react';

interface PrimaryTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  className?: string;
}

// fix wrap behavior
const PrimaryTitle = ({ title, className, ...rest }: PrimaryTitleProps) => {
  return (
    <div
      className={`font-semibold text-xl transition-all pr-2 dark:text-white duration-1000 relative ${className}`}
    >
      <h2
        className={`before:content-[''] h-fit before:h-full before:w-[1px] before:absolute before:dark:bg-pale/50 before:-left-3 `}
        {...rest}
      >
        {/* <span className="font-extralight text-xl opacity-70">
          |&nbsp;&nbsp;
        </span> */}
        {title}
      </h2>
    </div>
  );
};

export default PrimaryTitle;
