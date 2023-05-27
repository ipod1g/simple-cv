import React from 'react';
import Image from 'next/image';

const Thumbnail = ({ thumbnail }: { thumbnail: string | null | undefined }) => {
  return (
    <Image
      src={
        thumbnail ??
        'https://static.vecteezy.com/system/resources/previews/001/971/958/original/blue-abstract-line-art-background-with-text-placeholder-vector.jpg'
      }
      width={500}
      height={0}
      quality={80}
      alt="thumbnail"
      className="aspect-video object-cover object-center max-h-64 h-auto w-auto"
    />
  );
};

export default Thumbnail;
