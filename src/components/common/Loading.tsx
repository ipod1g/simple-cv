import React from 'react';

// make it appear before js load -> preload
const Loading = () => {
  return (
    <>
      <div className="bg-black/30 px-10 py-4 mb-20 ml-0 lg:ml-16 w-3/4 h-64">
        Fetching data...
      </div>
      <hr />
    </>
  );
};

export default Loading;
