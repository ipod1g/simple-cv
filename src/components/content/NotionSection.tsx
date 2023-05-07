import React, { useEffect, useState } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import Skeleton from '@/components/common/Skeleton';
import Projects from '@/components/content/Projects';
import Experience from '@/components/content/Experience';
import Extras from '@/components/content/Extras';
import { TNotionData } from '@/types/types';
import useNotionData from '@/hooks/useNotionData';
import { parseDatabase } from '@/controllers/notionController';

const NotionSection = (props: { notionDataArray: TNotionData[] }) => {
  // const { data, isLoading, isError } = useNotionData('cv_database');
  // const [notionDataArray, setNotionDataArray] = useState<TNotionData[]>();

  // useEffect(() => {
  //   if (data) {
  //     setNotionDataArray(parseDatabase(data));
  //   }
  //   if (isError) {
  //     console.error('Error fetching data from Notion');
  //   }
  // }, [data]);

  return (
    <>
      <section id="project-section">
        <SectionTitle title="Projects" />
        {props.notionDataArray ? (
          <Projects notionDataArray={props.notionDataArray} />
        ) : (
          <Skeleton shape="diamond" />
        )}
      </section>
      <hr />
      <section id="work-section">
        <SectionTitle title="Experiences" />
        {props.notionDataArray ? (
          <Experience notionDataArray={props.notionDataArray} />
        ) : (
          <Skeleton shape="circle" />
        )}
      </section>
      <hr />
      <section id="extra-section">
        <SectionTitle title="Extra-curricular" />
        {props.notionDataArray ? (
          <Extras notionDataArray={props.notionDataArray} />
        ) : (
          <Skeleton shape="triangle" />
        )}
      </section>
      <hr />
    </>
  );
};

export default NotionSection;
