import { motion } from 'framer-motion';
import React from 'react';
import { TNotionData } from '@/types/types';
import ContentDuration from '@/components/common/DurationText';
import ExternalLinkButton from '@/components/common/ExternalLinkButton';
import GithubLinkButton from '@/components/common/GithubLinkButton';
import PrimaryTitle from '@/components/common/PrimaryTitle';
import ProjectContentBulletPoints from '@/components/project/ProjectContentBulletPoints';
import Thumbnail from '@/components/common/Thumbnail';

interface ContentBoxProps {
  content: TNotionData;
  onClick: (id: string) => void;
}

const ProjectContentBox = (props: ContentBoxProps) => {
  const {
    id,
    title,
    subTitle,
    duration,
    projectURL,
    githubURL,
    points,
    thumbnail,
  } = props.content;

  const { onClick } = props;

  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-black/70 p-10 mb-20 ml-0 lg:ml-6 transition-colors flex flex-col duration-600"
    >
      <div className="flex w-full justify-between">
        <PrimaryTitle title={title} />
        <div className="flex justify-center items-center gap-4">
          {githubURL && (
            <>
              <div className="text-2xl ml-1">
                <GithubLinkButton link={githubURL} />
              </div>
            </>
          )}
          {projectURL && <ExternalLinkButton link={projectURL} />}
        </div>
      </div>
      <div className="flex flex-col xl:flex-row py-6 relative gap-6 lg:gap-8">
        <div className="w-full h-auto flex-1 flex justify-center">
          <Thumbnail thumbnail={thumbnail} />
        </div>
        <ProjectContentBulletPoints points={points} />
      </div>
      <div className="flex justify-between">
        <ContentDuration duration={duration} />
        <button
          className="text-purple-600 font-semibold dark:font-normal dark:text-purple-300 self-end text-lg tracking-widest"
          onClick={() => onClick(id)}
        >
          Read More
        </button>
      </div>
    </motion.li>
  );
};
export default ProjectContentBox;
