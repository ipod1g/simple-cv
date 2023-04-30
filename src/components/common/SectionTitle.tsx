import React from 'react';

const SectionTitle = (props: { title: string }) => {
  return (
    <h3 className="p-4 ml-12 tracking-[8px] text-3xl mb-3 font-bold">
      {props.title}
    </h3>
  );
};

export default SectionTitle;