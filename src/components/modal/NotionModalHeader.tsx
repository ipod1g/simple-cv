import React from 'react';
import Image from 'next/image';

export const NotionModalHeader = ({ project }: any) => {
  return (
    <div className="my-4">
      <h1 className="text-4xl font-bold my-2">{project.title}</h1>
      <Image
        width="600"
        height="0"
        priority
        style={{ objectFit: 'cover', height: '400px' }}
        className="w-full rounded-xl border"
        src={
          project.coverImage
            ? project.coverImage
            : 'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png'
        }
        alt="project image"
        quality={50}
      />
      <h2 className="font-semibold my-2">Tech Stacks</h2>
      <div className="flex flex-row items-center flex-wrap"></div>
      <div className="flex flex-col justify-center items-center my-8">
        <div className="border-2 w-12 rounded-md border-sky-200 dark:border-sky-700" />
      </div>
    </div>
  );
};
