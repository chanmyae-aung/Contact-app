import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/authApi";
import Cookies from "js-cookie";
import { removeUser } from "../redux/authSlice";
import { MdLogout, MdOutlineAutoFixHigh } from "react-icons/md";
import {TfiImport} from 'react-icons/tfi'
import { BiUser, BiHeart, BiPlus,BiDownload } from "react-icons/bi";
import {BsTrash} from 'react-icons/bs'
import { useGetContactQuery } from "../redux/contactApi";

const SideBar = () => {
  // const user = JSON.parse(Cookies.get('user')) // throw an error: undefined is not valid in json.prase
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null; // to prevent above error
  const token = Cookies.get("token");
  const { data } = useGetContactQuery(token);
  const contacts = data?.contacts?.data;
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const nav = useNavigate();

  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser(user));
    data?.success && nav("/login");
    console.log(data);
  };

  return (
      <div className=" md:relative z-20 bg-white w-72  flex flex-col">
        <Link to={"create"}>
          <button className="w-52 my-7 flex items-center justify-center gap-2 py-3 px-4 bg-white-500 shadow-md hover:shadow-lg hover:bg-blue-50 hover:text-blue-500 rounded-full mb-5 ml-10 text-gray-700 font-bold border">
            <BiPlus className="text-blue-500 text-2xl font-bold" />
            Create Contact
          </button>
        </Link>
        <div>
          <Link to={"table"}>
            <div className="flex justify-between items-center py-3 px-10 mr-10 rounded-e-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer">
              <p className="text-sm font-bold flex gap-3 items-center">
                <BiUser className="text-lg" />
                Contacts
              </p>
              <span className="text-sm font-bold">{contacts?.length}</span>
            </div>
          </Link>
          <Link to={"favorite"}>
            <p className="py-3 px-10 mr-10 text-sm font-bold rounded-e-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer flex gap-3 items-center">
              <BiHeart className="text-lg" />
              Favorites
            </p>
          </Link>
        </div>
        <div>
          <div className="flex justify-between items-center py-3 px-10 mr-10 mt-5">
            <h2 className="text-lg font-semibold">Fix and Manage</h2>
          </div>
          <p className="py-3 px-10 mr-10 text-sm font-bold rounded-e-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer flex gap-3 items-center">
            <MdOutlineAutoFixHigh className="text-xl" />
            Merge and fix
          </p>
          {/* <p
            onClick={logoutHandler}
            className="py-3 px-10 mr-10 text-sm font-bold rounded-e-full hover:bg-blue-100 cursor-pointer flex gap-3 items-center hover:text-red-500"
          >
            <MdLogout className="text-lg" />
            Logout
          </p> */}
          <p className="py-3 px-10 mr-10 text-sm font-bold rounded-e-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer flex gap-3 items-center">
            <BiDownload className="text-lg"/>
            Import
          </p>
          <p className="py-3 px-10 mr-10 text-sm font-bold rounded-e-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer flex gap-3 items-center">
            <BsTrash className="text-lg" />
            Bin
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center py-2 px-10 mr-10 mt-5">
            <h2 className="text-lg font-semibold">Label</h2>
            <BiPlus className="" />
          </div>
        </div>
      </div>
  );
};

export default SideBar;
