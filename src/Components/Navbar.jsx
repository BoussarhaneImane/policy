import React from 'react';
import { FaHome, FaUsers, FaFileAlt, FaTruck, FaClipboardList, FaCog, FaUserTie, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './nav.css';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 py-4 shadow-lg mb-4 font-medium">
      <ul className="flex justify-center space-x-8 ml-10">
        {/* Home */}
        <Link to='/home'>
          <li className="flex flex-col items-center cursor-pointer links">
            <FaHome className="text-xl text-blue-950" />
            <span className="text-sm mt-1 text-blue-950">Home</span>
          </li>
        </Link>

        {/* Effectifs */}
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links">
          <FaUsers className="text-2xl text-blue-950" />
          <span className="text-sm mt-1 text-blue-950">Effectifs</span>
        </li>

        {/* Produits with Dropdown */}
        <div className="relative group">
          <Link to='/Produits/CategoriesProduits'>
            <li className="flex flex-col items-center cursor-pointer text-gray-300 links">
              <FaFileAlt className="text-2xl text-blue-950" />
              <span className="text-sm mt-1 text-blue-950">Produits</span>
            </li>
          </Link>
          <ul className="absolute left-0 mt-4 w-52 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <li className="px-4 py-2">
              <Link to="/Produits/CategoriesProduits" className="hover:text-blue-950 text-slate-500">Catégories produits</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Produits/ImporterCategories" className="hover:text-blue-950 text-slate-500">Importer Catégories</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Produits/ImporterProduits" className="hover:text-blue-950 text-slate-500">Importer Produits</Link>
            </li>
            {/* Second-Level Dropdown for Attributs */}
            <li className="relative group px-4 py-2">
              <Link to="" className="flex items-center justify-between hover:text-blue-950 text-slate-500 w-full">
                <span>Attributs</span>
                <FaChevronRight className="ml-2" />
              </Link>
              <ul className="absolute left-full top-0 w-52 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <li className="px-4 py-2"><Link to="/Produits/Attributs/Consommables" className="hover:text-blue-950 text-slate-500">Consommables</Link></li>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/Options" className="hover:text-blue-950 text-slate-500">Options</Link></li>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/Kit" className="hover:text-blue-950 text-slate-500">Kit de nettoyage</Link></li>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/Pièces" className="hover:text-blue-950 text-slate-500">Pièces</Link></li>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/ImporterAttributs" className="hover:text-blue-950 text-slate-500">Importer attributs</Link></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Clients */}
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links">
          <FaUserTie className="text-2xl text-blue-950" />
          <span className="text-sm mt-1 text-blue-950">Clients</span>
        </li>

        {/* Simulateur with Dropdown */}
        <div className="relative group">
          <Link to=''>
            <li className="flex flex-col items-center cursor-pointer text-gray-300 links">
              <FaFileAlt className="text-2xl text-blue-950" />
              <span className="text-sm mt-1 text-blue-950">Simulateur</span>
            </li>
          </Link>
          <ul className="absolute left-0 mt-4 w-60 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <li className="px-4 py-2"><Link to="/simulation" className="hover:text-blue-950 text-slate-500">Simulation</Link></li>
            <li className="px-4 py-2"><Link to="/Devis" className="hover:text-blue-950 text-slate-500">Devis</Link></li>
            <li className="px-4 py-2"><Link to="/attente" className="hover:text-blue-950 text-slate-500">Devis en attente de Validation</Link></li>
          </ul>
        </div>

        {/* Other Links */}
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links"><FaClipboardList className="text-2xl text-blue-950" /><span className="text-sm mt-1 text-blue-950">Contrats</span></li>
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links"><FaTruck className="text-2xl text-blue-950" /><span className="text-sm mt-1 text-blue-950">Livraisons</span></li>
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links"><FaClipboardList className="text-2xl text-blue-950" /><span className="text-sm mt-1 text-blue-950">Tickets</span></li>
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links"><FaCog className="text-2xl text-blue-950" /><span className="text-sm mt-1 text-blue-950">Paramétrage</span></li>
      </ul>
    </nav>
  );
};

export default Navbar;
