import React, { useRef } from 'react';
import ScrollBarIndicator from './ScrollBarIndicator';
import ProjectContentBox from '../project/ProjectContentBox';
import ContentBoxBullet from './ContentBoxBullet';
import { TNotionData } from '@/types/types';

interface ProjectsProps {
  notionDataArray: TNotionData[];
  onClick: (id) => void;
}

export default function Projects({ notionDataArray, ...rest }: ProjectsProps) {
  const projContainerRef = useRef(null);
  return (
    <div className="flex flex-row-reverse justify-center md:justify-end h-fit relative">
      <ol
        className="ml-[28px] mr-[5%] lg:ml-8 p-4 w-full relative max-w-7xl"
        ref={projContainerRef}
      >
        {notionDataArray.map((project, idx: number) => {
          if (project.section === 'Projects') {
            return (
              <ProjectContentBox key={project.id} content={project} {...rest} />
            );
          }
        })}
      </ol>
    </div>
  );
}
