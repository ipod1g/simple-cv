import React, { useState } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import Skeleton from '@/components/common/Skeleton';
import Projects from '@/components/project/Projects';
import Experience from '@/components/experience/Experience';
import Extras from '@/components/extra-curricular/Extras';
import { TNotionData } from '@/types/types';
import NotionModal from '@/components/modal/NotionModal';

const NotionSection = (props: { notionDataArray: TNotionData[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageId, setPageId] = useState('');
  const [modalProject, setModalProject] = useState<any | null>(null);

  const handleClick = (id: string) => {
    setPageId(id);
    const matchingObject = props.notionDataArray.find((obj) => obj.id === id);
    if (matchingObject) {
      setModalProject(matchingObject);
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="project-section">
        <SectionTitle title="Projects" />
        {props.notionDataArray ? (
          <Projects
            onClick={handleClick}
            notionDataArray={props.notionDataArray}
          />
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
          <Skeleton shape="square" />
        )}
      </section>
      <hr />
      <NotionModal
        project={modalProject}
        pageId={pageId}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NotionSection;
