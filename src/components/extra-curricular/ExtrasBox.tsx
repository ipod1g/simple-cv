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
}

const ExtrasBox = (props: ContentBoxProps) => {
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

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{
        opacity: 1,
        scale: 1,
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
      <div className="flex flex-col xl:flex-row py-6 relative gap-6 xl:gap-16">
        <div className="w-full h-auto flex justify-center">
          <Thumbnail thumbnail={thumbnail} />
        </div>
        <div>
          <div className="text-white mb-2">
            <h2 className="text-xl">{subTitle}</h2>
            <ContentDuration duration={duration} />
          </div>
          <ProjectContentBulletPoints points={points} />
        </div>
      </div>
      <div className="flex justify-between">{subTitle}</div>
    </motion.li>
  );
};
export default ExtrasBox;
