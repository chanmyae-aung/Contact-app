import React, { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { useCreateContactMutation } from "../redux/contactApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const [create, { isLoading }] = useCreateContactMutation();
  const token = Cookies.get("token");
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [invalidName, setInvalidName] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPhone, setInvalidPhone] = useState("");
  const [invalidAddress, setInvalidAddress] = useState("");

  const handleCreate = async (e) => {
    const contact = { name, email, phone, address };
    e.preventDefault();
    const { data } = await create({ token, data: contact });
    console.log(data);
    phone.length < 9 && data?.success === false;
    data?.success && nav("/");
    !data?.success &&  setInvalidName("invalid name")
    !data?.success &&  setInvalidEmail("invalid email")
    !data?.success &&  setInvalidPhone("invalid phone")
    !data?.success &&  setInvalidAddress("invalid address")
  };

  return (
    <>
      <BaseLayout>
        <form
          onSubmit={handleCreate}
          className="md:border p-5 pt-0 flex flex-col "
        >
          <img
            className="w-24 mt-5 mx-auto"
            src="https://seeklogo.com/images/G/google-contacts-logo-A07A806C3B-seeklogo.com.png"
            alt=""
          />
          <h2 className="text-center text-2xl text-gray-700 my-4 font-semibold">
            Create new contact
          </h2>
          <div className="mb-6">
            <input
              type="name"
              id="name"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your name..."
              onChange={(e) => {
                setName(e.target.value)
                setInvalidName("")
            }}
            />
            {name.length < 3 && <p className="text-red-500 text-sm">{invalidName}</p> }
          </div>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email..."
              onChange={(e) => {
                setEmail(e.target.value)
                setInvalidEmail("")
            }}
            />
            {email.length <= 0 && <p className="text-red-500 text-sm">{invalidEmail}</p> }
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="phone"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your phone..."
              onChange={(e) => {
                setPhone(e.target.value)
                setInvalidPhone("")
            }}
            />
            {phone.length <9 && <p className="text-red-500 text-sm">{invalidPhone}</p> }

          </div>
          <div className="mb-6">
            <input
              type="text"
              id="address"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your address..."
              onChange={(e) => {
                setAddress(e.target.value)
                setInvalidAddress("")
            }}
            />
            {address.length < 4 && <p className="text-red-500 text-sm">{invalidAddress}</p> }

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
            Save
          </button>
        </form>
      </BaseLayout>
    </>
  );
};

export default CreateContact;
