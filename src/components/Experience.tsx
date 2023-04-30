import React, { useRef } from 'react';
import ScrollBarIndicator from './ScrollBarIndicator';
import ContentBox from '@/components/common/ContentBox';
import ContentBoxBullet from '@/components/common/ContentBoxBullet';
import SectionTitle from '@/components/common/SectionTitle';

export default function Experience(props: { notionData }) {
  const xpContainerRef = useRef(null);
  return (
    <>
      <SectionTitle title="Experiences" />
      <div className="flex flex-row-reverse justify-end h-fit relative">
        <ol
          className="ml-[28px] lg:ml-8 p-4 max-w-4xl w-5/6 lg:w-3/4 relative"
          ref={xpContainerRef}
        >
          {props.notionData.map((project, idx: number) => {
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
