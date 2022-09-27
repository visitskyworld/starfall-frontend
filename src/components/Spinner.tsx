import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-36 w-36 border-t-4 border-b-4 border-[#c0753e]"></div>
    </div>
  );
};

export default Spinner;
