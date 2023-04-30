import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import ContentDuration from './ContentDuration';
import { TNotionData } from '@/types/types';

const ContentBox = (props: { content: TNotionData }) => {
  const { title, subTitle, duration, projectURL, githubURL, points } =
    props.content;

  return (
    <>
      <motion.li
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ ease: 'easeOut', duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-black/30 px-10 py-4 mb-20 ml-0 lg:ml-6 content-box"
      >
        <div className="flex gap-1">
          <a
            className="title-text font-semibold text-xl transition-all cursor-pointer max-w-[75%]"
            target="_blank"
            rel="noreferrer"
            href={projectURL}
          >
            {title}
          </a>

          {githubURL && (
            <>
              <div className="font-bold text-2xl">
                <span className="font-extralight text-xl opacity-70">
                  &nbsp;|
                </span>
              </div>
              <div className="text-2xl ml-1">
                <motion.a
                  className="fa-icon"
                  target="_blank"
                  rel="noreferrer"
                  href={'#'}
                  title=""
                  whileHover={{ scale: 1.15, color: '#c199e5e0' }}
                  whileTap={{ scale: 1 }}
                >
                  <FontAwesomeIcon icon={faGithub} />
                </motion.a>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between pt-1 items-end">
          <div className="italic text-base text-white/50 max-w-[50%]">
            {subTitle}
          </div>
          <ContentDuration duration={duration} />
        </div>
        <hr className="mx-0 mt-3" />
        <ul className="ml-4">
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
                className="list-circle mb-8 lg:mb-4 text-lg w-11/12 break-words"
              >
                {point}
              </li>
            ) : null;
          })}
        </ul>
        {/* <Link href={`/${props.post.id}`}>Read post →</Link> */}
      </motion.li>
    </>
  );
};

export default ContentBox;