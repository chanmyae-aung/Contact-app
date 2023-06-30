import React from "react";
import { BiSolidPrinter } from "react-icons/bi";

export default function MoreAction() {
  return (
    <div className="flex flex-col">
      <button className="flex gap-3 items-center justify-center">
        <BiSolidPrinter />
        Print
      </button>
    </div>
  );
}
