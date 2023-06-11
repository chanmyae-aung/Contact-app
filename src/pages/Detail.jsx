import React from "react";
import { useGetSingleContactQuery } from "../redux/contactApi";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import { BiCake, BiEnvelope, BiImageAdd, BiPhone, BiUser } from "react-icons/bi";

const Detail = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data } = useGetSingleContactQuery({ id, token });
  console.log(data);
  const nav = useNavigate()
  return (
    <div className="w-full">
      <div className="flex items-center">
        <Link to={'/'}>
        <RxArrowLeft
          className="absolute text-xl top-16 ml-8 mt-5 cursor-pointer"
        />
        </Link>
        <button className="w-36 h-36 my-10 mx-20 rounded-full bg-blue-200 flex items-center justify-center text-3xl">
          <BiImageAdd />
        </button>
        <h2 className="text-xl font-bold">{data?.contact.name}</h2>
      </div>
      <button onClick={() => nav(-1)} className="text-white absolute top-56 right-56 bg-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-6 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Edit
      </button>
      <hr />
      <div className="flex items-center gap-10 mt-10">
        <div className="w-96 border rounded-lg p-4 flex flex-col gap-2">
            <h4 className="text-lg font-semibold">Contact details</h4>
            <div className="flex gap-3 text-blue-500 items-center cursor-pointer">
                <BiEnvelope className="text-gray-500 text-lg"/>
                <p>{data?.contact.email}</p>
            </div>
            <div className="flex gap-3 text-blue-500 items-center cursor-pointer">
                <BiPhone className="text-gray-500 text-lg"/>
                <p>{data?.contact.phone}</p>
            </div>
            <div className="flex gap-3 text-blue-500 items-center cursor-pointer">
                <BiCake className="text-gray-500 text-lg"/>
                <p>Add birthday</p>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold">History</h4>
            <p>Last eidted:</p>
            <p>Added to contacts:</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
