import React from 'react';

// make it appear before js load -> preload
const Loading = () => {
  return (
    <>
      <div className="py-6 px-1 animate-pulse">Fetching data...</div>
    </>
  );
};

export default Loading;
