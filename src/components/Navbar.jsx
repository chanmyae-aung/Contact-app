import React from "react";
import { useLogoutMutation } from "../redux/authApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/authSlice";
import { setSearchTerm } from "../redux/contactSlice";
import { useNavigate } from "react-router-dom";
import {BiSearch} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'

const Navbar = () => {
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const nav = useNavigate();

  const logoutHandler = async () => {
    const data = await logout(token);
    dispatch(removeUser());
    console.log(data);
    nav("/login");
  };

  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
  // console.log(contacts);
  return (
    <>
    <div className="py-2.5 md:py-2 shadow-md flex justify-between items-center">
      <div className="px-20 flex gap-3 items-center">
        <img
          className="w-10 hidden md:flex"
          src="https://www.gstatic.com/images/branding/product/1x/contacts_2022_48dp.png"
          alt=""
        />
        <p className="text-xl font-semibold md:text-2xl">Contacts</p>
      </div>
      <div className=" flex-grow relative hidden md:flex">
        <BiSearch className="absolute top-3 text-gray-500 left-4 text-lg"/>
        <input
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          type="text"
          className="pl-12  shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Search..."
          value={searchTerm}
        />
      </div>
      <button className="md:mx-20 mx-5 flex items-center justify-center bg-purple-500 text-white rounded-full md:w-10 md:h-10 w-8 h-8">
        {user.name.charAt(0).toUpperCase()}
      </button>
    </div>
    </>

  );
};

export default Navbar;
