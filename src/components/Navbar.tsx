import React from 'react';
import { motion } from 'framer-motion';
const Navbar = (props) => {
  const navBarOptions = [
    {
      section: 'About',
      ref: props.aboutSection,
      marginRight: '4px',
    },
    {
      section: 'Project',
      ref: props.projectSection,
      marginRight: '0',
    },
    {
      section: 'Work',
      ref: props.experienceSection,
      marginRight: '6px',
    },
    {
      section: 'Extra',
      ref: props.extrasSection,
      marginRight: '6.5px',
    },
    {
      section: 'Skill',
      ref: props.skillsSection,
      marginRight: '9px',
    },
  ];

  return (
    <motion.nav
      id="nav-bar"
      className="fixed my-[7%] mx-0 right-4 w-20 rounded-3xl h-3/4 flex flex-col justify-around items-end py-40 opacity-70 glass hover:opacity-100 gap-10 origin-right"
      whileHover={{
        width: '7rem',
        paddingRight: 10,
        border: '1px solid #ffffff22',
      }}
    >
      {navBarOptions.map((option) => {
        return (
          <motion.button
            key={option.section}
            onClick={() => {
              props.scrollToSection(option.ref);
            }}
            style={{ marginRight: option.marginRight }}
            whileHover={{ scale: 1, letterSpacing: '4px' }}
            whileTap={{ scale: 1 }}
            className="hover:cursor-pointer font-bold pr-1"
          >
            {option.section}
          </motion.button>
        );
      })}
    </motion.nav>
  );
};

export default Navbar;
