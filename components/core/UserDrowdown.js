import React, { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { FaChevronDown } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";

const UserDropdown = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    signOut();
  };

  return (
    <div>
      <div
        className="bg-secondary bg-opacity-20 px-4 py-2 rounded-full flex min-w-[200px] gap-3 justify-between items-center cursor-pointer hover:shadow-md transition-shadow duration-300"
        onClick={handleMenuOpen}
      >
        <Image
          className="rounded-full h-[40px] w-[40px] object-cover bg-white"
          width={500}
          height={500}
          alt="profile"
          src={session?.user?.photoUrl || "/images/default.png"}
        />
        <div className="flex flex-col text-left">
          <label className="text-sm font-semibold">{session?.user?.name}</label>
          <p className="text-xs text-gray-600">{session?.user?.role}</p>
        </div>
        <FaChevronDown size={16} color="#DF1F5A" />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            minWidth: "200px",
            padding: "10px",
            borderRadius: "8px",
          },
        }}
      >
        <MenuItem
          onClick={handleLogout}
          style={{
            fontWeight: "500",
            fontSize: "14px",
            padding: "10px 10px",
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserDropdown;
