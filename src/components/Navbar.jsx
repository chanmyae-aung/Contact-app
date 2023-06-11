import React from "react";
import { useLogoutMutation } from "../redux/authApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/authSlice";
import { setSearchTerm, setShow } from "../redux/contactSlice";
import { Link, useNavigate } from "react-router-dom";
import { BiCheckShield, BiLogOut, BiSearch, BiUserPlus } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  // const user = JSON.parse(Cookies.get('user')) // throw an error => undefined is not valid in json.parse
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null; // to prevent above error
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

  const show = useSelector((state) => state.contactSlice.show)
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
          <BiSearch className="absolute top-3 text-gray-500 left-4 text-lg" />
          <input
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            type="text"
            className="pl-12  shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Search..."
            value={searchTerm}
          />
        </div>
        <button
          onClick={() => dispatch(setShow())}
          className="md:mx-20 mx-5 flex items-center justify-center bg-purple-500 text-white rounded-full md:w-10 md:h-10 w-8 h-8"
        >
          {user?.name.charAt(0).toUpperCase()}
        </button>
      </div>
      {/* dropdown menu */}
      {show && (
        <div className="w-96 transition-all rounded-xl absolute z-20 bg-blue-50 right-0 top-16 p-2 shadow-xl">
          <div className="  rounded-xl  bg-white right-0 top-16 p-5 shadow-xl">
            <div className="flex items-center gap-5">
              <button className="w-12 text-white font-bold h-12 bg-purple-500 rounded-full">
                {user?.name.charAt(0).toUpperCase()}
              </button>
              <div>
                <h2 className="font-bold">{user?.name}</h2>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
            <button className="ml-16 p-1.5 px-8 my-5 text-sm font-bold border border-black rounded-md bg-gray-100 hover:bg-gray-200 text-black">
              Manage your google account
            </button>
            <div className="flex gap-3 items-center mb-3 cursor-pointer">
              <BiCheckShield className="text-xl" />
              <p className="font-bold">Recommended actions</p>
            </div>
            <hr />
            <Link to={"/login"}>
              <div className="flex gap-3 items-center mt-3 cursor-pointer">
                <BiUserPlus className="text-xl" />
                <p className="font-bold">Add another account</p>
              </div>
            </Link>
          </div>
          <div className="m-5">
            <div
              onClick={logoutHandler}
              className="flex gap-3 items-center cursor-pointer hover:text-red-500"
            >
              <MdLogout className="text-lg" />
              <p className="font-bold">Log out of all accounts </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
