import { TNotionBulletPoints } from '@/types/types';
import React from 'react';

const ProjectContentBulletPoints = ({ points }: TNotionBulletPoints) => {
  return (
    <ul className="flex-1 flex flex-col items-center">
      {Object.values(points).map((point, index) => {
        return point !== undefined && point !== null ? (
          <li
            key={index}
            className="list-circle mb-8 lg:mb-4 text-base w-11/12 break-words"
          >
            {point}
          </li>
        ) : (
          <React.Fragment key={index} />
        );
      })}
    </ul>
  );
};

export default ProjectContentBulletPoints;
