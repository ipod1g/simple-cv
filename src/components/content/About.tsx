import React from "react";
import SectionTitle from "@/components/common/SectionTitle";

const About = () => {
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
          Hi, I'm a Physics graduate turned Software Engineer — I build reliable
          and scalable web systems with a focus on performance, and the kind of
          UI details most people don't notice until they're missing.
        </p>
        <p>Check out my projects through the links!</p>
      </div>
    </div>
  );
};

export default About;
