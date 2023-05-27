import React from 'react';

const SectionTitle = (props: { title: string }) => {
  return (
    <h1 className="p-4 md:ml-12 tracking-[8px] text-3xl mb-3 font-bold dark:text-white">
      {props.title}
    </h1>
  );
};

export default SectionTitle;
