import React, { useRef } from 'react';
import ScrollBarIndicator from '../content/ScrollBarIndicator';
import ExperienceBox from '@/components/experience/ExperienceBox';
import ContentBoxBullet from '@/components/content/ContentBoxBullet';
import { TNotionData } from '@/types/types';

export default function Experience(props: { notionDataArray: TNotionData[] }) {
  return (
    <>
      <div className="flex flex-row-reverse justify-end h-fit relative">
        <ol className="md:px-10 w-full relative flex flex-wrap gap-4">
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