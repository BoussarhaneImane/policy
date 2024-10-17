import React from 'react';
import { FaHome, FaUsers, FaFileAlt, FaTruck, FaClipboardList, FaCog, FaUserTie } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-gray-400 py-4 shadow-lg mb-4  font-medium">
      <ul className="flex justify-center space-x-12">
        {/* Home */}
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950">
          <FaHome className="text-2xl" />
          <span className="text-sm mt-1">Home</span>
        </li>

        {/* Effectifs */}
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950">
          <FaUsers className="text-2xl" />
          <span className="text-sm mt-1">Effectifs</span>
        </li>

        {/* Produits */}
        <Link to='/Produits'>
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950">
          <FaFileAlt className="text-2xl" />
          <span className="text-sm mt-1">Produits</span>
        </li>
        </Link>

        {/* Clients */}
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950">
          <FaUserTie className="text-2xl" />
          <span className="text-sm mt-1">Clients</span>
        </li>

        {/* Devis */}
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950">
          <FaFileAlt className="text-2xl" />
          <span className="text-sm mt-1">Devis</span>
        </li>

        {/* Contrats */}
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950">
          <FaClipboardList className="text-2xl" />
          <span className="text-sm mt-1">Contrats</span>
        </li>

        {/* Livraisons */}
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950">
          <FaTruck className="text-2xl" />
          <span className="text-sm mt-1">Livraisons</span>
        </li>

        {/* Tickets */}
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950">
          <FaClipboardList className="text-2xl" />
          <span className="text-sm mt-1">Tickets</span>
        </li>

        {/* Paramétrage */}
        <li className="flex flex-col items-center cursor-pointer hover:text-blue-950 ">
          <FaCog className="text-2xl" />
          <span className="text-sm mt-1">Paramétrage</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
