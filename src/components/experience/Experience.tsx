import React from 'react';
import ExperienceBox from '@/components/experience/ExperienceBox';
import { TNotionData } from '@/types/types';

export default function Experience(props: { notionDataArray: TNotionData[] }) {
  return (
    <>
      <div className="flex flex-row-reverse justify-end h-fit relative">
        <ol className="md:pl-10 lg:ml-6 w-full relative flex flex-wrap gap-3">
          {props.notionDataArray.map((project, idx: number) => {
            if (project.section === 'Experience') {
              return <ExperienceBox key={project.id} content={project} />;
            }
          })}
        </ol>
      </div>
    </>
  );
}
