import React from "react";
import { InfinitySpin } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="h-screen w-screen text-center">
      <InfinitySpin height="100%" width="100%" color="#183155" />
    </div>
  );
};

export default Loader;
