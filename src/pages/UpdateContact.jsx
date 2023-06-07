import React, { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { useGetSingleContactQuery, useUpdateContactMutation } from "../redux/contactApi";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const UpdateContact = () => {
  const token = Cookies.get("token");
  const {id} = useParams()
  const {data} = useGetSingleContactQuery({id, token})
  const [update, { isLoading }] = useUpdateContactMutation(token);
  const nav = useNavigate();
  console.log(data);

  const [name, setName] = useState(data?.contact.name);
  const [email, setEmail] = useState(data?.contact.email);
  const [phone, setPhone] = useState(data?.contact.phone);
  const [address, setAddress] = useState(data?.contact.address);

  const [invalidName, setInvalidName] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPhone, setInvalidPhone] = useState("");
  const [invalidAddress, setInvalidAddress] = useState("");

  const handleUpdate =  (e) => {
    console.log(name, email, phone, address)
    // const contact = { name, email, phone, address };
    e.preventDefault();
    // const { data } = await update({ token, data: contact });
    // console.log(data);
    // phone.length < 9 && data?.success === false;
    // data?.success && nav("/");
    // !data?.success &&  setInvalidName("invalid name")
    // !data?.success &&  setInvalidEmail("invalid email")
    // !data?.success &&  setInvalidPhone("invalid phone")
    // !data?.success &&  setInvalidAddress("invalid address")
  };

  return (
    <>
      <BaseLayout>
        <form
          onSubmit={handleUpdate}
          className="md:border p-5 pt-0 flex flex-col "
        >
          <img
            className="w-24 mt-5 mx-auto"
            src="https://seeklogo.com/images/G/google-contacts-logo-A07A806C3B-seeklogo.com.png"
            alt=""
          />
          <h2 className="text-center text-2xl text-gray-700 my-4 font-semibold">
            Edit contact
          </h2>
          <div className="mb-6">
            <input
              type="name"
              value={name}
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your name..."
              onChange={(e) => {
                setName(e.target.value)
                // setInvalidName("")
            }}
            />
            {/* {name.length < 3 && <p className="text-red-500 text-sm">{invalidName}</p> } */}
          </div>
          <div className="mb-6">
            <input
              type="email"
              value={email}
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email..."
              onChange={(e) => {
                setEmail(e.target.value)
                // setInvalidEmail("")
            }}
            />
            {/* {email.length <= 0 && <p className="text-red-500 text-sm">{invalidEmail}</p> } */}
          </div>
          <div className="mb-6">
            <input
              type="text"
              value={phone}
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your phone..."
              onChange={(e) => {
                setPhone(e.target.value)
                // setInvalidPhone("")
            }}
            />
            {/* {phone.length <9 && <p className="text-red-500 text-sm">{invalidPhone}</p> } */}

          </div>
          <div className="mb-6">
            <input
              type="text"
              value={address}
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your address..."
              onChange={(e) => {
                setAddress(e.target.value)
                // setInvalidAddress("")
            }}
            />
            {/* {address.length < 4 && <p className="text-red-500 text-sm">{invalidAddress}</p> } */}

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

export default UpdateContact;
