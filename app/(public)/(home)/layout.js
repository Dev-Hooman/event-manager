import Navbar from "@/components/core/Navbar";
import React from "react";

const HomeLayout = async ({ children }) => {

  return (
    <div className="w-full flex-1 my-4">
      <Navbar  />
      {children}
    </div>
  );
};

export default HomeLayout;
