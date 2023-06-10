import React, { useState } from "react";
import { useCreateContactMutation } from "../redux/contactApi";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiImageAdd } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

const CreateContact = () => {
  const [create, { isLoading }] = useCreateContactMutation();
  const token = Cookies.get("token");
  const nav = useNavigate();
  // const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const contact = { name, email, phone, address };
    const { data } = await create({ token, data: contact });
    console.log(data);
    data?.success && nav("/");
  };

  return (
    <>
      <main className="flex flex-col w-full">
        <div className="flex items-center">
          <Link to={'/'} >
            <RxCross1 className="absolute top-16 ml-8 mt-5" />
          </Link>
          <button className="w-36 h-36 my-10 mx-20 rounded-full bg-blue-200 flex items-center justify-center text-3xl">
            <BiImageAdd />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={
              !isLoading
                ? " text-white ml-auto mr-40 mt-40 bg-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-6 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : " text-gray-300 ml-auto mr-40 mt-40 bg-gray-300  font-medium rounded-md text-sm px-6 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }
          >
            Save
          </button>
        </div>
        <hr />
        <form
          onSubmit={handleCreate}
          className="ml-20 mt-5 flex flex-col w-[50%]"
        >
          <div className="mb-6">
            <input
              type="name"
              id="name"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your name..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email..."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="phone"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your phone..."
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="address"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your address..."
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateContact;
