import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CloseButton from './common/CloseButton';
import HamburgerButton from './common/HamburgerButton';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const navBarOptions = [
    {
      section: 'About',
      marginRight: '4px',
    },
    {
      section: 'Project',
      marginRight: '0',
    },
    {
      section: 'Work',
      marginRight: '6px',
    },
    {
      section: 'Extra',
      marginRight: '6.5px',
    },
    {
      section: 'Skill',
      marginRight: '9px',
    },
  ];

  const navVariant = {
    hamburger: showNavbar
      ? { opacity: 0, transition: { duration: 0.3, type: 'spring' } }
      : { opacity: 1, transition: { type: 'spring' } },
    close: showNavbar ? { opacity: 1 } : { opacity: 0 },
    navbar: showNavbar
      ? { opacity: 1, transition: { delay: 0.1, type: 'spring' } }
      : { opacity: 0, transition: { type: 'spring' } },
  };

  return (
    <div className="fixed right-0 top-0 h-screen">
      <motion.div
        className={`absolute top-8 right-8 w-8 h-fit cursor-pointer text-3xl z-40  ${
          showNavbar ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        initial={{ opacity: 0 }}
        variants={navVariant}
        animate="hamburger"
        onClick={() => setShowNavbar(true)}
      >
        <HamburgerButton />
      </motion.div>

      <motion.div
        variants={navVariant}
        animate="close"
        onClick={() => {
          setShowNavbar(false);
        }}
        className={`opacity-0 absolute top-8 right-8 h-8 w-8 cursor-pointer text-3xl z-40 ${
          showNavbar ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <CloseButton />
      </motion.div>

      <motion.nav
        id="nav-bar"
        variants={navVariant}
        animate="navbar"
        className="opacity-0 bg-gradient-to-t from-neutral-500/20 to-black/80 z-20 absolute top-1/2 -translate-y-1/2 right-4 rounded-3xl h-3/4 flex flex-col justify-around items-end py-40 hover:opacity-100 gap-10 origin-right"
        whileHover={{
          width: '7rem',
          paddingRight: 10,
          // border: '1px solid rgba(238, 238, 238, 0.3)',
          transition: { duration: 0.1 },
        }}
        initial={{
          // border: '1px solid transparent',
          width: '5rem',
        }}
      >
        {navBarOptions.map((option) => {
          return (
            <motion.a
              key={option.section}
              href={`#${option.section.toLowerCase()}-section`}
              style={{ marginRight: option.marginRight }}
              whileHover={{ scale: 1, letterSpacing: '4px' }}
              whileTap={{ scale: 1 }}
              className="hover:cursor-pointer font-bold pr-1"
            >
              {option.section}
            </motion.a>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default Navbar;
