import React, { useRef } from 'react';
import ScrollBarIndicator from './ScrollBarIndicator';
import ContentBox from '@/components/content/ContentBox';
import ContentBoxBullet from '@/components/content/ContentBoxBullet';
import { TNotionData } from '@/types/types';

export default function Experience(props: { notionDataArray: TNotionData[] }) {
  const xpContainerRef = useRef(null);
  return (
    <>
      <div className="flex flex-row-reverse justify-end h-fit relative">
        <ol
          className="ml-[26px] lg:ml-8 p-4 max-w-4xl w-5/6 lg:w-3/4 relative"
          ref={xpContainerRef}
        >
          {props.notionDataArray.map((project, idx: number) => {
            if (project.section === 'Experience') {
              return (
                <ContentBoxBullet key={project.id} shape="triangle">
                  <ContentBox content={project} />
                </ContentBoxBullet>
              );
            }
          })}
        </ol>
        <ScrollBarIndicator ref={xpContainerRef} />
      </div>
    </>
  );
}
