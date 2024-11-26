import React, { useState } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronDown, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Logo from './loogoR.png'; 
import Franceicon from './fr.jpg'; 
import Profileuser from './ProfileuserR.png'; 

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let dropdownCloseTimeout;

  const handleMouseEnter = () => {
    clearTimeout(dropdownCloseTimeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownCloseTimeout = setTimeout(() => setIsDropdownOpen(false), 300);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        {/* User Profile Image */}
        <img
          src={Profileuser}
          alt="Profile User"
          className="h-10 w-10 rounded-full mr-1"
        />

        {/* Name and Dropdown Toggle */}
        <div
          className="text-blue-950 flex items-center space-x-1 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Maxine K</span>
          <FaChevronDown className="text-gray-400" />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-20 rounded-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="py-1">
            <li className="px-4 py-2 text-blue-950 hover:bg-gray-50 cursor-pointer flex items-center">
              <FaUser className="mr-2 text-blue-950" /> Profile
            </li>
            <li className="px-4 py-2 text-blue-950 hover:bg-gray-50 cursor-pointer flex items-center">
              <FaCog className="mr-2 text-blue-950" /> Settings
            </li>
            <li className="px-4 py-2 text-blue-950 hover:bg-gray-50 cursor-pointer flex items-center">
              <FaSignOutAlt className="mr-2 text-blue-950" /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
const FirstNav = () => {
  return (
    <div className="bg-gray-100 shadow-lg">
      <hr />
      <nav className="flex justify-between items-center px-4 py-4 font-medium md:flex-row flex-col">
        {/* Logo à gauche */}
        <div className="text-2xl font-bold">
          <img src={Logo} alt="Logo" className="h-12 md:h-16 ml-4" />
        </div>

        {/* Icônes à droite */}
        <div className="flex items-center space-x-4 md:space-x-6 mt-2 md:mt-0">
          {/* Icône du drapeau de la France */}
          <img src={Franceicon} alt="France" className="h-5 w-8 md:inline-block hidden" />

          {/* Icône de notification */}
          <div className="relative inline-block">
            <IoMdNotificationsOutline className="text-gray-600 text-2xl md:text-3xl" title="Notifications" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-pink-400 rounded-full">
              4
            </span>
          </div>

          {/* User Dropdown */}
          <UserDropdown /> 
        </div>
      </nav>
    </div>
  );
};

export default FirstNav;
