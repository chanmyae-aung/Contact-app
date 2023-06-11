import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  BiBuildingHouse,
  BiEnvelope,
  BiImageAdd,
  BiPhone,
  BiUser,
} from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/contactApi";
import { useNavigate, useParams } from "react-router-dom";

const UpdateContact = () => {
  // edit(update) လုပ်မယ်ဆိုရင် edit လုပ်မယ့် contact ရဲ့ id, user token ရယ်လိုတယ်
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data } = useGetSingleContactQuery({ id, token });
//   console.log(data);
  const nav = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setName(data?.contact.name);
    setEmail(data?.contact.email);
    setPhone(data?.contact.phone);
    setAddress(data?.contact.address);
  }, [data]);

  const [update, {isLoading}] = useUpdateContactMutation({ id, token });

  const updateHandler = async (e) => {
    e.preventDefault();
    const updatedContact = { id, name, email, phone, address };
    const { data } = await update({ token, updatedContact });
    // console.log(data);
    data?.success && nav(-1)
  };
  return (
    <>
      <main className="flex flex-col w-full">
        <div className="flex items-center">
          <RxCross1 onClick={() => nav(-1)} className="absolute top-16 ml-8 mt-5 cursor-pointer" />
          <button className="w-36 h-36 my-10 mx-20 rounded-full bg-blue-200 flex items-center justify-center text-3xl">
            <BiImageAdd />
          </button>
        </div>
        <hr />
        <form
          onSubmit={updateHandler}
          className="ml-20 mt-5 flex flex-col w-[50%]"
        >
          <button
            type="submit"
            disabled={isLoading}
            className={
              !isLoading
                ? "absolute right-0 top-56 text-white ml-auto mr-40 bg-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-6 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : "absolute right-0 top-56 text-gray-300 ml-auto mr-40 bg-gray-300  font-medium rounded-md text-sm px-6 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }
          >
            Save
          </button>
          <div className="mb-6 flex gap-5 items-center">
            <BiUser className="text-gray-500 text-xl" />
            <input
              value={name}
              type="name"
              id="name"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your name..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6 flex gap-5 items-center">
            <BiEnvelope className="text-gray-500 text-xl" />
            <input
              value={email}
              type="email"
              id="email"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 flex gap-5 items-center">
            <BiPhone className="text-gray-500 text-xl" />
            <input
              value={phone}
              type="text"
              id="phone"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your phone..."
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-6 flex gap-5 items-center">
            <BiBuildingHouse className="text-gray-500 text-xl" />
            <input
              value={address}
              type="text"
              id="address"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your address..."
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default UpdateContact;
