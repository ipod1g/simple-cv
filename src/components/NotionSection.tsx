import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import Skeleton from '@/components/common/Skeleton';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Extras from '@/components/Extras';
import { TNotionData } from '@/types/types';

const NotionSection = (props: { notionDataArray: TNotionData[] }) => {
  return (
    <>
      <section id="project-section">
        <SectionTitle title="Projects" />
        {props.notionDataArray ? (
          <Projects notionDataArray={props.notionDataArray} />
        ) : (
          <Skeleton />
        )}
      </section>
      <hr />
      <section id="work-section">
        <SectionTitle title="Experiences" />
        <Experience notionDataArray={props.notionDataArray} />
      </section>
      <hr />
      <section id="extra-section">
        <SectionTitle title="Extra-curricular" />
        <Extras notionDataArray={props.notionDataArray} />
      </section>
      <hr />
    </>
  );
};

export default NotionSection;
