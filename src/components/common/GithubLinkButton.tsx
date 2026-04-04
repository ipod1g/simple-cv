import { motion } from "framer-motion";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface GithubLinkButtonProps extends React.HTMLProps<HTMLAnchorElement> {
  link: string;
}

/** LinkButtons are anchors not button tags */
const GithubLinkButton = ({ link, ...rest }: GithubLinkButtonProps) => {
  return (
    <motion.div whileHover={{ color: "#c9a96e" }}>
      <a target="_blank" rel="noreferrer" href={link} {...rest}>
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </motion.div>
  );
};

export default GithubLinkButton;
