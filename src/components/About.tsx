import React from 'react';

const About = () => {
  return (
    <div
      id="about-container"
      className="w-screen pr-[20%] lg:pr-10 lg:w-[60vw]"
    >
      <div className="flex justify-between items-center font-bold">
        <h3>About</h3>
      </div>
      <p className="leading-6 mb-[2px] ml-11 lg:pl-[70px]">
        Hi, I&apos;m a penultimate undergraduate in Physics at The Chinese
        University of Hong Kong, CUHK.
      </p>
      <p>
        Now I am a self-taught Frontend web developer passionate about creating
        aesthetic and functional experiences! 😊
      </p>
      <p>Check out my projects through the links!</p>
    </div>
  );
};

export default About;
