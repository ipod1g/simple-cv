import React from 'react';
import { TNotionData } from '@/types/types';
import ContentDuration from '@/components/common/DurationText';
import PrimaryTitle from '@/components/common/PrimaryTitle';
import CompanyLogo from '@/components/experience/CompanyLogo';
import { motion } from 'framer-motion';

interface ContentBoxProps {
  content: TNotionData;
}

const ExperienceBox = (props: ContentBoxProps) => {
  const { id, title, subTitle, duration, projectURL, thumbnail } =
    props.content;

  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-black/70 p-10 mb-6 transition-all flex flex-col flex-shrink-0 duration-600 min-w-[240px] lg:max-w-[330px] w-[40vw] border border-neutral-300/20 justify-between"
    >
      <PrimaryTitle title={title} />
      {/* <h2 className="font-semibold text-white">{title}</h2> */}
      <div>
        <div className="flex flex-col xl:flex-row py-6 relative gap-6 lg:gap-8">
          <div className="w-full h-auto flex-1 flex justify-start">
            <CompanyLogo logo={thumbnail} />
          </div>
        </div>
        <ContentDuration duration={duration} />
        <div className="flex justify-between">
          <div className="text-base text-white">{subTitle}</div>
          {/* {projectURL && <ExternalLinkButton link={projectURL} />} */}
        </div>
      </div>
    </motion.li>
  );
};
export default ExperienceBox;
