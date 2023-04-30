import React, { useRef } from 'react';
import ScrollBarIndicator from './ScrollBarIndicator';
import ContentBox from './common/ContentBox';
import ContentBoxBullet from './common/ContentBoxBullet';
import SectionTitle from './common/SectionTitle';
import { TNotionData } from '@/types/types';

export default function Projects(props: { notionDataArray: TNotionData[] }) {
  const projContainerRef = useRef(null);
  return (
    <>
      <SectionTitle title="Projects" />
      <div className="flex flex-row-reverse justify-end h-fit relative">
        <ol
          className="ml-[28px] lg:ml-8 p-4 max-w-4xl w-5/6 lg:w-3/4 relative"
          ref={projContainerRef}
        >
          {props.notionDataArray.map((project, idx: number) => {
            if (project.section === 'Projects') {
              return (
                <ContentBoxBullet key={project.id} shape="diamond">
                  <ContentBox content={project} />
                </ContentBoxBullet>
              );
            }
          })}
        </ol>
        <ScrollBarIndicator ref={projContainerRef} />
      </div>
    </>
  );
}
