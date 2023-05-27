import React from 'react';
import ExtrasBox from '@/components/extra-curricular/ExtrasBox';
import { TNotionData } from '@/types/types';

export default function Extras(props: { notionDataArray: TNotionData[] }) {
  return (
    <>
      <div className="flex flex-row-reverse justify-center md:justify-end h-fit relative">
        <ol className="md:px-10 w-full relative max-w-7xl">
          {props.notionDataArray.map((project, idx: number) => {
            if (project.section === 'Extra') {
              return <ExtrasBox key={project.id} content={project} />;
            }
          })}
        </ol>
      </div>
    </>
  );
}
