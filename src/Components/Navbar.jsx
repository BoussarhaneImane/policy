import React, { useState } from 'react';
import { FaHome, FaUsers, FaFileAlt, FaTruck, FaClipboardList, FaCog, FaUserTie, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './nav.css';

const Navbar = () => {
  const [isProduitsOpen, setIsProduitsOpen] = useState(false);
  const [isAttributsOpen, setIsAttributsOpen] = useState(false);
  const [isClientsOpen, setIsClientsOpen] = useState(false);
  const [isSimulateurOpen, setIsSimulateurOpen] = useState(false);
  const [isEffectifsOpen, setIsEffectifsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let produitsCloseTimeout, attributsCloseTimeout , clientsCloseTimeout , SimulateurCloseTimeout ,EffectifsCloseTimeout;


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle delay for opening/closing the Produits menu
  const handleProduitsMouseEnter = () => {
    clearTimeout(produitsCloseTimeout);
    setIsProduitsOpen(true);
  };

  const handleProduitsMouseLeave = () => {
    produitsCloseTimeout = setTimeout(() => setIsProduitsOpen(false), 300); // 300ms delay before closing
    setIsAttributsOpen(false); // Also close the sub-menu
  };

  // Handle delay for opening/closing the Attributs submenu
  const handleAttributsMouseEnter = () => {
    clearTimeout(attributsCloseTimeout);
    setIsAttributsOpen(true);
  };

  const handleAttributsMouseLeave = () => {
    attributsCloseTimeout = setTimeout(() => setIsAttributsOpen(false), 300);
  };

  const handleClientsMouseEnter = () => {
    clearTimeout(clientsCloseTimeout);
    setIsClientsOpen(true);
  };

  const handleClientsMouseLeave = () => {
    clientsCloseTimeout = setTimeout(() => setIsClientsOpen(false), 300);
  };

  const handleSimulateurMouseEnter = () => {
    clearTimeout(SimulateurCloseTimeout);
    setIsSimulateurOpen(true);
  };

  const handleSimulateurMouseLeave = () => {
    SimulateurCloseTimeout = setTimeout(() =>  setIsSimulateurOpen(false), 300);
  };

  const handleEffectifsMouseEnter = () => {
    clearTimeout(EffectifsCloseTimeout);
    setIsEffectifsOpen(true);
  };

  const handleEffectifsMouseLeave = () => {
    EffectifsCloseTimeout = setTimeout(() =>  setIsEffectifsOpen(false), 300);
  };

  return (
    <nav className="bg-slate-800 py-4 shadow-lg mb-4 font-medium">
       {/* Toggle button for small screens */}
       <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
     
  <ul className={`menu lg:ml-56 ${isMenuOpen ? 'open' : ''}`}>
        {/* Home */}
        <Link to='/home' key="home">
          <li className="flex flex-col items-center cursor-pointer links">
            <FaHome className=" text-blue-950 icon"/>
            <span className="text-sm mt-1 text-blue-950">Home</span>
          </li>
        </Link>

        {/* Effectifs */}
        <div className="relative group" onMouseEnter={handleEffectifsMouseEnter} onMouseLeave={handleEffectifsMouseLeave}>
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links" key="effectifs">
          <FaUsers className=" text-blue-950 icon" />
          <span className="text-sm mt-1 text-blue-950">Effectifs</span>
        </li>
        <ul className={`absolute left-0 mt-4 w-52 bg-white border border-gray-200 shadow-lg transition-opacity duration-400 ease-in-out ${
            isEffectifsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } z-10 `}>
            <li className="px-4 py-2">
              <Link to="/Effectifs/direction" className="hover:text-blue-950 text-slate-500">Directions</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Effectifs/department" className="hover:text-blue-950 text-slate-500">Départements</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Effectifs/fonctions" className="hover:text-blue-950 text-slate-500">Fonctions</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Effectifs/employes" className="hover:text-blue-950 text-slate-500">Employés</Link>
            </li>
            </ul>
</div>
        <div className="relative group" onMouseEnter={handleProduitsMouseEnter} onMouseLeave={handleProduitsMouseLeave}>
          <Link to='/Produits/CategoriesProduits'>
            <li className="flex flex-col items-center cursor-pointer text-gray-300 links" key="produits">
              <FaFileAlt className=" text-blue-950 icon" />
              <span className=" mt-1 text-blue-950">Produits</span>
            </li>
          </Link>

          {/* Menu déroulant Produits */}
          <ul className={`absolute left-0 mt-4 w-52 bg-white border border-gray-200 shadow-lg transition-opacity duration-400 ease-in-out ${
            isProduitsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } z-10`}>
            <li className="px-4 py-2">
              <Link to="/Produits/CategoriesProduits" className="hover:text-blue-950 text-slate-500">Catégories produits</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Produits/ImporterCategories" className="hover:text-blue-950 text-slate-500">Importer Catégories</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Produits/ImporterProduits" className="hover:text-blue-950 text-slate-500">Importer Produits</Link>
            </li>

            {/* Sous-menu Attributs */}
            <li
              className="relative px-4 py-2"
              onMouseEnter={handleAttributsMouseEnter}
              onMouseLeave={handleAttributsMouseLeave}
            >
              <Link to="" className="flex items-center justify-between hover:text-blue-950 text-slate-500 w-full ">
                <span>Attributs</span>
                <FaChevronRight className="ml-2" />
              </Link>
              <ul className={` absolute left-full menu-item top-0 w-52 bg-white border border-gray-200 shadow-lg transition-opacity duration-300 ease-in-out ${
                isAttributsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }z-10 `}>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/Consommables" className="hover:text-blue-950 text-slate-500">Consommables</Link></li>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/Options" className="hover:text-blue-950 text-slate-500">Options</Link></li>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/Kit" className="hover:text-blue-950 text-slate-500">Kit de nettoyage</Link></li>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/Pièces" className="hover:text-blue-950 text-slate-500">Pièces</Link></li>
                <li className="px-4 py-2"><Link to="/Produits/Attributs/ImporterAttributs" className="hover:text-blue-950 text-slate-500">Importer attributs</Link></li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="relative group" onMouseEnter={handleClientsMouseEnter} onMouseLeave={handleClientsMouseLeave}>
          {/* Clients */}
          <li className="flex flex-col items-center cursor-pointer text-gray-300 links" key="clients">
            <FaUserTie className=" text-blue-950 icon" />
            <span className=" mt-1 text-blue-950">Clients</span>
          </li>
          <ul  className={`absolute left-0 mt-4 w-52 bg-white border border-gray-200 shadow-lg transition-opacity duration-400 ease-in-out ${
            isClientsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }z-10`}>
            <li className="px-4 py-2">
              <Link to="/clients/Liste" className="hover:text-blue-950 text-slate-500">Liste Clients</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/clients/Importer" className="hover:text-blue-950 text-slate-500">Importation des clients</Link>
            </li>
          </ul>
        </div>
{/* Simulateur avec Dropdown */}
<div className="relative group" onMouseEnter={handleSimulateurMouseEnter} onMouseLeave={handleSimulateurMouseLeave}>
  <Link to=''>
    <li className="flex flex-col items-center cursor-pointer text-gray-300 links" key="simulateur">
      <FaFileAlt className=" text-blue-950 icon" />
      <span className=" mt-1 text-blue-950">Simulateur</span>
    </li>
  </Link>
  <ul className={`absolute left-0 mt-4 w-52 bg-white border border-gray-200 shadow-lg transition-opacity duration-400 ease-in-out ${
      isSimulateurOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    } z-10`}> {/* Ajout de z-10 ici */}
    <li className="px-4 py-2"><Link to="/simulation" className="hover:text-blue-950 text-slate-500">Simulation</Link></li>
    <li className="px-4 py-2"><Link to="/Devis" className="hover:text-blue-950 text-slate-500">Devis</Link></li>
    <li className="px-4 py-2"><Link to="/attente" className="hover:text-blue-950 text-slate-500">Devis en attente de Validation</Link></li>
  </ul>
</div>


        {/* Other Links */}
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links" key="contrats">
          <FaClipboardList className=" text-blue-950 icon" />
          <span className=" mt-1 text-blue-950">Contrats</span>
        </li>
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links" key="livraisons">
          <FaTruck className=" text-blue-950 icon" />
          <span className=" mt-1 text-blue-950">Livraisons</span>
        </li>
        <li className="flex flex-col items-center cursor-pointer text-gray-300 links" key="parametres">
          <FaCog className=" text-blue-950 icon" />
          <span className=" mt-1 text-blue-950">Paramètres</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

