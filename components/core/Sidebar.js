"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { FaBars, FaTimes } from "react-icons/fa";
import SidebarItems from "./SidebarItems";
import UserDropdown from "./UserDrowdown";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const getFormattedSection = (url) => {
    const section = url.split("/").pop();
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <div className="flex">
      <SidebarItems isOpen={isOpen} pathName={pathName} />
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="w-full flex-1 my-4">
        <div className="flex justify-between items-center mx-2 pb-4 border-b-[0.7px] border-secondary/20">

          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-800 bg-white p-2 rounded lg:hidden"
            >
              {isOpen ? <FaTimes color="#DF1F5A" /> : <FaBars color="#DF1F5A" />}
            </button>
            <label className="text-xl font-bold">
              {getFormattedSection(pathName)}
            </label>
          </div>
          <UserDropdown />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
