import React from 'react';
import SectionTitle from './common/SectionTitle';
import { TNotionData } from '@/types/types';
import dynamic from 'next/dynamic';
import Skeleton from '@/components/common/Skeleton';

const LazyProjects = dynamic(() => import('./Projects'), {
  ssr: false,
  loading: () => <Skeleton />,
});
const LazyExperience = dynamic(() => import('./Experience'), {
  ssr: false,
  loading: () => <Skeleton />,
});
const LazyExtras = dynamic(() => import('./Extras'), {
  ssr: false,
  loading: () => <Skeleton />,
});

const LazySections = (props: { notionDataArray: TNotionData[] }) => {
  return (
    <>
      <section
        id="project-section"
        //   ref={projectsSection}
      >
        <SectionTitle title="Projects" />
        <LazyProjects notionDataArray={props.notionDataArray} />
      </section>
      <hr />
      <section
        id="xp-section"
        //   ref={experienceSection}
      >
        <SectionTitle title="Experiences" />
        <LazyExperience notionDataArray={props.notionDataArray} />
      </section>
      <hr />
      <section
        id="extras-section"
        //   ref={extrasSection}
      >
        <SectionTitle title="Extra-curricular" />
        <LazyExtras notionDataArray={props.notionDataArray} />
      </section>
      <hr />
    </>
  );
};

export default LazySections;
