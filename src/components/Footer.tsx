import React from 'react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
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
          <FontAwesomeIcon icon={faGithub} />
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
          <FontAwesomeIcon icon={faLinkedin} />
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
          <FontAwesomeIcon icon={faEnvelope} />
        </motion.a>
      </div>
      <div style={{ fontSize: '11px', marginTop: '4px' }}>
        © 2023 Bono | All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
