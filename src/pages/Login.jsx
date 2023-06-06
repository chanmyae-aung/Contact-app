import React, { useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/authSlice";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [invalidPassword, setInvalidPassword] = useState("")
  console.log(invalidPassword)

  const loginHandler = async (e) => {
    try {
      const user = { email, password };
      e.preventDefault();
      const { data } = await login(user);
      console.log(data);
      data?.success && nav("/");
      password.length < 8 ? setInvalidPassword("password must have at least 8 letters") : setInvalidPassword("")
      data?.success === false ? setInvalidPassword("invalid password") : setInvalidPassword("")
      dispatch(addUser({ user: data.user, token: data.token }));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <BaseLayout>
        <form
          onSubmit={loginHandler}
          className=" p-5 pt-0 flex flex-col md:border"
        >
          <img
            className="w-24 mx-auto mt-5"
            src="https://seeklogo.com/images/G/google-contacts-logo-A07A806C3B-seeklogo.com.png"
            alt=""
          />
          <h2 className="text-center text-2xl text-gray-700 my-4 font-semibold">
            Sign in to Contacts
          </h2>
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
              onChange={(e) => {
                setPassword(e.target.value)
                setInvalidPassword(""); 
              }}
              type={showPassword ? "text" : "password"}
              id="password"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder="Enter your password..."
            />
            {<p className="text-red-500 text-sm">{invalidPassword}</p> }
            <p
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-0.5 right-0 px-5 py-3 cursor-pointer"
            >
              {!showPassword ? <RxEyeClosed/> : <RxEyeOpen/>}
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={
              !isLoading
                ? " text-white w-full bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                : " text-gray-300 w-full bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            }
          >
            Sign in
          </button>
        </form>
        <div className="flex justify-center gap-3 my-5 md:border p-5">
          <p>Don't have an account?</p>
          <Link to={"/register"}>
            <p className="text-blue-600">Sign up</p>
          </Link>
        </div>
      </BaseLayout>
    </>
  );
};

export default Login;
