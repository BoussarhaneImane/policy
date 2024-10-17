import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const Consommables = ({ selectedSubcategoryIndex, subcategory, product }) => {
    const [equipmentData, setEquipmentData] = useState([]);
    const [referenceFilter, setReferenceFilter] = useState('');
    const [designationFilter, setDesignationFilter] = useState('');
    const [newEquipment, setNewEquipment] = useState({
        reference: '',
        designation: '',
        affect: '',
        price: '',
        option: '', // Ajouté pour gérer l'option (radio buttons)
        cout: '',   // Ajouté pour gérer le coût d'achat
    });
    const [isColorChecked, setIsColorChecked] = useState(false);
    const [isMonochromeChecked, setIsMonochromeChecked] = useState(false);
    const [isAddingNewEquipment, setIsAddingNewEquipment] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('equipmentData')) || [];
        setEquipmentData(storedData);
    }, []);

    useEffect(() => {
        if (equipmentData.length > 0) {
            localStorage.setItem('equipmentData', JSON.stringify(equipmentData));
        }
    }, [equipmentData]);

    const handleColorChange = () => {
        setIsColorChecked(!isColorChecked);
    };

    const handleMonochromeChange = () => {
        setIsMonochromeChecked(!isMonochromeChecked);
    };

    const handleReferenceFilterChange = (e) => {
        setReferenceFilter(e.target.value);
    };

    const handleDesignationFilterChange = (e) => {
        setDesignationFilter(e.target.value);
    };

    const handleCancelFilter = () => {
        setReferenceFilter('');
        setDesignationFilter('');
    };

    const handleNewEquipment = () => {
        setIsAddingNewEquipment(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEquipment({ ...newEquipment, [name]: value });
    };

    const handleSubmitOne = (event) => {
        event.preventDefault();
        setEquipmentData((prev) => [...prev, newEquipment]);
        setNewEquipment({
            reference: '',
            designation: '',
            affect: '',
            price: '',
            option: '',  // Réinitialisation après soumission
            cout: ''
        });
    };

    const handleDelete = (index) => {
        const updatedList = equipmentData.filter((_, i) => i !== index);
        setEquipmentData(updatedList);
        localStorage.setItem('equipmentData', JSON.stringify(updatedList));
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="mt-24 p-4 font-medium">
            <div className="flex justify-end mb-8">
                <button
                    onClick={handleGoBack}
                    className="p-2 text-white w-28 bg-amber-900 rounded-lg"
                >
                    Retour
                </button>
            </div>

            {isAddingNewEquipment ? (
                <form onSubmit={handleSubmitOne} className="mb-4">
                    <h3 className="font-bold mb-4 text-xl">Nouveau Consommable</h3>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            name="reference"
                            placeholder="Référence"
                            value={newEquipment.reference}
                            onChange={handleInputChange}
                            className="p-2 mt-2 border border-gray-900 text-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12 placeholder:text-gray-950"
                            required
                        />
                        <input
                            type="text"
                            name="designation"
                            placeholder="Désignation"
                            value={newEquipment.designation}
                            onChange={handleInputChange}
                            className="p-2 mt-2 border border-gray-900 text-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12 placeholder:text-gray-950"
                            required
                        />
                        <input
                            type="text"
                            name="affect"
                            placeholder="Affectation"
                            value={newEquipment.affect}
                            onChange={handleInputChange}
                            className="p-2 mt-2 border border-gray-900 text-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12 placeholder:text-gray-950"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Prix public"
                            value={newEquipment.price}
                            onChange={handleInputChange}
                            className="p-2 mt-2 border border-gray-900 text-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12 placeholder:text-gray-950"
                            required
                        />
                    </div>
                    <div className="flex mb-4">
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">Aucune Sélection</h5>
                  </div>
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">Moins de 5 utilisateurs</h5>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isColorChecked}
                                onChange={handleColorChange}
                                className="mr-2 h-5 w-5 text-gray-600 rounded border-gray-300"
                            />
                            Couleur
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isMonochromeChecked}
                                onChange={handleMonochromeChange}
                                className="mr-2 h-5 w-5 text-gray-600 rounded border-gray-300"
                            />
                            Monochrome
                        </label>
                    </div>
              </div>

                   
              <h3 className="font-bold  text-xl mb-4 mt-8">Calcul de Prix</h3>
                    
                    <div className="flex items-center mb-4">
                        <label className="flex items-center mr-4">
                            <input
                                type="radio"
                                name="option"
                                value="importation"
                                checked={newEquipment.option === "importation"}
                                onChange={handleInputChange}
                                className="mr-2 accent-gray-600"
                            />
                            Importation
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="option"
                                value="achat_local"
                                checked={newEquipment.option === "achat_local"}
                                onChange={handleInputChange}
                                className="mr-2 accent-gray-600"
                            />
                            Achat Local
                        </label>
                    </div>

                    <div className="flex mb-4">
                 
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">Prix d'achat</h5>
                  </div>
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">11</h5>
                  </div>
                  <input
                  type="number"
                 name="cout"
                  placeholder="Cout d'achat"
                  value={newEquipment.cout}
                  onChange={handleInputChange}
                 className="p-2 mt-2 border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12"
                 required
/>
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">1,10</h5>
                  </div>
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">Prix de revient</h5>
                  </div>
                 
              </div>
          
              <div className="flex mt-10 justify-end">
                        <button type="submit" className="p-2 text-white bg-teal-600 rounded-lg">
                            Enregistrer
                        </button>
                        <button type="button" className="ml-2 p-2 w-24 text-white bg-teal-600 rounded-lg">
                            Annuler
                        </button>
                 </div>

                  
                </form>
            ) : (
                <>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Filtrer par référence"
                            value={referenceFilter}
                            onChange={handleReferenceFilterChange}
                            className="p-2 border border-gray-900 text-gray-900 text-sm shadow rounded-lg w-1/4"
                        />
                        <input
                            type="text"
                            placeholder="Filtrer par désignation"
                            value={designationFilter}
                            onChange={handleDesignationFilterChange}
                            className="p-2 border border-gray-900 text-gray-900 text-sm shadow rounded-lg w-1/4 ml-2"
                        />
                        <button className="ml-2 p-2 text-white bg-teal-600 rounded-lg">
                            Rechercher
                        </button>
                        <button onClick={handleCancelFilter} className="ml-2 p-2 text-white bg-teal-600 rounded-lg">
                            Annuler
                        </button>

                        <button onClick={handleNewEquipment} className="ml-auto font-medium w-52 p-2 text-white bg-blue-950 rounded-lg">
                            Nouvel Consommable
                        </button>
                    </div>

                    <table className="min-w-full border-collapse border border-gray-300 p-2">
                        <thead>
                            <tr>
                                <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Référence</th>
                                <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Désignation</th>
                                <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Affectation</th>
                                <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Prix</th>
                                <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentData
                                .filter((equipment) =>
                                    equipment.reference.toLowerCase().includes(referenceFilter.toLowerCase()) &&
                                    equipment.designation.toLowerCase().includes(designationFilter.toLowerCase())
                                )
                                .map((equipment, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{equipment.reference}</td>
                                        <td className="border border-gray-300 px-4 py-2">{equipment.designation}</td>
                                        <td className="border border-gray-300 px-4 py-2">{equipment.affect}</td>
                                        <td className="border border-gray-300 px-4 py-2">{equipment.price}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                <FaTimes />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Consommables;
