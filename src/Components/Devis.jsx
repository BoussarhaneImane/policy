import React, { useEffect, useState } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";
import './devis.css';

function Devis() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showSecondRow, setShowSecondRow] = useState(false); // To track the selection of the second row

  // Mock data for companies
  const companies = [
    { name: 'JOHA CORP', phone: '123-456-789', email: 'contact@johacorp.com', address: '5, rue rouget de l\'isle, 1er étage', clientSince: '08-10-2024' },
    { name: 'ABC Solutions', phone: '987-654-321', email: 'info@abcsolutions.com', address: '12, avenue du Parc', clientSince: '15-01-2023' },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  const handleRowClick = (rowData, index) => {
    if (index === 0) {
      setSelectedRow(rowData);
      setShowSecondRow(false); // Hide the second row selection
    } else if (index === 1) {
      setSelectedRow(rowData);
     setShowSecondRow(true)
    } else {
      setSelectedRow(null);
      setShowSecondRow(false); // Reset if no selection
    }
  };

  const handleCompanySelect = (e) => {
    const companyName = e.target.value;
    const company = companies.find(comp => comp.name === companyName);
    setSelectedCompany(company);
  };

  const returnToMainTable = () => {
    setSelectedRow(null);
    setSelectedCompany(null);
    setShowSecondRow(false);
  };

  return (
    <div className="m-10">
      <div className='bg-gray-100 p-10 shadow-lg rounded-lg'>
        <h2 className="text-2xl text-blue-950 mb-4 font-medium">Devis</h2>

        {/* Main Table */}
        {!selectedRow && (
      <div className="p-4 md:p-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300 mt-4 shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Raison Sociale</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Désignation</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Quantité</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Total H.T.</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Statut</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Version</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Type</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Date d'ajout</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Collaborateur</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { designation: 'ECOSYS P8060cdn', quantity: 1, totalHT: '166,67', status: 'Non affecté', version: 1, type: 'Vente', dateAdded: '28-10-2024', collaborator: 'Ahmed Kasime' },
                { designation: 'TASKalfa 308ci', quantity: 1, totalHT: '241,57', status: 'Non affecté', version: 1, type: 'Location', dateAdded: '25-10-2024', collaborator: 'Siham KOUDRY' }
              ].map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row, index)} className="cursor-pointer">
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white"></td>
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white">{row.designation}</td>
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white">{row.quantity}</td>
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white">{row.totalHT}</td>
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white">{row.status}</td>
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white">{row.version}</td>
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white">{row.type}</td>
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white">{row.dateAdded}</td>
                  <td className="px-4 py-2 text-blue-950 font-medium border border-gray-300 bg-white">{row.collaborator}</td>
                  <td className="border border-gray-300 p-2 bg-white flex">
                    <button className="link flex items-center rounded bg-amber-100 text-slate-800 p-2 mr-2"><FaEdit /></button>
                    <button className="link bg-slate-800 rounded text-amber-100 p-2"><FaTimes /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}

{!showSecondRow && (
<>
        {/* Detailed View for Selected First Row Only */}
        {selectedRow && (

          <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
            <div className=' sm:flex   justify-between m-10'>
            <h3 className="text-2xl font-bold text-blue-950 ">Générer un devis </h3>
            <h3 className="text-xl  font-medium pl-10 text-slate-800">Configuration: {selectedRow.designation}</h3>
            <select onChange={handleCompanySelect} className="border p-2 w-full rounded border-blue-900 mb-4">
              <option value="">Sélectionnez une entreprise</option>
              {companies.map((company, index) => (
                <option key={index} value={company.name}>{company.name}</option>
              ))}
            </select>
           </div>
            {/* Display selected company details */}
            {selectedCompany && (

              <div className=' bg-slate-50 shadow p-4 mb-14'>
               <h3 className="text-xl text-left font-medium text-blue-950 mb-4">Info Entreprise </h3>
  <div className="  text-slate-600 rounded  font-medium flex flex-wrap">
    
    <p className="mr-4"><strong>Raison Sociale:</strong> {selectedCompany.name}</p>
    <p className="mr-4"><strong>Téléphone:</strong> {selectedCompany.phone}</p>
    <p className="mr-4"><strong>Email:</strong> {selectedCompany.email}</p>
    <p className="mr-4"><strong>Adresse:</strong> {selectedCompany.address}</p>
    <p><strong>Client depuis le:</strong> {selectedCompany.clientSince}</p>
  </div>
</div>
)}



            {/* Detailed Tables for Vente Équipement et Consommables */}
            <h4 className="text-xl  mb-4 font-medium text-blue-950">Vente Équipement et Consommables</h4>
            <div className="p-4 md:p-6 overflow-x-auto">
            <table className="min-w-full  border border-gray-300 mt-4 shadow-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prestation</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800 ">Référence</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Désignation</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Qté</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix de revient</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Total P.R.</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix unitaire</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix total</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Marge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-blue-950 font-medium"></td>
                  <td className="border p-2 text-blue-950 font-medium">REF-001</td>
                  <td className="border p-2 text-blue-950 font-medium">Imprimante 1</td>
                  <td className="border p-2 text-blue-950 font-medium">1</td>
                  <td className="border p-2 text-blue-950 font-medium">500,00</td>
                  <td className="border p-2 text-blue-950 font-medium">500,00</td>
                  <td className="border p-2 text-blue-950 font-medium">700,00</td>
                  <td className="border p-2 text-blue-950 font-medium">700,00</td>
                  <td className="border p-2 text-blue-950 font-medium">200,00</td>
                </tr>
               
              </tbody>
            </table>
            </div>
            <br></br>
             {/* Detailed Tables for Vente Équipement et Consommables */}
             <h4 className="text-xl  mb-4 font-medium text-blue-950">Contrat de service annuel</h4>
             <div className="p-4 md:p-6 overflow-x-auto">
             <table className="min-w-full  border border-gray-300 mt-4 shadow-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prestation</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800 ">Référence</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Désignation</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Qté</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Coût total</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix de vente</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix total</th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Marge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-blue-950 font-medium">Contrat de service</td>
                  <td className="border p-2 text-blue-950 font-medium">REF-001</td>
                  <td className="border p-2 text-blue-950 font-medium">Imprimante 1</td>
                  <td className="border p-2 text-blue-950 font-medium">1</td>
                  <td className="border p-2 text-blue-950 font-medium">500,00</td>
                  <td className="border p-2 text-blue-950 font-medium">500,00</td>
                  <td className="border p-2 text-blue-950 font-medium">700,00</td>
                  <td className="border p-2 text-blue-950 font-medium">700,00</td>
               
                </tr>
               
              </tbody>
            </table>
            </div>
            {/* Button to return to the main table */}
            <button onClick={returnToMainTable} className="bg-cyan-900 shadow-lg text-white rounded p-2 mt-4">Liste devis</button>
            {selectedCompany && (
              <button className="bg-amber-900 ml-4 text-white shadow-lg px-4 py-2 rounded">Générer PDF</button>
            )}
          </div>
        )}
</>)}
        {/* Second Product Selection */}
      
        {showSecondRow && (
       
          <div className="bg-white p-4 mt-4 rounded shadow-lg">
               <div className=' sm:flex   justify-between m-10'>
            <h3 className="text-xl  font-bold mb-2 text-blue-950">Générer un devis </h3>
            <h3 className="text-xl font-medium text-slate-800 ">Configuration: {selectedRow.designation}</h3>
            <select onChange={handleCompanySelect} className="border p-2 w-full rounded border-blue-900 mb-4">
              <option value="">Sélectionnez une entreprise</option>
              {companies.map((company, index) => (
                <option key={index} value={company.name}>{company.name}</option>
              ))}
            </select>
            </div>

            {/* Display selected company details for second row */}
            {selectedCompany && (

<div className=' bg-slate-50 shadow p-4 mb-14'>
 <h3 className="text-xl text-left font-medium text-blue-950 mb-4">Info Entreprise </h3>
<div className="  text-slate-600 rounded  font-medium flex flex-wrap">

<p className="mr-4"><strong>Raison Sociale:</strong> {selectedCompany.name}</p>
<p className="mr-4"><strong>Téléphone:</strong> {selectedCompany.phone}</p>
<p className="mr-4"><strong>Email:</strong> {selectedCompany.email}</p>
<p className="mr-4"><strong>Adresse:</strong> {selectedCompany.address}</p>
<p><strong>Client depuis le:</strong> {selectedCompany.clientSince}</p>
</div>
</div>
)}


            {/* Monthly Rental and Sale of Consumables Table */}
            <h4 className="text-xl text-blue-950 font-medium mb-4">Loyer mensuel + vente de consommables</h4>
            <div className="p-4 md:p-6 overflow-x-auto">
             <table className="min-w-full  border border-gray-300 mt-4 shadow-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border text-gray-300 bg-slate-800">Désignation</th>
                  <th className="px-4 py-2 border text-gray-300 bg-slate-800">Type</th>
                  <th className="px-4 py-2 border text-gray-300 bg-slate-800">Prix Mensuel</th>
                  <th className="px-4 py-2 border text-gray-300 bg-slate-800">Prix de Vente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-blue-950 font-medium ">TASKalfa 308ci</td>
                  <td className="border p-2 text-blue-950 font-medium">Location</td>
                  <td className="border p-2 text-blue-950 font-medium">200,00</td>
                  <td className="border p-2 text-blue-950 font-medium">250,00</td>
                </tr>
              
              </tbody>
            </table>
</div>
            {/* Button to return to the main table */}
            <button onClick={returnToMainTable} className="bg-cyan-900 text-white rounded p-2 mt-8 shadow-lg">List devis</button>
            {selectedCompany && (
              <button className="bg-amber-900 ml-4 text-white px-4 py-2 rounded shadow-lg">Générer PDF</button>
            )}
          </div>
         )}
        
         </div>
    </div>
  );
}

export default Devis;
