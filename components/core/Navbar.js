"use client";
import React from "react";
import UserDropdown from "./UserDrowdown";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center px-4 pt-2 pb-4 border-b-[0.7px] border-secondary/20 bg-white z-10">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-medium text-2xl flex justify-center">
          <span className="text-secondary">Event{" "}</span>
          <span className="text-primary">Planner</span>
        </Link>
      </div>
      <UserDropdown />
    </div>
  );
};

export default Navbar;
