import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signinbg from "../assets/images/signinbg.png";
import nails from "../assets/images/signinbgm.png";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill out all fields."));
    }
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) dispatch(signInFailure(data.message));

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <div className="min-h-[calc(100vh-50px)] relative flex justify-center items-center ">
      <img
        src={signinbg}
        alt="bg"
        className="fixed top-0 left-0 h-full w-full object-cover -z-10 opacity-0 xl:opacity-100 "
      />
      <img
        src={nails}
        alt="bg"
        className="fixed top-0 left-0 h-full w-full object-cover -z-10 opacity-100 xl:opacity-0 "
      />
      <div className=" bg-white absolute min-h-[50%] w-[60%] flex rounded-lg shadow-gray-500 p-5 shadow-md bg-opacity-50 xl:bg-opacity-40 xl:min-h-[70%]">
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
              To checkout exciting nail art ideas and tips, Signin with your
              email and password.
            </p>
          </div>
          <div className="flex-1 z-100">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Your email" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="purpleToBlue"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm"></Spinner>
                    <span>Loading...</span>
                  </>
                ) : (
                  "Signin"
                )}
              </Button>
            </form>
            <div className="flex gap-2 mt-5 text-sm sm:text-base ">
              <span>Donot have an account?</span>
              <Link to="/signup" className="text-royal-blue font-semibold">
                Signup
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-2 bg-red-300 text-red-950" color="red">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
