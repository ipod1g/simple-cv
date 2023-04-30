import React from 'react';
import { motion } from 'framer-motion';
const Navbar = (props: {
  scrollToSection: (
    elementRef: React.MutableRefObject<HTMLElement | null>
  ) => void;
  aboutSection: React.MutableRefObject<HTMLElement | null>;
  projectsSection: React.MutableRefObject<HTMLElement | null>;
  experienceSection: React.MutableRefObject<HTMLElement | null>;
  extrasSection: React.MutableRefObject<HTMLElement | null>;
  skillsSection: React.MutableRefObject<HTMLElement | null>;
}) => {
  const navBarOptions = [
    {
      section: 'About',
      ref: props.aboutSection,
      marginRight: '4px',
    },
    {
      section: 'Project',
      ref: props.projectsSection,
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
        border: '1px solid rgba(238, 238, 238, 0.3)',
        transition: { duration: 0.1 },
      }}
      initial={{
        border: '0px solid rgba(238, 238, 238, 0)',
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
