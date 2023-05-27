import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';

const About = () => {
  // future: replace the bottom pr with text-wrap balance
  return (
    <div
      id="about-container"
      className="w-screen pr-[20%] lg:pr-10 lg:w-[60vw]"
    >
      <div className="flex justify-between items-center font-bold">
        <SectionTitle title="About" />
      </div>
      <div className="leading-7 mb-[2px] pl-4 md:pl-16">
        <p>
          Hi, I&apos;m a penultimate undergraduate in Physics at The Chinese
          University of Hong Kong, CUHK.
        </p>
        <p>
          Now I am a self-taught Frontend web developer passionate about
          creating aesthetic and functional experiences! 😊
        </p>
        <p>Check out my projects through the links!</p>
      </div>
    </div>
  );
};

export default About;
