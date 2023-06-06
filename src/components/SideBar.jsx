import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLogoutMutation } from "../redux/authApi";
import Cookies from "js-cookie";
import { removeUser } from "../redux/authSlice";
import { MdLogout } from "react-icons/md";
import { BiUser, BiHeart } from "react-icons/bi";
import { useGetContactQuery } from "../redux/contactApi";

const SideBar = () => {
    const user = JSON.parse(Cookies.get("user"));
    const token = Cookies.get("token");
    const { data } = useGetContactQuery(token);
    const contacts = data?.contacts?.data;
    // console.log(contacts.length)
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
    <div className=" w-96 h-[100%] flex flex-col visited:transition ease-in-out duration-500">
      <Link to={"/create"}>
        <button className="w-52 my-7  py-3 px-4 bg-white-500 shadow-md hover:shadow-lg hover:bg-blue-50 hover:text-blue-500 rounded-full mb-5 ml-10 text-gray-700 font-semibold border">
          Create Contact
        </button>
      </Link>
      <div>
        <div className="flex justify-between items-center py-2 px-10 mr-10 rounded-e-full hover:bg-blue-100">
          <p className="  flex gap-3 items-center">
            <BiUser />
            Contacts
          </p>
          <span className="text-sm">{contacts?.length}</span>
        </div>
        <p className="py-2 px-10 mr-10 rounded-e-full hover:bg-blue-100 flex gap-3 items-center">
          <BiHeart />
          Favourites
        </p>
      </div>
      <div className="py-2 px-10 mr-10 w-full hover:bg-red-500 hover:text-white flex gap-3 items-center cursor-pointer">
        <MdLogout />
        <span onClick={logoutHandler}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default SideBar;
