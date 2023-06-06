import React, { useState } from "react";
import { useGetContactQuery } from "../redux/contactApi";
import Cookies from "js-cookie";
import { BsThreeDots } from "react-icons/bs";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { VscMenu } from "react-icons/vsc";


const ContactTable = () => {
  const token = Cookies.get("token");
  const { data } = useGetContactQuery(token);
  const contactList = data?.contacts?.data;
  console.log(contactList);

  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <>
      <button
        onClick={toggleSideBar}
        className="w-12 h-12 absolute top-1 hover:bg-gray-100 rounded-full flex items-center text-2xl justify-center mx-5"
      >
        <VscMenu />
      </button>
      <div className="flex">
      {!sideBar ? <SideBar/>: null}
      <div className="relative w-full overflow-x-auto mt-5">

        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-4"></th>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th scope="col" className="px-6 ">
                Email
              </th>
              <th scope="col" className="px-6 ">
                Phone
              </th>
              <th scope="col" className="px-6 ">
                Address
              </th>
              <th scope="col" className="px-6 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contactList?.map((contact) => {
              return (
                <tr
                  key={contact?.id}
                  className="bg-white border-b hover:bg-blue-50 hover:shadow-lg  "
                >
                  <td className="pl-10 py-1">
                    {contact?.photo === null ? (
                      <button className="w-10 h-10 rounded-full bg-blue-400">
                        {contact?.name.charAt(0).toUpperCase()}
                      </button>
                    ) : (
                      <img
                        className="w-10 h-10 rounded-full"
                        src="/docs/images/people/profile-picture-1.jpg"
                        alt="Jese image"
                      ></img>
                    )}
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {contact?.name.toUpperCase()}
                  </th>
                  <td className="px-6 py-1 ">{contact?.email}</td>
                  <td className="px-6 py-1 ">{contact?.phone}</td>
                  <td className="px-6 py-1 ">{contact?.address}</td>
                  <td className="px-6 py-1">
                    <button
                      id="dropdownDividerButton"
                      data-dropdown-toggle="dropdownDivider"
                      className="px-4 py-2 z-10"
                      type="button"
                    >
                      <BsThreeDots />
                    </button>
                    {/* Dropdown menu */}
                    <div
                      id="dropdownDivider"
                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDividerButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Earnings
                          </a>
                        </li>
                      </ul>
                      <div className="py-2">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Separated link
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
      
    </>
  );
};

export default ContactTable;
