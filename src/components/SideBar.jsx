import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLogoutMutation } from "../redux/authApi";
import Cookies from "js-cookie";
import { removeUser } from "../redux/authSlice";
import { MdLogout } from "react-icons/md";
import { BiUser, BiHeart, BiPlus, BiTrashAlt} from "react-icons/bi";
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
    <div className="absolute md:relative z-20 w-80 bg-gray-50 md:bg-white md:w-96 h-[100%] flex flex-col">
      <Link to={"/create"}>
        <button className="w-52 my-7 flex items-center justify-center gap-2 py-3 px-4 bg-white-500 shadow-md hover:shadow-lg hover:bg-blue-50 hover:text-blue-500 rounded-full mb-5 ml-10 text-gray-700 font-semibold border">
          <BiPlus className="text-blue-500 text-2xl font-bold"/>
          Create Contact
        </button>
      </Link>
      <div>
        <div className="flex justify-between items-center py-2 px-10 mr-10 rounded-e-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer">
          <p className="  flex gap-3 items-center">
            <BiUser />
            Contacts
          </p>
          <span className="text-sm">{contacts?.length}</span>
        </div>
        <p className="py-2 px-10 mr-10 rounded-e-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer flex gap-3 items-center">
          <BiHeart />
          Favorites
        </p>
        <p className="py-2 px-10 mr-10 rounded-e-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer flex gap-3 items-center">
          <BiTrashAlt />
          Trash
        </p>
        <p onClick={logoutHandler} className="py-2 px-10 mr-10 rounded-e-full hover:bg-red-500 cursor-pointer flex gap-3 items-center hover:text-white">
        <MdLogout />
        Logout
        </p>
      </div>
    </div>
  );
};

export default SideBar;
