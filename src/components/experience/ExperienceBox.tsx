import React from 'react';
import { TNotionData } from '@/types/types';
import ContentDuration from '@/components/common/DurationText';
import PrimaryTitle from '@/components/common/PrimaryTitle';
import CompanyLogo from '@/components/experience/CompanyLogo';

interface ContentBoxProps {
  content: TNotionData;
}

const ExperienceBox = (props: ContentBoxProps) => {
  const { id, title, subTitle, duration, projectURL, thumbnail } =
    props.content;

  return (
    <li className="group bg-white dark:bg-black/70 p-10 mb-6 ml-0 lg:ml-6 transition-all flex flex-col flex-shrink-0 duration-600 min-w-[240px] lg:max-w-[340px] w-[40vw] border border-neutral-300/20">
      <div className="flex w-full justify-between">
        <PrimaryTitle title={title} />
      </div>
      <div className="flex flex-col xl:flex-row py-6 relative gap-6 lg:gap-8">
        <div className="w-full h-auto flex-1 flex justify-start">
          <CompanyLogo logo={thumbnail} />
        </div>
      </div>
      <ContentDuration duration={duration} />
      <div className="flex justify-between">
        <div className="text-lg font-semibold text-white">{subTitle}</div>
        {/* {projectURL && <ExternalLinkButton link={projectURL} />} */}
      </div>
    </li>
  );
};
export default ExperienceBox;
