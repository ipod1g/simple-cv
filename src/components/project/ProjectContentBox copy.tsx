import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';
import ContentDuration from '../common/DurationText';
import { TNotionData } from '@/types/types';
import Image from 'next/image';
import ExternalLinkButton from '../common/ExternalLinkButton';
import GithubLinkButton from '../common/GithubLinkButton';

interface ContentBoxProps {
  content: TNotionData;
  onClick: (id) => void;
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
        <a
          className="title-text font-semibold text-xl transition-all cursor-pointer max-w-[75%] dark:text-white duration-1000"
          target="_blank"
          rel="noreferrer"
          href={projectURL}
        >
          <span className="font-extralight text-xl opacity-70">
            |&nbsp;&nbsp;
          </span>
          {title}
        </a>

        <div className="flex justify-center items-center gap-2">
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
      <div className="flex flex-col xl:flex-row py-6 gap-16 relative">
        <div className="w-full h-auto flex-1 flex justify-center">
          <Image
            src={
              thumbnail ??
              'https://static.vecteezy.com/system/resources/previews/001/971/958/original/blue-abstract-line-art-background-with-text-placeholder-vector.jpg'
            }
            width={500}
            height={0}
            quality={80}
            alt="thumbnail"
            className="aspect-video object-cover object-center max-h-64"
          />
        </div>
        {/* <hr className="mx-0 mt-3" /> */}
        <ul className="flex-1 flex flex-col items-center">
          {/* {pointCounts.map((num) => {
            const point =
              props.post.properties[`Point ${num}`].rich_text[0]?.plain_text;
            return point ? (
              <li className="list-circle mb-8 lg:mb-4 text-lg w-11/12 break-words">
                {point}
              </li>
            ) : null;
          })} */}
          {Object.values(points).map((point, index) => {
            return point !== undefined && point !== null ? (
              <li
                key={index}
                className="list-circle mb-8 lg:mb-4 text-base w-11/12 break-words"
              >
                {point}
              </li>
            ) : null;
          })}
        </ul>
      </div>
      <div className="flex justify-between">
        <ContentDuration duration={duration} />

        <button
          className="text-purple-300 self-end text-lg"
          onClick={() => onClick(id)}
        >
          Read More
        </button>
      </div>
      {/* <Link href={`/${props.post.id}`}>Read post →</Link> */}
    </motion.li>
  );
};

export default ProjectContentBox;
