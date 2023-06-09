import React, { useEffect, useState } from "react";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/contactApi";
import Cookies from "js-cookie";
import SideBar from "./SideBar";
import { VscMenu } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contactSlice";
import { Loader } from "@mantine/core";
import { BiEditAlt, BiHeart, BiTrash, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  const [deleteContact] = useDeleteContactMutation(token);
  const contactList = data?.contacts?.data;

  const dispatch = useDispatch();

  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  // const [dropdown, setDropdown] = useState(false);
  // const dropdownToggle = () => {
  //   setDropdown(!dropdown);
  // };
  const contacts = useSelector((state) => state.contactSlice.contact);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);

  const filteredContacts = contacts?.filter((item) => {
    if (searchTerm === null) return item;
    else if (item?.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
      return item;
  });
  useEffect(() => {
    dispatch(addContact(contactList));
  }, [data]);

  if (isLoading)
    return (
      <Loader
        variant="bars"
        size="sm"
        className="flex justify-center mx-auto items-center h-screen"
        color="indigo"
      />
    );

  const deleteHandler = async (id) => {
    const data = await deleteContact({ id, token });
    console.log(data);
  };

  return (
    <>
      <button
        onClick={toggleSideBar}
        className="w-12 h-12 absolute top-0 md:top-1 md:hover:bg-gray-100 rounded-full flex items-center text-2xl justify-center mx-5"
      >
        <VscMenu />
      </button>
      {!contacts && <p>No contacts found</p>}
      <div className="flex">
        {sideBar ? (
          <div className=" transform transition-all z-10 bg-white translate-x-0 w-80 md:96 shadow-lg ease-linear duration-300 ">
            <SideBar />
          </div>
        ) : (
          <div className=" transform transition-all z-10 bg-white -translate-x-80 md:w-0 ease-linear duration-300 ">
            <SideBar />
          </div>
        )}
        <div className="md:relative -z-50 absolute w-full overflow-x-auto mt-5 transition ease-linear duration-300">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-4 hidden md:table-cell"></th>
                <th scope="col" className="px-6 py-4 hidden md:table-cell">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 hidden md:table-cell ">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 hidden md:table-cell ">
                  Phone
                </th>
                <th scope="col" className="px-6 py-4 hidden md:table-cell ">
                  Address
                </th>
                <th scope="col" className="px-6 py-4 hidden md:table-cell ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts?.map((contact) => {
                return (
                  <tr
                    key={contact?.id}
                    className="bg-white border-b hover:bg-blue-50 hover:shadow-lg  "
                  >
                    <td className="pl-10 py-1">
                      {contact?.photo === null ? (
                        <button className="w-10 text-white font-bold h-10 rounded-full bg-pink-400">
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
                    <td className="px-6 py-1 hidden md:table-cell ">
                      {contact?.email}
                    </td>
                    <td className="px-6 py-1 hidden md:table-cell ">
                      {contact?.phone}
                    </td>
                    <td className="px-6 py-1 hidden md:table-cell ">
                      {contact?.address}
                    </td>
                    <td className="px-6 py-1 text-lg font-thin text-gray-600 flex gap-3 items-center justify-center">
                      <button>
                        <BiHeart />
                      </button>
                      <Link to={`/update/${contact?.id}`}>
                        <button>
                          <BiEditAlt />
                        </button>
                      </Link>
                      <button onClick={() => deleteHandler(contact?.id)}>
                        <BiTrash />
                      </button>

                      {/* <button
                        onClick={(e)=> console.log(e.target)}
                        className="px-4 py-2 z-10"
                        type="button"
                      >
                        <BsThreeDots />
                      </button>
                      {dropdown && (
                        <div className="absolute z-10 bg-white text-gray-700 pt-1">
                          <button className="px-4 py-2">favorite</button>
                          <button className="px-4 py-2">print</button>
                          <button className="px-4 py-2">edit</button>
                          <button className="px-4 py-2">delete</button>
                        </div>
                      )} */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {contactList.length === 0 && (
            <div className="flex flex-col justify-center items-center h-96">
              <img src="https://ouch-cdn2.icons8.com/avCbGk2kxWMZ55e5M_-mDt87KgZ6mQClX54gZn1tVRI/rs:fit:256:192/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzQ0/L2I1ODkxMDJlLTlk/NTQtNDJmMi1iODhk/LTA2ZTM2ODQzNTg3/ZC5zdmc.png" />
              <p className="text-xl mb-4 font-bold">No contacts found</p>
              <Link to={"/create"}>
                <p className=" text-blue-500 font-semibold flex gap-3 items-center">
                  <BiUser />
                  Create contact
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactTable;
