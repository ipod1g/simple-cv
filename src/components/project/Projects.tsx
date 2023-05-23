import React from 'react';
import ProjectContentBox from './ProjectContentBox';
import { TNotionData } from '@/types/types';

interface ProjectsProps {
  notionDataArray: TNotionData[];
  onClick: (id) => void;
}

export default function Projects({ notionDataArray, ...rest }: ProjectsProps) {
  return (
    <div className="flex flex-row-reverse justify-center md:justify-end h-fit relative">
      <ol className="md:px-10 w-full relative max-w-7xl">
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
