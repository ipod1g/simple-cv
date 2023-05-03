import React, { useEffect } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import Skeleton from '@/components/common/Skeleton';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Extras from '@/components/Extras';
import { TNotionData } from '@/types/types';
import useNotionData from '@/hooks/useNotionData';
import { parseDatabase } from '@/controllers/notionController';

const NotionSection = () => {
  const { data, isLoading, isError } = useNotionData('cv_database');

  const [notionDataArray, setNotionDataArray] = React.useState<TNotionData[]>();

  useEffect(() => {
    if (data) {
      setNotionDataArray(parseDatabase(data));
    }
    if (isError) {
      console.error('Error fetching data from Notion');
    }
  }, [data]);

  return (
    <>
      <section id="project-section">
        <SectionTitle title="Projects" />
        {!isLoading && notionDataArray ? (
          <Projects notionDataArray={notionDataArray} />
        ) : (
          <Skeleton />
        )}
      </section>
      <hr />
      <section id="work-section">
        <SectionTitle title="Experiences" />
        {!isLoading && notionDataArray ? (
          <Experience notionDataArray={notionDataArray} />
        ) : (
          <Skeleton />
        )}
      </section>
      <hr />
      <section id="extra-section">
        <SectionTitle title="Extra-curricular" />
        {!isLoading && notionDataArray ? (
          <Extras notionDataArray={notionDataArray} />
        ) : (
          <Skeleton />
        )}
      </section>
      <hr />
    </>
  );
};

export default NotionSection;
