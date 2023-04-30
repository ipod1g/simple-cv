import React from 'react';

/** Not defining shape returns the default circle bullet */
const ContentBoxBullet = (props: {
  children: React.ReactNode;
  shape?: string;
}) => {
  switch (props.shape) {
    case 'diamond':
      return (
        <div
          className="before:bg-white before:absolute before:rotate-45 before:w-3
      before:h-3 before:mt-7 before:z-50 before:left-0 before:content-['']"
        >
          {props.children}
        </div>
      );

    case 'circle':
      return (
        <div
          className="before:bg-white before:absolute before:w-3
      before:h-3 before:mt-7 before:z-50 before:left-0 before:content-[''] before:rounded-full"
        >
          {props.children}
        </div>
      );

    case 'triangle':
      return (
        <div
          className="before:bg-transparent before:absolute before:w-3
        before:h-3 before:mt-7 before:z-50 before:-left-[1px] before:content-[''] before:border-l-[8px] before:border-l-transparent before:border-t-[14px] before:border-t-white before:border-r-[8px] before:border-r-transparent"
        >
          {props.children}
        </div>
      );
    default:
      return (
        <div
          className="before:bg-white before:absolute before:w-3
    before:h-3 before:mt-7 before:z-50 before:left-0 before:content-[''] before:rounded-full"
        >
          {props.children}
        </div>
      );
  }
};

export default ContentBoxBullet;
