import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import Selfie from '../../public/assets/selfie.jpeg';
import Image from 'next/image';
import Footer from './Footer';

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
          <div
            id="selfie-wrapper"
            className="rounded-full my-6 mx-auto flex justify-center items-center h-[160px] w-[160px] aspect-square bg-neutral-900 deep-shadow-inner"
          >
            <Image
              id="selfie"
              src={Selfie}
              className="rounded-full object-contain saturate-[.85] h-full w-full p-[32px]"
              alt="My selfie"
              placeholder="blur"
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
