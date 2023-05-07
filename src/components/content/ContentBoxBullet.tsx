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
          className="
          ml-6 lg:ml-0
          before:border-black before:border-2 dark:before:border-none before:bg-white before:absolute before:rotate-45 before:w-3 before:h-3 before:mt-7 before:z-50 before:left-0 before:content-['']"
        >
          {props.children}
        </div>
      );

    case 'circle':
      return (
        <div
          className="
          ml-6 lg:ml-0
          before:border-black before:border-2 dark:before:border-none before:bg-white before:absolute before:w-3 before:h-3 before:mt-7 before:z-50 before:left-0 before:content-[''] before:rounded-full"
        >
          {props.children}
        </div>
      );

    case 'square':
      return (
        <div
          className="
          ml-6 lg:ml-0
          before:border-black before:border-2 dark:before:border-none before:bg-white before:absolute before:w-3 before:h-3 before:mt-7 before:z-50 before:left-0 before:content-['']"
        >
          {props.children}
        </div>
      );
    default:
      return (
        <div
          className="
          ml-6 lg:ml-0
          before:bg-white before:absolute before:w-3 before:h-3 before:mt-7 before:z-50 before:left-0 before:content-[''] before:rounded-full"
        >
          {props.children}
        </div>
      );
  }
};

export default ContentBoxBullet;
