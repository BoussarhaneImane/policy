import React, { useState } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronDown } from 'react-icons/fa';
import Logo from './loogo.png'; 
import Franceicon from './Franceicon.jpg'; 
import Profileuser from './Profileuser.jpg'; 

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour ouvrir ou fermer le menu déroulant
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left ">
      {/* Image de l'utilisateur, nom et flèche */}
      <div onClick={toggleDropdown} className="flex items-center cursor-pointer space-x-2">
        <img src={Profileuser} alt="Profile User" className="h-10 w-10 rounded-full mr-1" />
          <span className="text-gray-400">Maxine K</span><FaChevronDown className="text-gray-400" />
      </div>

      {/* Menu déroulant à droite de l'utilisateur */}
      {isOpen && (
        <div className="absolute top-0 right-0 mt-12 w-48 bg-white rounded-md shadow-lg z-20">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const FirstNav = () => {
  return (
    <>
      <hr />
      {/* FirstNav */}
      <nav className="flex justify-between items-center bg-white px-6 shadow-sm pt-4 font-medium">
        {/* Logo à gauche */}
        <div className="text-2xl font-bold">
          <img src={Logo} alt="Logo" className="h-16 ml-4" /> 
        </div>

        {/* Icônes à droite */}
        <div className="flex items-center space-x-6">
          {/* Icône du drapeau de la France */}
          <img src={Franceicon} alt="France" className="h-8 w-8" />

          {/* Icône de notification */}
          <div className="relative inline-block">
            {/* Notification Icon */}
            <IoMdNotificationsOutline  className="text-gray-600 text-3xl" title="Notifications" />
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 inline-flex items-center justify-center  w-4 h-4 text-xs font-bold text-white bg-pink-400 rounded-full">
                4
            </span>
        </div>

          {/* User Dropdown */}
          <UserDropdown /> 
        </div>
      </nav>
    </>
  );
};

export default FirstNav;
