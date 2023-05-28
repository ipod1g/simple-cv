import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import Selfie from '/public/assets/selfie.jpeg';
import Image from 'next/image';
import Footer from '../common/Footer';
import DarkModeToggleButton from './DarkModeToggleButton';

const ProfileTab = () => {
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
          <div className="absolute top-8 left-8">
            <DarkModeToggleButton />
          </div>
          <div
            id="selfie-wrapper"
            className="rounded-full my-6 mx-auto flex justify-center items-center h-[160px] w-[160px] aspect-square bg-[#e5e5e5] dark:bg-neutral-900 morphism-inner transition-colors duration-500 "
          >
            <Image
              id="selfie"
              src={Selfie}
              className="rounded-full object-contain saturate-[.85] h-full w-full p-[32px]"
              alt="My selfie"
              width={160}
              height={160}
              priority
            />
          </div>
          <aside className="text-sm">
            <h3 className="text-lg text-purple-800 dark:text-purple-400 transition-colors duration-200">
              Ku Bon Kwan (Bono) <br />
            </h3>
            <h4 className="leading-6 dark:text-white transition-colors duration-100">
              BSc in Physics, CUHK <br />
            </h4>
            <h4 className="leading-6 dark:text-white transition-colors duration-100">
              Frontend |&nbsp;
              <FontAwesomeIcon icon={faReact} color="rgb(12, 211, 218)" />
              &nbsp; React
            </h4>
            <p
              id="intro"
              className="italic text-[.8rem] lg:text-[.7rem] leading-normal my-4 max-w-[280px] mx-auto text-neutral-600 dark:text-neutral-400 transition-colors duration-200"
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
              border: '1px rgba(238, 238, 238, 0.3) solid',
              transition: { duration: 0.1 },
            }}
            initial={{
              border: '0px solid rgba(238, 238, 238, 0)',
            }}
            // bg-gradient-to-tr from-neutral-300 to-neutral-200 dark:bg-neutral-600/20 dark:from-neutral-600/20 dark:to-neutral-600/30 border-[1px] dark:border-black/30
            whileTap={{ scale: 0.99 }}
            className="rounded-md px-4 py-0 my-8 mx-auto h-14 
            morphism-outer dark:bg-gradient-to-tr from-neutral-700/50 to-neutral-700/30 transition-colors duration-200
            "
          >
            <a
              // href="/assets/CV.pdf"
              // download="CV.pdf"
              href="https://docs.google.com/document/d/1iOCAEYbtnJaxwnk-93Wl93FD0sGByxqgnPY7pwAdHWQ/"
              className="dark:text-gray-300 no-underline tracking-[2.5px] uppercase font-bold text-xs py-5 px-0 transition-colors duration-200"
            >
              VIEW MY CV
            </a>
          </motion.button>
        </div>
        <Footer />
      </article>
    </>
  );
};

export default ProfileTab;
