import React from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="  text-dark-blue dark:text-gray-200  min-h-screen ">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
