import React from 'react';
import Image from 'next/image';
import spaceLoopBlur from '/public/assets/spaceloop-blur.webp';
import lightMode from '/public/assets/ingrid-salmanca-Y6OKbIFe4Z0-unsplash_3.jpg';
import { useTheme } from 'next-themes';
// static import can allow use of placeholder easier

const Background = () => {
  const { theme } = useTheme();

  return (
    <Image
      className="h-full object-cover fixed -z-10 inset-0 opacity-10 blur-sm object-left lg:object-center"
      // src={spaceLoopBlur}
      src={theme === 'light' ? lightMode : spaceLoopBlur}
      width={1920}
      height={1080}
      style={
        theme === 'light'
          ? {
              opacity: 1,
            }
          : {
              opacity: 0.1,
            }
      }
      alt={'Galaxy spinning background'}
      placeholder="blur"
    />
  );
};

export default Background;
