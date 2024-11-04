import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";


function Attente() {


  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);


  return (
    <div className="m-10 bg-gray-100 p-10 shadow-lg rounded-lg">
      <div className=' rounded-lg'>
        <h2 className="text-2xl text-blue-950 mb-4 font-medium">Devis en Attente</h2>

        
          <table data-aos="fade-up" className="min-w-full p-2 mb-4 devis-container">
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
              
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default Attente;
