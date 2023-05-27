import React from 'react';
import Image from 'next/image';
import PrimaryTitle from '../common/PrimaryTitle';

export const NotionModalHeader = ({ project }: any) => {
  return (
    <div className="my-4">
      <div className="text-4xl font-bold pt-6 md:pt-10 px-[12%]">
        <PrimaryTitle
          title={project.title}
          style={{ fontSize: '2rem' }}
          className="-ml-2"
        />
      </div>
      <Image
        width="600"
        height="0"
        priority
        style={{ objectFit: 'cover', height: '400px' }}
        className="my-6 w-11/12 md:w-3/4 mx-auto max-h-64 rounded-sm"
        src={
          project.thumbnail
            ? project.thumbnail
            : 'https://static.vecteezy.com/system/resources/previews/001/971/958/original/blue-abstract-line-art-background-with-text-placeholder-vector.jpg'
        }
        alt="project image"
        quality={50}
      />
    </div>
  );
};
