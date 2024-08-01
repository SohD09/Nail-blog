import React from "react";
import { InfinitySpin } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <InfinitySpin color="#183155" />
    </div>
  );
};

export default Loader;
