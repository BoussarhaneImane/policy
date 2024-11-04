import React, { useState } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronDown, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Logo from './loogoR.png'; 
import Franceicon from './fr.jpg'; 
import Profileuser from './ProfileuserR.png'; 

const UserDropdown = () => {
 

  return (
    <div className="relative inline-block text-left">
    {/* User image, name, and arrow */}
    <div className="flex items-center space-x-2">
      <img src={Profileuser} alt="Profile User" className="h-10 w-10 rounded-full mr-1" />
      {/* Add hover effect on the span */}
      <span className="text-gray-400 relative cursor-pointer group">
        Maxine K
        <FaChevronDown className="text-gray-400 inline" />
      
        {/* Dropdown menu, visible only when hovering over the span */}
        <div className="absolute top-0 right-0 mt-8 w-48 bg-white  shadow-lg z-20 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out">
          <ul className="py-1">
            <li className="px-4 py-2 hover:text-blue-950 hover:bg-gray-50 cursor-pointer flex items-center">
              <FaUser className="mr-2 text-gray-500 " /> Profile
            </li>
            <li className="px-4 py-2 hover:text-blue-950 hover:bg-gray-50 cursor-pointer flex items-center">
              <FaCog className="mr-2 text-gray-500" /> Settings
            </li>
            <li className="px-4 py-2 hover:text-blue-950 hover:bg-gray-50 cursor-pointer flex items-center">
              <FaSignOutAlt className="mr-2 text-gray-500" /> Logout
            </li>
          </ul>
        </div>
      </span>
    </div>
  </div>
  
  );
};

const FirstNav = () => {
  return (
    <div className=''>
      <hr />
      {/* FirstNav */}
      <nav className="flex justify-between items-center px-6 pt-4 font-medium bg-gray-100 shadow-lg ">
        {/* Logo à gauche */}
        <div className="text-2xl font-bold">
          <img src={Logo} alt="Logo" className="h-16 ml-4" /> 
        </div>

        {/* Icônes à droite */}
        <div className="flex items-center space-x-6">
          {/* Icône du drapeau de la France */}
          <img src={Franceicon} alt="France" className="h-5 w-8" />

          {/* Icône de notification */}
          <div className="relative inline-block">
            <IoMdNotificationsOutline className="text-gray-600 text-3xl" title="Notifications" />
            {/* Notification Badge */}
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
