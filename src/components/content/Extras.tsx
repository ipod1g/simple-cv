import React, { useRef } from 'react';
import ScrollBarIndicator from './ScrollBarIndicator';
import ContentBox from '@/components/content/ContentBox';
import ContentBoxBullet from '@/components/content/ContentBoxBullet';
import { TNotionData } from '@/types/types';

export default function Extras(props: { notionDataArray: TNotionData[] }) {
  const extrasContainerRef = useRef(null);
  return (
    <>
      <div className="flex flex-row-reverse justify-end h-fit relative">
        <ol
          className="ml-[28px] lg:ml-8 p-4 max-w-4xl w-5/6 lg:w-3/4 relative"
          ref={extrasContainerRef}
        >
          {props.notionDataArray.map((project, idx: number) => {
            if (project.section === 'Extra') {
              return (
                <ContentBoxBullet key={project.id} shape="square">
                  <ContentBox content={project} />
                </ContentBoxBullet>
              );
            }
          })}
        </ol>
        <ScrollBarIndicator ref={extrasContainerRef} />
      </div>
    </>
  );
}
