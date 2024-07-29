import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupbg from "../assets/images/signupbg.png";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) return setErrorMessage(data.message);
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  return (
    <div className=" min-h-[calc(100vh-100px)] relative flex justify-center items-center bg-gradient-to-tr from-pastel-magenta to-classic-rose xl:bg-none">
      <img
        src={signupbg}
        alt="bg"
        className="fixed top-0 left-0 object-fill -z-10 opacity-0 xl:opacity-100 "
      />
      <div className=" bg-white absolute min-h-[50%] w-[60%] flex rounded-lg shadow-gray-400 p-5 shadow-lg bg-opacity-45 xl:bg-opacity-40 xl:min-h-[70%]">
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
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Your username" />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
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
                  "Signup"
                )}
              </Button>
            </form>
            <div className="flex gap-2 mt-5 text-sm sm:text-base ">
              <span>Have an account?</span>
              <Link to="/signin" className="text-royal-blue font-semibold">
                Signin
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-2 bg-red-300 text-red-950" color="red">
                {errorMessage}
                {console.log(errorMessage)}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
