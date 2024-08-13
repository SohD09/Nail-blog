import React from "react";

const About = () => {
  return (
    <div className="bg-[url(/aboutbg.jpg)] dark:bg-[url(/aboutbgdark.jpg)] relative min-h-screen w-full bg-cover">
      <div className="absolute top-0 left-0 h-full w-full flex  justify-center bg-off-white dark:bg-dark-theme-bg bg-opacity-40 dark:bg-opacity-40">
        <div className="max-w-2xl mx-auto p-3 text-center">
          <div>
            <h1 className="text-3xl font font-semibold text-center my-7">
              About NailedIt.
            </h1>
            <div className="text-lg font-Rosaviro text-gray-700 dark:text-gray-300 font-medium dark:text-md flex flex-col gap-6">
              <p>
                Welcome to NailedIt. This blog was created by Sohini Das as a
                personal project to share her nail art ideas and process. She
              </p>

              <p>
                On this blog, you'll find articles and tutorials on different
                nail art styles, as well as tips and tricks to take care of your
                nails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
