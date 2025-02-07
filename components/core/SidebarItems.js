import React from "react";
import Link from "next/link";
import { FaHome, FaUser, FaList, FaImage, FaCog, FaSignOutAlt } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const sidebarItems = [
  { icon: <FaHome className="text-lg" />, label: "Dashboard", path: "/dashboard" , role: ["superadmin", "vendor"]},
  { icon: <FaUser className="text-lg" />, label: "Users", path: "/dashboard/users" , role: ["superadmin"]},
  { icon: <FaImage className="text-lg" />, label: "Events", path: "/dashboard/events", role: ["superadmin", "vendor"] },
  { icon: <FaCog className="text-lg" />, label: "Settings", path: "/dashboard/settings", role: ["superadmin", "vendor"] },
];

const SidebarItems = ({ isOpen, pathName }) => {
  const handleLogout = () => signOut();

  const {data: session} = useSession();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 bg-primary text-white px-4 py-4 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:z-auto w-64`}
    >
      <h2 className="text-xl font-bold mb-4 text-center text-secondary">Event Planner</h2>
      <ul className="space-y-2 mt-24">
        {sidebarItems
          .filter(item => item.role.includes(session?.user?.role))
          .map((item, index) => (
            <li key={index} className="flex justify-center">
              <Link
                href={item.path}
                className={`block w-full transition-all duration-200 py-3 px-4 flex items-center ${
                  pathName === item.path ? "bg-white text-secondary" : "hover:bg-secondary"
                } rounded-l-full rounded-r-full`}
              >
                <span>{item.icon}</span>
                <span className="ml-2">{item.label}</span>
              </Link>
            </li>
          ))}
        {/* Logout Button */}
        <li className="flex justify-center">
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full transition-all duration-200 py-3 px-4 flex items-center hover:bg-red-600 rounded-l-full rounded-r-full"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="ml-2">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarItems;
