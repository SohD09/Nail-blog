import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import signupbg from "../assets/images/signupbg.png";

const Signup = () => {
  return (
    <div className=" min-h-[calc(100vh-100px)] relative flex justify-center items-center bg-gradient-to-tr from-pastel-magenta to-classic-rose xl:bg-none">
      <img
        src={signupbg}
        alt="bg"
        className="fixed top-0 left-0 object-fill -z-10 opacity-0 xl:opacity-100 "
      />
      <div className=" bg-white absolute h-[50%] w-[60%] flex rounded-lg shadow-gray-400 p-5 shadow-lg bg-opacity-45 xl:bg-opacity-40 xl:h-[70%]">
        <div className=" flex p-3 max-w-3xl mx-auto my-auto flex-col lg:flex-row lg:items-center gap-5 ">
          <div className="flex-1">
            <Link
              to="/"
              className="text-sm sm:text-4xl font-bold dark:text-white "
            >
              <span className=" bg-gradient-to-r from-royal-blue to-cyclamen rounded-lg text-transparent bg-clip-text dark:bg-gradient-to-r dark:from-light-cobalt-blue dark:to-cyclamen">
                Nailed
                <span className="text-black dark:text-off-white">It.</span>
              </span>
            </Link>
            <p className="font-Rosaviro text-dark-blue text-sm sm:text-md mt-5">
              To checkout exciting nail art ideas and tips, Signup with your
              email and password or with Google.
            </p>
          </div>
          <div className="flex-1">
            <form className="flex flex-col gap-4">
              <div>
                <Label value="Your username" />
                <TextInput type="text" placeholder="Username" id="username" />
              </div>
              <div>
                <Label value="Your email" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                />
              </div>
              <Button gradientDuoTone="purpleToBlue" type="submit">
                Signup
              </Button>
            </form>
            <div className="flex gap-2 mt-5 text-sm sm:text-base ">
              <span>Have an account?</span>
              <Link to="/signin" className="text-royal-blue font-semibold">
                Signin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
