import React from 'react';
import Image from 'next/image';
import spaceLoopBlur from 'public/assets/spaceloop-blur.webp';
// static import can allow use of placeholder easier

const Background = () => {
  return (
    <Image
      className="h-full object-cover fixed -z-10 inset-0 opacity-10 blur-sm object-left lg:object-center"
      src={spaceLoopBlur}
      width={1920}
      height={1080}
      style={{
        opacity: 0.1,
        height: '100%',
        width: '100%',
      }}
      alt={'Galaxy spinning background'}
      placeholder="blur"
    />
  );
};

export default Background;
