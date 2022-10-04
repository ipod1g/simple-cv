import React from "react";
import { motion } from "framer-motion";

const About = () => {
   return (
      <div className="about-container">
         <div className="about-header">
            <h3>About</h3>
            <motion.button whileHover={{ scale: 1.1 }}>
               <a href="./directory/yourfile.pdf" download="newfilename">
                  Download CV
               </a>
            </motion.button>
         </div>
         <p>
            Hi, I'm an undergraduate in Physics at The Chinese University of
            Hong Kong, CUHK.
         </p>
         <p>
            Now I am a self-taught Frontend web developer passionate about
            creating aesthetic and functional experiences! 😊
         </p>
      </div>
   );
};

export default About;
