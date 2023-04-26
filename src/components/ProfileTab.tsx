import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
// import './ProfileTab.css';
import Selfie from '../../public/assets/selfie.jpeg';
import Image from 'next/image';
// import CV from '../../public/assets/CV.pdf';

library.add(faReact, faGithub, faLinkedin, faInstagram, faEnvelope);

const ProfileTab = () => {
  return (
    <>
      <aside id="profile-tab-container" className="lg:flex-shrink-0 lg:w-80">
        <div
          id="profile-tab"
          className="px-5 py-0 text-center glass rounded-b-2xl lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center lg:fixed lg:rounded-r-2xl lg:w-80"
        >
          <div
            id="selfie-wrapper"
            className="mx-auto flex justify-center items-center h-44 w-44 aspect-square rounded-full bg-slate-900 deep-shadow-inner"
          >
            <Image
              id="selfie"
              src={Selfie}
              className="rounded-full object-contain saturate-90"
              alt="My selfie"
              height="100"
              width="100"
            />
          </div>
          <summary className="text-sm list-none">
            <span className="text-lg text-[#c199e5e0]">
              Ku Bon Kwan (Bono) <br />
            </span>
            BSc in Physics, CUHK <br />
            Frontend |&nbsp;
            <FontAwesomeIcon
              // icon="fa-brands fa-react"
              icon={faReact}
              color="rgb(12, 211, 218)"
            />
            &nbsp; React
            <p id="intro" className="italic text-[.8rem] leading-loose my-3">
              Prospective mentality, a self-motivator, and a creative and
              persevering deep problem solver
            </p>
          </summary>
          <div id="origins" className="text-base">
            👨‍👩‍👦‍👦 <span className="text-xs">KR</span> 🎒
            <span className="text-xs">MY</span> 🎓
            <span className="text-xs">HK</span>
          </div>
          {/* 🇰🇷 🇲🇾 🇭🇰*/}
          <motion.button
            whileHover={{
              scale: 1.1,
              border: '1px rgba(238, 238, 238, 0.291) solid',
            }}
            whileTap={{ scale: 0.99 }}
            className="rounded-xl px-4 py-0 my-4 mx-auto h-14 bg-slate-800"
          >
            <a
              href="../../public/assets/CV.pdf"
              download="CV.pdf"
              className="text-gray-300 no-underline tracking-[2.5px] uppercase font-bold text-xs py-5 px-0
            "
            >
              Download CV
            </a>
          </motion.button>
        </div>
      </aside>

      <footer
        id="footer"
        className="fixed bottom-0 pt-3 pb-2 z-50 glass w-full flex flex-col items-center lg:border-none lg:shadow-none lg:w-[310px] lg:pb-4 lg:bg-transparent"
      >
        <div id="social" className="flex gap-4 text-xl">
          <motion.a
            className="fa-icon"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/ipod1g"
            title=""
            whileHover={{ scale: 1.15, color: '#c199e5e0' }}
            whileTap={{ scale: 1 }}
          >
            <FontAwesomeIcon
              icon={faGithub}
              // icon="fa-brands fa-github"
            />
          </motion.a>
          <motion.a
            className="fa-icon"
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/bono420/"
            title=""
            whileHover={{ scale: 1.15, color: '#c199e5e0' }}
            whileTap={{ scale: 1 }}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </motion.a>
          <motion.a
            className="fa-icon"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/bon-kwan-ku-340082245/"
            title=""
            whileHover={{ scale: 1.15, color: '#c199e5e0' }}
            whileTap={{ scale: 1 }}
          >
            <FontAwesomeIcon
              //icon="fa-brands fa-linkedin"
              icon={faLinkedin}
            />
          </motion.a>
          <motion.a
            className="fa-icon"
            target="_blank"
            rel="noreferrer"
            href="mailto:kubonkwan99@gmail.com"
            title=""
            whileHover={{ scale: 1.15, color: '#c199e5e0' }}
            whileTap={{ scale: 1 }}
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              //icon="fa-regular fa-envelope"
            />
          </motion.a>
        </div>
        <div style={{ fontSize: '11px', marginTop: '4px' }}>
          © 2022 Bono | All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default ProfileTab;
