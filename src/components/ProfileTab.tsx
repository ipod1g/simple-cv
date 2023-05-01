import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import Selfie from '../../public/assets/selfie.jpeg';
import Image from 'next/image';
import Footer from './Footer';

const ProfileTab = () => {
  const blurDataURL =
    'data:image/webp;base64,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';

  return (
    <>
      <article
        id="profile-tab-container"
        className="w-full lg:flex-shrink-0 lg:w-[320px]"
      >
        <div
          id="profile-tab"
          className="px-5 py-0 text-center glass rounded-b-2xl lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center lg:fixed lg:rounded-r-2xl"
        >
          <div
            id="selfie-wrapper"
            className="rounded-full my-6 mx-auto flex justify-center items-center h-[160px] w-[160px] aspect-square bg-neutral-900 deep-shadow-inner"
          >
            <Image
              id="selfie"
              src={Selfie}
              className="rounded-full object-contain saturate-[.85] h-full w-full p-[32px]"
              alt="My selfie"
              blurDataURL={blurDataURL}
            />
          </div>
          <aside className="text-sm">
            <h3 className="text-lg text-purple-400">
              Ku Bon Kwan (Bono) <br />
            </h3>
            <h4 className="leading-6">
              BSc in Physics, CUHK <br />
            </h4>
            <h4 className="leading-6">
              Frontend |&nbsp;
              <FontAwesomeIcon icon={faReact} color="rgb(12, 211, 218)" />
              &nbsp; React
            </h4>
            <p
              id="intro"
              className="italic text-[.8rem] leading-loose my-3 max-w-[280px] mx-auto text-neutral-400"
            >
              Prospective mentality, a self-motivator, and a creative and
              persevering deep problem solver
            </p>
          </aside>
          <div id="origins" className="text-base">
            👨‍👩‍👦‍👦 <span className="text-xs">KR</span> 🎒
            <span className="text-xs">MY</span> 🎓
            <span className="text-xs">HK</span>
          </div>
          <motion.button
            whileHover={{
              scale: 1.08,
              border: '1px rgba(238, 238, 238, 0.3) solid',
              transition: { duration: 0.1 },
            }}
            initial={{
              border: '0px solid rgba(238, 238, 238, 0)',
            }}
            whileTap={{ scale: 0.99 }}
            className="rounded-2xl px-4 py-0 my-4 mx-auto h-14 bg-neutral-600/20"
          >
            <a
              href="/assets/CV.pdf"
              download="CV.pdf"
              className="text-gray-300 no-underline tracking-[2.5px] uppercase font-bold text-xs py-5 px-0"
            >
              Download CV
            </a>
          </motion.button>
        </div>
        <Footer />
      </article>
    </>
  );
};

export default ProfileTab;
