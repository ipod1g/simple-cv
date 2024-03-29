import React from 'react';

/** Dimensions must be specified by parent wrapper */
const CloseButton = () => {
  return (
    <button
      id="close-button"
      className="rounded-md inline-flex items-center justify-center text-black dark:text-white hover:text-purple-800 dark:hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
