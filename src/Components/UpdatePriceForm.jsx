import React from "react";
import moment from 'moment'; // Import moment here
import { FaTimes } from 'react-icons/fa'; // Assuming you're using FaTimes for delete icon

const UpdatePriceForm = ({
  editedEquipment,
  subcategory,
  product,
  handleInputChange,
  handleAddToUpdatePriceTable,
  handleCancelEdit,
  handleUpdateClick,
  showUpdateForm, // Prop pour contrôler l'affichage
  equipmentList,
  handleBack

}) => {

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
          
          <h3 className="text-lg font-bold mb-4 text-blue-950">
          Mettre à jour les prix
          </h3>
         <button
          onClick={handleBack} 
        className="p-2 m-4   sm:w-32 text-white bg-yellow-800 rounded-lg link"
      >
        Retour
      </button>
       
  
          </div>
      <form
        onSubmit={handleAddToUpdatePriceTable}
        className="mb-4 mt-10 bg-white p-6 rounded-lg shadow-md text-gray-700"
      >
        {/* Informations générales */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-4">
          {/* Référence */}
          <div className="flex-1 w-full lg:w-1/3 mb-4">
            <label htmlFor="reference" className="block text-sm lg:text-lg mb-2">
              Référence
            </label>
            <input
              type="text"
              name="reference"
              placeholder="Référence"
              value={editedEquipment.reference}
              onChange={handleInputChange}
              className="p-2 mt-1 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
              required
            />
          </div>

          {/* Désignation */}
          <div className="flex-1 w-full lg:w-1/3 mb-4">
            <label htmlFor="designation" className="block text-sm lg:text-lg mb-2">
              Désignation
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Désignation"
              value={editedEquipment.designation}
              onChange={handleInputChange}
              className="p-2 mt-1 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
              required
            />
          </div>

          {/* Prix public */}
          <div className="flex-1 w-full lg:w-1/3 mb-4">
            <label htmlFor="price" className="block text-sm lg:text-lg mb-2">
              Prix public
            </label>
            <input
              type="number"
              name="price"
              placeholder="Prix public"
              value={editedEquipment.price}
              onChange={handleInputChange}
              className="p-2 mt-1 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
              required
            />
          </div>
        </div>

        {/* Affichage conditionnel pour la mise à jour */}
        {showUpdateForm && (
          <>
           

            {/* Coût d'achat */}
            <div className="mb-4">
              <label htmlFor="cout" className="block text-gray-700">
                Coût d'achat
              </label>
              <input
                type="number"
                id="cout"
                name="cout"
                placeholder="Coût d'achat"
                value={editedEquipment.cout}
                onChange={handleInputChange}
                className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                required
              />
            </div>

            {/* Options (Importation / Achat Local) */}
            <div className="mb-4 flex flex-col">
              <label className="block text-gray-700 mb-2">Option</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="importation"
                  name="option"
                  value="importation"
                  checked={editedEquipment.option === "importation"}
                  onChange={handleInputChange}
                  className="mr-2 rounded-xl accent-gray-600"
                />
                <label htmlFor="importation" className="text-gray-700">
                  Importation
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="achat_local"
                  name="option"
                  value="achat_local"
                  checked={editedEquipment.option === "achat_local"}
                  onChange={handleInputChange}
                  className="mr-2 rounded-xl accent-gray-600"
                />
                <label htmlFor="achat_local" className="text-gray-700">
                  Achat Local
                </label>
              </div>
            </div>
          </>
        )}

        {/* Boutons d'action */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="submit"
            className="p-2 w-40 bg-amber-100 text-slate-800 rounded-lg shadow hover:bg-amber-100 link"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="p-2 w-40 bg-slate-800 text-white rounded-lg shadow hover:bg-slate-700 link"
          >
            Annuler
          </button>
        </div>
      </form>

      {/* Section Mise à jour */}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-lg lg:text-2xl font-medium text-blue-950">Mise à jour des prix</h2>
        <button
          onClick={handleUpdateClick}
          className="p-2 w-44 bg-slate-800 text-white rounded-lg shadow hover:bg-gray-700"
        >
          Mettre à jour les prix
        </button>
      </div>
      
    {/* Tableau des équipements */}
    {equipmentList.length > 0 && (
     <div className="p-4 md:p-6 overflow-x-auto">
            <table className="min-w-full bg-slate-800 border border-gray-300 mt-14 shadow-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Référence</th>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Désignation</th>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Type d'achat</th>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix d'achat</th>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Taux de change</th>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Frais d'approche</th>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Coût d'achat</th>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Date de création</th>
            <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Action</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((equipment, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">{equipment.reference}</td>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">{equipment.designation}</td>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">{equipment.option}</td>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">0.00</td>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">0.00</td>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">0.00</td>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">{equipment.cout}</td>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">
                {moment(equipment.addedDate).format("DD/MM/YYYY")}
              </td>
              <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-slate-800 text-amber-100 p-2 rounded"
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
    </div>
  );
};

export default UpdatePriceForm;
