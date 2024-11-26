import React from "react";
const NewEquipmentForm = ({
  newEquipment,
  subcategory,
  handleInputChange,
  handleSubmitOne,
  setIsAddingNewEquipment
}) => {
  return (
    <form onSubmit={handleSubmitOne} className="mb-4">
      <h4 className="font-bold mb-4 text-blue-950">Nouvel Équipement</h4>
      <div className="mb-4 bg-white p-6 rounded-lg shadow-md text-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Référence */}
          <input
            type="text"
            name="reference"
            placeholder="Référence"
            value={newEquipment.reference}
            onChange={handleInputChange}
            className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
            required
          />

          {/* Désignation */}
          <input
            type="text"
            name="designation"
            placeholder="Désignation"
            value={newEquipment.designation}
            onChange={handleInputChange}
            className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
            required
          />

          {/* Prix public */}
          <input
            type="number"
            name="price"
            placeholder="Prix public"
            value={newEquipment.price}
            onChange={handleInputChange}
            className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
            required
          />

          {/* Sous-catégorie */}
          <div className="p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 flex items-center">
            {subcategory}
          </div>

          {/* Coût d'achat */}
          <input
            type="number"
            name="cout"
            placeholder="Coût d'achat"
            value={newEquipment.cout}
            onChange={handleInputChange}
            className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
            required
          />

          {/* Option: Importation */}
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="importation"
              checked={newEquipment.option === "importation"}
              onChange={handleInputChange}
              className="mr-2 rounded-xl accent-gray-600"
            />
            Importation
          </label>

          {/* Option: Achat local */}
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="achat_local"
              checked={newEquipment.option === "achat_local"}
              onChange={handleInputChange}
              className="mr-2 rounded-xl accent-gray-600"
            />
            Achat Local
          </label>
        </div>

        {/* Boutons */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="p-2 rounded-lg link w-44 text-slate-800 bg-amber-100"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={() => setIsAddingNewEquipment(false)}
            className="ml-2 rounded-lg link p-2 w-24 text-white bg-slate-800"
          >
            Annuler
          </button>
        </div>
      </div>
     
    </form>
  );
};

export default NewEquipmentForm;
