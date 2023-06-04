import React, { useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/authApi";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate()
  const [showPassword, setShowPassword] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(<RxEyeOpen />);
  
  const dynamicId = "flexCheck" + Math.random();

  const togglePassword = () => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
    eyeIcon === <RxEyeOpen />
      ? setEyeIcon(<RxEyeClosed />)
      : setEyeIcon(<RxEyeOpen />);
  };

  const registerHandler = async (e) => {
    try {
      const user = { name, email, password, password_confirmation };
      e.preventDefault();
      const { data } = await register(user);
      console.log(data);
      data?.success && nav("/login")
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <BaseLayout>
        <form
          onSubmit={registerHandler}
          className="border p-5 pt-0 flex flex-col "
        >
          <img
            className="w-24 mt-5 mx-auto"
            src="https://seeklogo.com/images/G/google-contacts-logo-A07A806C3B-seeklogo.com.png"
            alt=""
          />
          <h2 className="text-center text-2xl text-gray-700 my-4 font-semibold">Sign up with your email</h2>
          <div className="mb-6">
            <input
              onChange={(e) => setName(e.target.value)}
              type="name"
              id="name"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your name..."
              required
            />
          </div>
          <div className="mb-6">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email..."
              required
            />
          </div>
          <div className="mb-6 relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword}
              id= {dynamicId}
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder="Enter your password..."
            />
            <label
            htmlFor={dynamicId}
              onClick={togglePassword}
              className="absolute top-0.5 right-0 px-5 py-3 cursor-pointer"
            >
              {eyeIcon}
            </label>
          </div>
          <div className="mb-6 relative">
            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type={showPassword}
              id={dynamicId}
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required=""
              placeholder="Confirm your password..."
            />
            <label
            htmlFor={dynamicId}
              onClick={togglePassword}
              className="absolute top-0.5 right-0 px-5 py-3 cursor-pointer"
            >
              {eyeIcon}
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={
              !isLoading
                ? " text-white w-full bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : " text-gray-300 w-full bg-gray-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }
          >
            Sign up
          </button>
        </form>
        <div className="flex justify-center gap-3 my-5 border  p-5">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <p className="text-blue-600">Sign in</p>
          </Link>
        </div>
      </BaseLayout>
    </>
  );
};

export default Register;
