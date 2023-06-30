import React, { useEffect, useState } from "react";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/contactApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contactSlice";
import { Loader } from "@mantine/core";
import { BiDotsVerticalRounded, BiPrinter } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  MdOutlineFileUpload,
  MdOutlineModeEditOutline,
  MdStarOutline,
} from "react-icons/md";
import { LuImport } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";

const ContactTable = () => {
  const colors = [
    "#3b8c2a",
    "#986b53",
    "#f50422",
    "#983f7a",
    "#ea24a3",
    "#79352c",
    "#521250",
    "#c79ed2",
    "#d6dd92",
    "#e33e52",
    "#b2be57",
    "#fa06ec",
    "#1bb699",
    "#6b2e5f",
    "#64820f",
    "#21538e",
    "#89d534",
    "#d36647",
    "#7fb411",
    "#0023b8",
    "#3b8c2a",
    "#986b53",
    "#f50422",
    "#983f7a",
    "#ea24a3",
    "#79352c",
    "#521250",
    "#c79ed2",
    "#d6dd92",
    "#e33e52",
    "#b2be57",
    "#fa06ec",
    "#1bb699",
    "#6b2e5f",
    "#64820f",
    "#9cb64a",
    "#996c48",
    "#9ab9b7",
    "#06e052",
    "#e3a481",
    "#0eb621",
    "#fc458e",
  ];

  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  const [deleteContact] = useDeleteContactMutation(token);
  const contactList = data?.contacts?.data;
  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();

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
      <div className="flex flex-grow w-screen absolute lg:relative">
        <div className="md:relative absolute w-full overflow-x-auto mt-5 transition ease-linear duration-300">
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
                <th
                  scope="col"
                  className="px-6 py-4 hidden md:table-cell "
                ></th>
              </tr>
            </thead>
            <tbody className="">
              {filteredContacts?.map((contact) => {
                const randomColorIndex = Math.floor(
                  Math.random() * colors.length
                );
                const randomColor = colors[randomColorIndex];
                return (
                  <tr
                    key={contact?.id}
                    className="bg-white border-b hover:bg-blue-50 hover:shadow-lg odd:bg-gray-50 group/item"
                  >
                    <td className="pl-10 py-1">
                      {contact?.photo === null ? (
                        <button
                          style={{ backgroundColor: randomColor }}
                          className="w-10 text-white font-bold h-10 rounded-full"
                        >
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
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {contact?.name.length > 8 &&
                        contact?.name.substring(0, 8).toUpperCase() + " . . ."}
                    </th>
                    <td className="px-6 py-1 hidden md:table-cell ">
                      {contact?.email ? contact.emial : "example@gmail.com"}
                    </td>
                    <td className="px-6 py-1 hidden md:table-cell ">
                      {contact?.phone}
                    </td>
                    <td className="px-6 py-1 hidden md:table-cell ">
                      {contact?.address}
                    </td>
                    <td className="px-6 py-1 relative text-lg font-thin text-gray-600 flex gap-5 items-center justify-center invisible group-hover/item:visible">
                      <button>
                        <MdStarOutline />
                      </button>
                      <Link to={`/update/${contact?.id}`}>
                        <button>
                          <MdOutlineModeEditOutline />
                        </button>
                      </Link>
                      <button onClick={() => setShowMore(!showMore)}>
                        <BiDotsVerticalRounded />
                      </button>
                      {showMore && (
                        <div className="absolute top-12 right-10 w-52 flex flex-col z-10 bg-white text-gray-700 pt-1 shadow-lg">
                          <button className="px-4 py-2 flex gap-3 items-center hover:bg-gray-200 text-sm font-semibold">
                            <BiPrinter className="text-lg"/>
                            Print{" "}
                          </button>
                          <button className="px-4 py-2 flex gap-3 items-center hover:bg-gray-200 text-sm font-semibold">
                            <MdOutlineFileUpload className="text-lg"/>
                            Export
                          </button>
                          <button className="px-4 py-2 flex gap-3 items-center hover:bg-gray-200 text-sm font-semibold">
                            <LuImport className="text-lg"/>
                            Hide from contacts
                          </button>
                          <button className="px-4 py-2 flex gap-3 items-center hover:bg-gray-200 text-sm font-semibold">
                            <BsTrash className="text-lg"/>
                            Delete</button>
                        </div>
                      )}
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
                <p className="cursor-pointer text-blue-500 font-semibold flex gap-2 items-center">
                  <BiUserPlus className="text-xl" />
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
