import {
  faArrowUpRightFromSquare,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';

interface ExternalLinkButtonProps extends React.HTMLProps<HTMLAnchorElement> {
  link: string;
}

/** LinkButtons are anchors not button tags */
const ExternalLinkButton = ({ link, ...rest }: ExternalLinkButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.15, color: '#c199e5e0' }}
      whileTap={{ scale: 1 }}
      className="text-xl"
    >
      <a target="_blank" rel="noreferrer" href={link} {...rest}>
        {/* <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> */}
        <FontAwesomeIcon icon={faLink} />
      </a>
    </motion.div>
  );
};

export default ExternalLinkButton;
