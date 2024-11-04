import React, { useState ,useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import './simulation.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCalendar } from 'react-icons/fa';
import Claculer from './Claculer';
function Simulation() {
  const [showSousCategorie1, setShowSousCategorie1] = useState(false);
  const [showSousCategorie2, setShowSousCategorie2] = useState(false);
  const [showSousCategorie3, setShowSousCategorie3] = useState(false);
  const [showProduits, setShowProduits] = useState(false);
  const [showEquipementTable, setShowEquipementTable] = useState(false);
  const [showOptionsTable, setShowOptionsTable] = useState(false);
  const [showConsomableTable, setShowConsomableTable] = useState(false);
  const [showKitable, setShowKitTable] = useState(false);
  const [showParametreTable, setshowParametreTable] = useState(false);
  const [showParametreTable2, setshowParametreTable2] = useState(false);
  const [showParametreTable3, setshowParametreTable3] = useState(false);
  const [showCalculerTable, setshowCalculerTable] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option3');
  const [showHello, setShowHello] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleCategoryChange = (e) => {
    if (e.target.value !== "") {
      setShowSousCategorie1(true);
    } else {
      setShowSousCategorie1(false);
      setShowSousCategorie2(false);
      setShowSousCategorie3(false);
      setShowProduits(false);
    }
  };

  const handleSousCategorie1Change = (e) => {
    if (e.target.value !== "") {
      setShowSousCategorie2(true);
    } else {
      setShowSousCategorie2(false);
      setShowSousCategorie3(false);
      setShowProduits(false);
    }
  };

  const handleSousCategorie2Change = (e) => {
    if (e.target.value !== "") {
      setShowSousCategorie3(true);
    } else {
      setShowSousCategorie3(false);
      setShowProduits(false);
    }
  };

  const handleSousCategorie3Change = (e) => {
    if (e.target.value !== "") {
      setShowProduits(true);
    } else {
      setShowProduits(false);
    }
  };

  const handleEquipementClick = () => {
    setShowEquipementTable(!showEquipementTable);
  };
  const handleOptionsClick = () => {
    setShowOptionsTable(!showOptionsTable);
    setShowEquipementTable(false);
  };
  const handleConsomableClick = () => {
    setShowConsomableTable(!showConsomableTable);
    setShowOptionsTable(false)
    setShowEquipementTable(false);
  };

  const handleKitClick = () => {
    setShowKitTable(!showKitable);
    setShowConsomableTable(false)
    setShowOptionsTable(false)
    setShowEquipementTable(false);
    setshowParametreTable(false)
    setshowParametreTable2(false)
    setshowParametreTable3(false)
  };

  const handleParametreClick = () => {
    setshowParametreTable(!showParametreTable)
    setshowParametreTable2(false)
    setshowParametreTable3(false)
    setShowKitTable(false)
    setShowConsomableTable(false)
    setShowOptionsTable(false)
    setShowEquipementTable(false);
  };
  const handleParametreClick2 = () => {
    setshowParametreTable2(!showParametreTable2)
    setshowParametreTable(false)
    setshowParametreTable3(false)
    setShowKitTable(false)
    setShowConsomableTable(false)
    setShowOptionsTable(false)
    setShowEquipementTable(false);
  };
  const handleParametreClick3 = () => {
    setshowParametreTable3(!showParametreTable3)
    setshowParametreTable(false)
    setshowParametreTable2(false)
    setShowKitTable(false)
    setShowConsomableTable(false)
    setShowOptionsTable(false)
    setShowEquipementTable(false);
  };

  const handleCalulerClick = () => {
    // Réinitialise les états des tables avant d'appliquer les changements
    setshowCalculerTable(false);
    setShowHello(false);
    setshowParametreTable3(false);
    setshowParametreTable(false);
    setshowParametreTable2(false);
    setShowKitTable(false);
    setShowConsomableTable(false);
    setShowOptionsTable(false);
    setShowEquipementTable(false);

    // Affiche les composants en fonction de l'option sélectionnée
    if (selectedOption === 'option1' ) {
      setshowCalculerTable(!showCalculerTable)
        setshowCalculerTable(true);
    } else if (selectedOption === 'option2'|| selectedOption === 'option3') {
        setShowHello(true);
    }
};

  useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation en millisecondes (par exemple, 1000ms = 1s)
      easing: 'ease-in-out', // Type de transition d'animation
      once: true, // Si true, l'animation ne se déclenche qu'une seule fois
    });
  }, []); 
  return (
   
    <div className="bg-gray-100 p-8  max-w-full mx-auto mt-10 shadow-lg rounded-xl ">
      <p className="text-left text-blue-950 text-2xl mb-10 font-medium">Simulation</p>
  {/* Grid container for select elements */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
        
        {/* Category selection */}
        <div className="flex-1">
          <label htmlFor="categories" className="block text-lg font-medium text-blue-950">Catégories</label>
          <select
            id="categories"
            className="mt-2 block w-full p-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950 transition ease-in-out duration-300 rounded-xl"
            onChange={handleCategoryChange}
          >
            <option value="">Choisir une catégorie</option>
            <option value="A4" className="text-gray-500 text-xs font-medium">A4</option>
            <option value="A3" className="text-gray-500 text-xs font-medium">A3</option>
          </select>
        </div>

        {/* SousCategorie1 selection */}
        {showSousCategorie1 && (
          <div className="flex-1">
            <label htmlFor="sousCategorie1" className="block text-lg font-medium text-blue-950">Sous Catégories 1</label>
            <select
              id="sousCategorie1"
              className="mt-2 block w-full p-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950 transition ease-in-out duration-300 rounded-xl"
              onChange={handleSousCategorie1Change}
            >
              <option value="">Choisir sous catégorie 1</option>
              <option value="COLOR" className="text-gray-500 text-xs font-medium">COLOR</option>
              <option value="MONO" className="text-gray-500 text-xs font-medium">MONO</option>
            </select>
          </div>
        )}

        {/* SousCategorie2 selection */}
        {showSousCategorie2 && (
          <div className="flex-1">
            <label htmlFor="sousCategorie2" className="block text-lg font-medium text-blue-950">Sous Catégories 2</label>
            <select
              id="sousCategorie2"
              className="mt-2 block w-full p-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950 transition ease-in-out duration-300 rounded-xl"
              onChange={handleSousCategorie2Change}
            >
              <option value="">Choisir sous catégorie 2</option>
              <option value="MFP" className="text-gray-500 text-xs font-medium">MFP</option>
              <option value="PRINTER" className="text-gray-500 text-xs font-medium">PRINTER</option>
            </select>
          </div>
        )}

        {/* SousCategorie3 selection */}
        {showSousCategorie3 && (
          <div className="flex-1">
            <label htmlFor="sousCategorie3" className="block text-lg font-medium text-blue-950">Sous Catégories 3</label>
            <select
              id="sousCategorie3"
              className="mt-2 block w-full p-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950 transition ease-in-out duration-300 rounded-xl"
              onChange={handleSousCategorie3Change}
            >
              <option value="">Choisir sous catégorie 3</option>
              <option value="APM" className="text-gray-500 text-xs font-medium">A4 Printer Mono</option>
            </select>
          </div>
        )}

        {/* Produits selection */}
        {showProduits && (
          <div className="flex-1">
            <label htmlFor="produits" className="block text-lg font-medium text-blue-950">Produits</label>
            <select
              id="produits"
              className="mt-2 block w-full p-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950 transition ease-in-out duration-300 rounded-xl"
            >
              <option value="">Choisir un produit</option>
            {/* Options */}
            <option value="Produits" className='text-gray-500 text-xs font-medium'>Produits</option>
            <option value="Produits" className='text-gray-500 text-xs font-medium'>Je ne sais pas !</option>
            <option value="PA2000w" className='text-gray-500 text-xs font-medium'>PA2000w</option>
            <option value="PA2000" className='text-gray-500 text-xs font-medium'>PA2000</option>
            <option value="ECOSYS PA4000x" className='text-gray-500 text-xs font-medium'>ECOSYS PA4000x</option>
            <option value="ECOSYS PA4000wx 5GHZ" className='text-gray-500 text-xs font-medium'>ECOSYS PA4000wx 5GHZ</option>
            <option value="FS-1040 (Non EU)" className='text-gray-500 text-xs font-medium'>FS-1040 (Non EU)</option>
            <option value="FS-1060DN (hors UE)" className='text-gray-500 text-xs font-medium'>FS-1060DN (hors UE)</option>
            <option value="ECOSYS PA6000x" className='text-gray-500 text-xs font-medium'>ECOSYS PA6000x</option>
            <option value="ECOSYS PA5500x" className='text-gray-500 text-xs font-medium'>ECOSYS PA5500x</option>
            <option value="ECOSYS PA5000x" className='text-gray-500 text-xs font-medium'>ECOSYS PA5000x</option>
            <option value="ECOSYS PA4500x " className='text-gray-500 text-xs font-medium'>ECOSYS PA4500x</option>
            </select>
          </div>
        )}
      </div>


      {/* Conditionally render buttons only when all selects are displayed */}
      {showSousCategorie1 && showSousCategorie2 && showSousCategorie3 && showProduits && (
        <div className="flex gap-2 mt-16">
          <button id="link" onClick={handleEquipementClick} className="bg-slate-800 text-white font-medium py-3 px-6 transition rounded-xl hover:bg-slate-700">Équipements</button>
          <button id="link"  onClick={handleOptionsClick} className="bg-slate-800 text-white font-medium py-3 px-6 transition rounded-xl hover:bg-slate-700">Options</button>
          <button id="link"  onClick={handleConsomableClick}  className="bg-slate-800 text-white font-medium py-3 px-6 transition rounded-xl hover:bg-slate-700">Consommables</button>
          <button id="link"onClick={handleKitClick}  className="bg-slate-800 text-white font-medium py-3 px-6 transition rounded-xl hover:bg-slate-700">Kits de nettoyage</button>
          <button id="link"  onClick={handleParametreClick}  className=" text-blue-950 font-medium py-3 px-6 transition rounded-xl bg-amber-50 hover:bg-gray-100">Paramètres de simulation</button>
          <button id="link" onClick={handleCalulerClick} className="bg-amber-50 text-blue-950 font-medium py-3 px-6 transition rounded-xl hover:bg-gray-100">Calculer</button>
        </div>
      )}
{!showOptionsTable && (
  <>
      {showEquipementTable && (
        <div className="mt-6">
          <table  data-aos="fade-down" className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-slate-800 text-gray-400  mb-2">
                <th className="p-3 border font-medium">Référence</th>
                <th className="p-3 border font-medium">Désignation</th>
                <th className="p-3 border font-medium">Quantité</th>
                <th className="p-3 border font-medium">Prix d'achat</th>
                <th className="p-3 border font-medium">Taux d'échange</th>
                <th className="p-3 border font-medium">Coût de revient</th>
                <th className="p-3 border font-medium">Frais d'approche</th>
                <th className="p-3 border font-medium">Prix de revient</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
              <td className="p-2 border w-40">
  <button className="w-full p-2 bg-gray-100 shadow rounded text-blue-950 font-medium hover:bg-gray-200 transition text-sm">
    Référence
  </button>
</td>
<td className="p-2 border w-40">
  <button className="w-full p-2 bg-gray-100 shadow rounded text-blue-950 font-medium hover:bg-gray-200 transition text-sm">
    Désignation
  </button>
</td>

                <td className="p-2 border w-40">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Quantité" />
                </td>
                <td className="p-2 border w-40">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Prix d'achat" />
                </td>
                <td className="p-2 border w-48">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Taux d'échange" />
                </td>
                <td className="p-2 border w-40">
  <button className="w-full p-2 bg-gray-100 shadow rounded text-blue-950 font-medium hover:bg-gray-200 transition text-sm">
  Coût de revient
  </button>
</td>
              
                <td className="p-2 border w-48">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Frais d'approche" />
                </td>
                <td className="p-2 border w-48">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Prix de revient" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      </>)}
       {!showEquipementTable && (
        <>
      {showOptionsTable && (
        <div className="mt-6">
         <table data-aos="fade-up" className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-slate-800 text-gray-400 text-sm">
              <th className="p-3 border font-medium"></th>
                <th className="p-3 border font-medium">Référence</th>
                <th className="p-3 border font-medium">Désignation</th>
                <th className="p-3 border font-medium">Quantité</th>
                <th className="p-3 border font-medium">Prix d'achat</th>
                <th className="p-3 border font-medium">Taux d'échange</th>
                <th className="p-3 border font-medium">Coût de revient</th>
                <th className="p-3 border font-medium">Frais d'approche</th>
                <th className="p-3 border font-medium">Prix de revient</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
              <td className="p-2 border w-20 text-center">
              <input
    type="checkbox"
    id="checkbox-reference"
    className="form-checkbox h-5 w-5  text-blue-950"
  />
</td>
              <td className="p-2 border w-40">
  <button className="w-full p-2 bg-gray-100 shadow rounded text-blue-950 font-medium hover:bg-gray-200 transition text-sm">
    Référence
  </button>
</td>
<td className="p-2 border w-40">
  <button className="w-full p-2 bg-gray-100 shadow rounded text-blue-950 font-medium hover:bg-gray-200 transition text-sm">
    Désignation
  </button>
</td>

                <td className="p-2 border w-40">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Quantité" />
                </td>
                <td className="p-2 border w-40">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Prix d'achat" />
                </td>
                <td className="p-2 border w-52">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Taux d'échange" />
                </td>
                <td className="p-2 border w-48">
  <button className="w-full p-2 bg-gray-100 shadow rounded text-blue-950 font-medium hover:bg-gray-200 transition text-sm">
  Coût de revient
  </button>
</td>
              
                <td className="p-2 border w-52">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Frais d'approche" />
                </td>
                <td className="p-2 border w-48">
                  <input type="number" className="w-full p-2 border rounded placeholder:text-blue-950 text-sm " placeholder="Prix de revient" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      </>)}

      {!showEquipementTable && (
        <>
      {!showOptionsTable && (
        <>
      {showConsomableTable && (
           
        <div className="mt-6">
       <table data-aos="fade-up" className="w-full table-auto border-collapse">
  <thead>
    <tr className="bg-slate-800 text-gray-400 text-sm">
      <th className="p-3 border font-medium whitespace-nowrap">Référence</th>
      <th className="p-3 border font-medium whitespace-nowrap">Désignation</th>
      <th className="p-3 border font-medium whitespace-nowrap">Quantité</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix d'achat</th>
      <th className="p-3 border font-medium whitespace-nowrap">Taux d'échange</th>
      <th className="p-3 border font-medium whitespace-nowrap">Coût de revient</th>
      <th className="p-3 border font-medium whitespace-nowrap">Frais d'approche</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix de revient</th>
      <th className="p-3 border font-medium whitespace-nowrap">Durée de vie</th>
      <th className="p-3 border font-medium whitespace-nowrap">Coût par page</th>
      <th className="p-3 border font-medium whitespace-nowrap">Mono</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-white">
      <td className="p-2 border w-28">
        <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
          Référence
        </span>
      </td>
      <td className="p-2 border w-28">
        <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
          Désignation
        </span>
      </td>
      <td className="p-2 border">
        <input
          type="number"
          className="w-full max-w-xs p-2 border rounded placeholder:text-blue-950 text-xs"
          placeholder="Quantité"
        />
      </td>
      <td className="p-2 border">
        <input
          type="number"
          className="w-full max-w-xs p-2 border rounded placeholder:text-blue-950 text-xs"
          placeholder="Prix d'achat"
        />
      </td>
      <td className="p-2 border">
        <input
          type="number"
          className="w-full max-w-xs p-2 border rounded placeholder:text-blue-950 text-xs"
          placeholder="Taux d'échange"
        />
      </td>
      <td className="p-2 border">
        <button className="w-full max-w-xs p-2 bg-gray-100 shadow rounded text-blue-950 font-medium hover:bg-gray-200 transition text-xs">
         0.00
        </button>
      </td>
      <td className="p-2 border">
        <input
          type="number"
          className="w-full max-w-xs p-2 border rounded placeholder:text-blue-950 text-xs"
          placeholder="Frais d'approche"
        />
      </td>
      <td className="p-2 border">
        <input
          type="number"
          className="w-full max-w-xs p-2 border rounded placeholder:text-blue-950 text-xs"
          placeholder="Prix de revient"
        />
      </td>
      <td className="p-2 border">
        <input
          type="number"
          className="w-full max-w-xs p-2 border rounded placeholder:text-blue-950 text-xs"
          placeholder="Durée de vie"
        />
      </td>
      <td className="p-2 border">
        <input
          type="number"
          className="w-full max-w-xs p-2 border rounded placeholder:text-blue-950 text-xs"
          placeholder="Coût par page"
        />
      </td>
      <td className="p-2 border w-20 text-center">
        <input
          type="checkbox"
          id="checkbox-reference"
          className="form-checkbox h-5 w-5 text-blue-950"
        />
      </td>
    </tr>
  </tbody>
</table>



        </div>

      )}
   </>)}
   </>)}

   {!showEquipementTable && (
        <>
      {!showOptionsTable && (
        <>
      {!showConsomableTable && (
        <>
        {!showParametreTable && (
           <>
        {!showParametreTable2 && (
            <>
        {!showParametreTable3 &&(
        <>
        {showKitable && (
           
        <div className="mt-6">
       <table data-aos="fade-up" className="w-full table-auto border-collapse">
  <thead>
    <tr className="bg-slate-800 text-gray-400 text-sm">
      <th className="p-3 border font-medium whitespace-nowrap">Référence</th>
      <th className="p-3 border font-medium whitespace-nowrap">Désignation</th>
      <th className="p-3 border font-medium whitespace-nowrap">Quantité</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix d'achat</th>
      <th className="p-3 border font-medium whitespace-nowrap">Taux d'échange</th>
      <th className="p-3 border font-medium whitespace-nowrap">Coût de revient</th>
      <th className="p-3 border font-medium whitespace-nowrap">Frais d'approche</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix de revient</th>
      <th className="p-3 border font-medium whitespace-nowrap">Durée de vie</th>
      <th className="p-3 border font-medium whitespace-nowrap">Coût par page</th>
      <th className="p-3 border font-medium whitespace-nowrap">Monochrome</th>
    </tr>
  </thead>
  <tbody>
    
  </tbody>
</table>



        </div>

      )}
   </>)}
   </>)}
   </>)}
</>)}
</>)}
</>)}

   {!showEquipementTable && (
        <>
      {!showOptionsTable && (
        <>
      {!showConsomableTable && (
        <>
        {!showKitable && (
           <>
            {showParametreTable && (
        <div className="mt-6">
 <form className="space-y-6">
  {/* Radio Buttons Section */}
                        <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick3}
                          />
                          <span className="text-blue-950 cursor-pointer">Vente</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick2}
                          />
                          <span className="text-blue-950 cursor-pointer">Location longue durée</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option3"
                            checked={selectedOption === 'option3'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick}
                          />
                          <span className="text-blue-950 cursor-pointer">Location courte durée</span>
                        </label>
                      </div>
<br></br>
  {/* Inputs Section */}
  <div className="flex items-center space-x-4 ">
    {/* Durée de location */}
    <div className="flex flex-col w-1/4">
    <label className="text-blue-950 font-medium text-sm mb-2">Durée de location</label>
    <select className="w-full p-2 border rounded-xl text-blue-950 placeholder-gray-400">
      <option value="">Sélectionnez la durée</option>
      <option value="1">1 semaine</option>
      <option value="2">2 semaines</option>
      <option value="3">3 semaines</option>
      <option value="4">4 semaines</option>
      <option value="5">5 semaines</option>
      <option value="6">6 semaines</option>
    </select>
  </div>

    {/* Taux d'intérêt */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm mb-2">Taux d'intérêt</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          defaultValue="7.0"
          className="w-full p-2 border  text-blue-950 rounded-xl"
        />
        <span>%</span>
      </div>
    </div>

    {/* Provision M.O par équipement */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm  mb-2">Provision M.O par équipement</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          defaultValue="10"
          className="w-full p-2 border  text-blue-950 rounded-xl"
        />
        <span>%</span>
      </div>
    </div>

    {/* Provision pièces par équipement */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm  mb-2">Provision pièces par équipement</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          defaultValue="20"
          className="w-full p-2 border text-blue-950 rounded-xl"
        />
        <span>%</span>
      </div>
    </div>

    {/* Volume mensuel total */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm   mb-2">Volume mensuel total</label>
      <input
        type="number"
        placeholder="5000"
        className="w-full p-2 border rounded-xl text-blue-950"
      />
    </div>

    {/* Volume mensuel monochrome */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm   mb-2">Volume mensuel monochrome</label>
      <input
        type="number"
        placeholder="Volume mensuel monochrome"
        className="w-full p-2 border rounded-xl text-blue-950 placeholder:text-sm"
      />
    </div>
  </div>
  <br></br>
  <div className="flex space-x-6">
  {/* Volume mensuel couleur */}
  <div className="flex flex-col items-start">
    <label className="text-blue-950 font-medium text-sm mb-2">Volume mensuel couleur</label>
    <button className="w-40 p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">
      0
    </button>
  </div>

  {/* Coefficient couleur */}
  <div className="flex flex-col items-start">
    <label className="text-blue-950 font-medium text-sm mb-2">Coefficient couleur</label>
    <button className="w-40 p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">
      0
    </button>
  </div>
</div>


</form>



</div>
     
  )}
   </>)}
   </>)}
</>)}
</>)}


{!showEquipementTable && (
        <>
      {!showOptionsTable && (
        <>
      {!showConsomableTable && (
        <>
        {!showKitable && (

           <>
           {!showParametreTable && (
            <>
           
            {showParametreTable2 && (
        <div className="mt-6">
 <form className="space-y-6">
  {/* Radio Buttons Section */}
  <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick3}
                          />
                          <span className="text-blue-950 cursor-pointer">Vente</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick2}
                          />
                          <span className="text-blue-950 cursor-pointer">Location longue durée</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option3"
                            checked={selectedOption === 'option3'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick}
                          />
                          <span className="text-blue-950 cursor-pointer">Location courte durée</span>
                        </label>
                      </div>
<br></br>
  {/* Inputs Section */}
  <div className="flex items-center space-x-4 ">
    {/* Durée de location */}
    <div className="flex flex-col w-1/4">
  <label className="text-blue-950 font-medium text-sm mb-2">Durée de location (en mois)</label>
  <div className="flex items-center border rounded-xl border-none">
    <input
      type="number"
      defaultValue="48"
      className="w-full p-2 text-blue-950 rounded-xl border"
    />
    <FaCalendar className="ml-2 m-2 text-blue-950 h-5 w-5 cursor-pointer" />
  </div>
</div>

    {/* Taux d'intérêt */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm mb-2">Taux d'intérêt</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          defaultValue="7.0"
          className="w-full p-2 border  text-blue-950 rounded-xl"
        />
        <span>%</span>
      </div>
    </div>

    {/* Provision M.O par équipement */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm  mb-2">Provision M.O par équipement</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          defaultValue="10"
          className="w-full p-2 border  text-blue-950 rounded-xl"
        />
        <span>%</span>
      </div>
    </div>

    {/* Provision pièces par équipement */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm  mb-2">Provision pièces par équipement</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          defaultValue="20"
          className="w-full p-2 border text-blue-950 rounded-xl"
        />
        <span>%</span>
      </div>
    </div>

    {/* Volume mensuel total */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm   mb-2">Volume mensuel total</label>
      <input
        type="number"
        placeholder="5000"
        className="w-full p-2 border rounded-xl text-blue-950"
      />
    </div>

    {/* Volume mensuel monochrome */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm   mb-2">Volume mensuel monochrome</label>
      <input
        type="number"
        placeholder="Volume mensuel monochrome"
        className="w-full p-2 border rounded-xl text-blue-950 placeholder:text-sm"
      />
    </div>
  </div>
  <br></br>
  <div className="flex space-x-6">
  {/* Volume mensuel couleur */}
  <div className="flex flex-col items-start">
    <label className="text-blue-950 font-medium text-sm mb-2">Volume mensuel couleur</label>
    <button className="w-40 p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">
      0
    </button>
  </div>

  {/* Coefficient couleur */}
  <div className="flex flex-col items-start">
    <label className="text-blue-950 font-medium text-sm mb-2">Coefficient couleur</label>
    <button className="w-40 p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">
      0
    </button>
  </div>
</div>


</form>



</div>
     
  )}
   </>)}
   </>)}
</>)}
</>)}
</>)}


{!showEquipementTable && (
        <>
      {!showOptionsTable && (
        <>
      {!showConsomableTable && (
        <>
        {!showKitable && (
           <>
            {!showParametreTable && (
            <>
           {!showParametreTable2 && (
            <>
            {!showParametreTable3 && (
              <>
              {!showCalculerTable && (
                <>


{showHello && <h2 className="mt-4 text-blue-950 text-2xl font-medium"><Claculer/></h2>}

</>

)}
</>)}
</>)}
</>)}
</>)}

</>)}
</>)}
</>)}

{!showEquipementTable && (
        <>
      {!showOptionsTable && (
        <>
      {!showConsomableTable && (
        <>
        {!showKitable && (
           <>
            {!showParametreTable && (
            <>
           {!showParametreTable2 && (
            <>
            {showParametreTable3 && (
        <div className="mt-6">
 <form className="space-y-6">
  {/* Radio Buttons Section */}
  <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick3}
                          />
                          <span className="text-blue-950 cursor-pointer">Vente</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick2}
                          />
                          <span className="text-blue-950 cursor-pointer">Location longue durée</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="option3"
                            checked={selectedOption === 'option3'}
                            onChange={handleOptionChange}
                            className="form-radio text-blue-950 cursor-pointer"
                            onClick={handleParametreClick}
                          />
                          <span className="text-blue-950 cursor-pointer">Location courte durée</span>
                        </label>
                      </div>
<br></br>
  {/* Inputs Section */}
  <div className="flex items-center space-x-4 ">
  
    {/* Provision M.O par équipement */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm  mb-2">Provision M.O par équipement</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          defaultValue="10"
          className="w-full p-2 border  text-blue-950 rounded-xl"
        />
        <span>%</span>
      </div>
    </div>

    {/* Provision pièces par équipement */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm  mb-2">Provision pièces par équipement</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          defaultValue="20"
          className="w-full p-2 border text-blue-950 rounded-xl"
        />
        <span>%</span>
      </div>
    </div>

    {/* Volume mensuel total */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm   mb-2">Volume mensuel total</label>
      <input
        type="number"
        placeholder="5000"
        className="w-full p-2 border rounded-xl text-blue-950"
      />
    </div>

    {/* Volume mensuel monochrome */}
    <div className="flex flex-col w-1/4">
      <label className="text-blue-950 font-medium text-sm   mb-2">Volume mensuel monochrome</label>
      <input
        type="number"
        placeholder="Volume mensuel monochrome"
        className="w-full p-2 border rounded-xl text-blue-950 placeholder:text-sm"
      />
    </div>
  </div>
  <br></br>
  <div className="flex space-x-6">
  {/* Volume mensuel couleur */}
  <div className="flex flex-col items-start">
    <label className="text-blue-950 font-medium text-sm mb-2">Volume mensuel couleur</label>
    <button className="w-40 p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">
      0
    </button>
  </div>

  {/* Coefficient couleur */}
  <div className="flex flex-col items-start">
    <label className="text-blue-950 font-medium text-sm mb-2">Coefficient couleur</label>
    <button className="w-40 p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">
      0
    </button>
  </div>
</div>


</form>


</div>
  )}
   </>)}
   </>)}
</>)}
</>)}

</>)}
</>)}



{!showEquipementTable && (
        <>
      {!showOptionsTable && (
        <>
      {!showConsomableTable && (
        <>
        {!showKitable && (
           <>
            {!showParametreTable && (
            <>
           {!showParametreTable2 && (
            <>
            {!showParametreTable3 && (
              <>
               {!showHello && (
              <>
              {showCalculerTable && (

<div>

<div className="flex-1">
  <p className="text-left text-blue-950 text-2xl mt-10 mb-6 font-medium">Service</p>
  {/* Grid container for select elements */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
    
    <div>
      <label className="block text-sm mb-2 font-medium text-blue-950">Total provision main d'œuvre</label>
      <button className="w-full p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">10.00</button>
    </div>

    <div>
      <label className="block text-sm mb-2 font-medium text-blue-950">Total provision pièces</label>
      <button className="w-full p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">10.00</button>
    </div>

    <div>
      <label className="block text-sm mb-2 font-medium text-blue-950">Total provision service</label>
      <button className="w-full p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">20.00</button>
    </div>

    <div>
      <label className="block text-sm mb-2 font-medium text-blue-950">Coût annuel</label>
      <button className="w-full p-2 shadow rounded text-blue-950 font-medium bg-gray-200 transition text-sm">6.67</button>
    </div>

    <div>
      <label className="block text-sm mb-2 font-medium text-blue-950">Prix de vente</label>
      <input
        type="number"
        defaultValue="93.99"
        className="w-full p-2 border text-blue-950 rounded pl-4 text-xs"
      />
    </div>

    <div>
      <label className="block text-sm mb-2 font-medium text-blue-950">Marge</label>
      <input
        type="number"
        defaultValue="111"
        className="w-full p-2 border text-blue-950 rounded pl-4 text-xs"
      />
    </div>
    
  </div>
</div>


<div className="flex-1">
  <p className="text-left text-blue-950 text-2xl mb-6 font-medium">Equipements</p>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
    
    <div>
      <label htmlFor="sousCategorie2" className="block text-sm mb-2 font-medium text-blue-950">Prix de revient équipement</label>
      <input
        type="number"
        defaultValue="100.00"
        className="w-full p-2 border text-blue-950 rounded pl-4 text-xs"
      />
    </div>

    <div>
      <label htmlFor="sousCategorie2" className="block text-sm mb-2 font-medium text-blue-950">Prix de vente</label>
      <input
        type="number"
        defaultValue="166.67"
        className="w-full p-2 border text-blue-950 rounded pl-4 text-xs"
      />
    </div>

    <div>
      <label htmlFor="sousCategorie2" className="block text-sm mb-2 font-medium text-blue-950">Marge</label>
      <input
        type="number"
        defaultValue="40.00"
        className="w-full p-2 border text-blue-950 rounded pl-4 text-xs"
      />
    </div>
    
  </div>
</div>



<div>
<p className="text-left text-blue-950 text-2xl mt-10 mb-6 font-medium">Vente équipement</p>
  {/* Grid container for select elements */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
  <table data-aos="fade-up" className="w-full table-auto border-collapse  shadow">
  <thead>
    <tr className="bg-slate-800 text-gray-400 text-sm">
      <th className="p-3 border font-medium whitespace-nowrap">Prestation</th>
      <th className="p-3 border font-medium whitespace-nowrap">Référence</th>
      <th className="p-3 border font-medium whitespace-nowrap">Désignation</th>
      <th className="p-3 border font-medium whitespace-nowrap">Qté</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix de revient</th>
      <th className="p-3 border font-medium whitespace-nowrap">Total P.R.</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix unitaire</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix total</th>
      <th className="p-3 border font-medium whitespace-nowrap">Marge</th>
      
    </tr>
  </thead>
  <tbody>
    <tr className="bg-white">
      <td className="p-2 border w-28">
        <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
          Vente
        </span>
      </td>
      <td className="p-2 border w-28">
        <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
        110C0Z3NL0
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      ECOSYS MA5500ifx
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
     1
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      100,00
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      100,00
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      166,67
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      166,67
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      40,00%
        </span>
    
      </td>
      
    </tr>
  </tbody>
</table>



</div>
</div>

<div>
<p className="text-left text-blue-950 text-2xl mt-10 mb-6 font-medium">Contrat de service annuel</p>
  {/* Grid container for select elements */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
  <table data-aos="fade-up" className="w-full table-auto border-collapse shadow">
  <thead>
    <tr className="bg-slate-800 text-gray-400 text-sm">
      <th className="p-3 border font-medium whitespace-nowrap">Prestation</th>
      <th className="p-3 border font-medium whitespace-nowrap">Référence</th>
      <th className="p-3 border font-medium whitespace-nowrap">Désignation</th>
      <th className="p-3 border font-medium whitespace-nowrap">Qté</th>
      <th className="p-3 border font-medium whitespace-nowrap">Coût total</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix unitaire</th>
      <th className="p-3 border font-medium whitespace-nowrap">Prix total</th>
      <th className="p-3 border font-medium whitespace-nowrap">Marge</th>
      
    </tr>
  </thead>
  <tbody>
    <tr className="bg-white">
      <td className="p-2 border w-28">
        <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
          Vente
        </span>
      </td>
      <td className="p-2 border w-28">
        <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
        110C0Z3NL0
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      ECOSYS MA5500ifx
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
     1
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      6,67
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      11,11
        </span>
      </td>
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      11,11
        </span>
      </td>
     
      <td className="p-2 border">
      <span className="w-full p-2 text-sm text-blue-950 font-medium transition whitespace-nowrap">
      40,00%
        </span>
    
      </td>
      
    </tr>
  </tbody>
</table>



</div>
</div>
<div className="flex gap-2 mt-16">
          <button id="link" onClick={handleEquipementClick} className="bg-amber-800 text-white font-medium py-3 px-6 transition rounded-xl hover:bg-amber-900"> <FaCheck /> Valider</button>
          
          <button id="link"  onClick={handleOptionsClick} className="bg-slate-800  text-white font-medium py-3 px-6 transition rounded-xl hover:bg-slate-700">
          <FaPlus /> Autre équipement</button>

        </div>
</div>

)}
</>)}
</>)}
</>)}
</>)}

</>)}
</>)}
</>)}
</>)}
 </div>
 
  );
   }

export default Simulation;
