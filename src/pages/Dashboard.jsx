import React, { useState } from "react";
import Navbar from "../components/Navbar";
// import ContactTable from '../components/ContactTable'
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";

const Dashboard = () => {
  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <div className="flex">
      <button
        onClick={toggleSideBar}
        className="w-12 h-12 absolute top-0 md:top-1 md:hover:bg-gray-100 rounded-full flex items-center text-2xl justify-center mx-5"
      >
        <VscMenu />
      </button>
      {!sideBar ? (
        <div className=" transform transition-all z-10 bg-white translate-x-0 w-72 shadow-lg ease-linear duration-300 ">
          <SideBar />
        </div>
      ) : (
        <div className=" transform transition-all z-10 bg-white -translate-x-80 md:w-0 ease-linear duration-300 ">
          <SideBar />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Dashboard;
