import React, { useState } from 'react';
import './dashbord.css'
function Produits() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission can go here
    if (file) {
      console.log('Fichier sélectionné :', file.name);
    } else {
      console.log('Aucun fichier sélectionné');
    }
  };

  const handleCancel = () => {
    setFile(null);
    // Logic to cancel file selection or form reset
  };

  return (
    <div className="flex items-center  p-14">
      <div className="bg-gray-100 p-8 shadow-lg rounded-xl " style={{width:'130rem'}}>
        {/* Titre */}
        <h1 className="text-xl font-medium mb-6 text-left text-blue-950">Importer Produits</h1>
        
        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="fileInput" className="block text-blue-900 mb-2">Choisir un fichier</label>
            <input 
              id="fileInput" 
              type="file" 
              onChange={handleFileChange} 
              className="border bg-slate-800 rounded-xl  text-gray-100 shadow-lg border-gray-300 p-2 w-full"
            />
            {/* Message indiquant aucun fichier choisi */}
            <p className="text-blue-900 mt-2">
              {file ? file.name : 'Aucun fichier choisi'}
            </p>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-2 font-medium ">
            <button 
              type="submit" 
              className=" text-white py-2 px-4  rounded-xl link bg-slate-800 transition-all"
            >
              Enregistrer
            </button>
            <button 
              type="button" 
              onClick={handleCancel} 
              className=" text-slate-800  bg-amber-100  py-2 px-4 rounded-xl link  transition-all"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Produits;
