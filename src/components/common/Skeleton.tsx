import React from 'react';
import ContentBoxBullet from '../content/ContentBoxBullet';

const Skeleton = (props: { shape?: string }) => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

  switch (props.shape) {
    case 'diamond':
      return (
        <div className="ml-[28px] lg:ml-8 p-4 max-w-4xl w-5/6 lg:w-3/4 relative">
          <ContentBoxBullet shape="diamond">
            <div className={`h-64 w-full absolute ${shimmer}`}>
              <p className="ml-12 mt-12 text-xl text-purple-300 animate-pulse">
                Loading...
              </p>
            </div>
          </ContentBoxBullet>
        </div>
      );

    case 'circle':
      return (
        <div className="ml-[28px] lg:ml-8 p-4 max-w-4xl w-5/6 lg:w-3/4 relative">
          <ContentBoxBullet shape="circle">
            <div className={`h-64 w-full absolute ${shimmer}`}>
              <p className="ml-12 mt-12 text-xl text-purple-300 animate-pulse">
                Loading...
              </p>
            </div>
          </ContentBoxBullet>
        </div>
      );

    case 'triangle':
      return (
        <div className="ml-[26px] lg:ml-8 p-4 max-w-4xl w-5/6 lg:w-3/4 relative">
          <ContentBoxBullet shape="triangle">
            <div className={`h-64 w-full absolute ${shimmer}`}>
              <p className="ml-12 mt-12 text-xl text-purple-300 animate-pulse">
                Loading...
              </p>
            </div>
          </ContentBoxBullet>
        </div>
      );
    default:
      return (
        <div className="ml-[28px] lg:ml-8 p-4 max-w-4xl w-5/6 lg:w-3/4 relative">
          <div className="ml-6 lg:ml-0">
            <div className={`h-64 w-full absolute ${shimmer}`}>
              <p className="ml-12 mt-12 text-xl text-purple-300 animate-pulse">
                Loading...
              </p>
            </div>
          </div>
        </div>
      );
  }
};

export default Skeleton;
