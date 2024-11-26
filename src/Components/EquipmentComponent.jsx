import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaTimes } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";
import './dashbord.css'
import NewEquipmentForm from './NewEquipmentForm';
import UpdatePriceForm from './UpdatePriceForm';
const EquipmentComponent = ( {
  setSelectedSubcategoryIndex,
  subcategory,
  product}) => {
  
    const [equipmentData, setEquipmentData] = useState([]);
    const [referenceFilter, setReferenceFilter] = useState('');
    const [designationFilter, setDesignationFilter] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState(null);

     // État pour gérer l'affichage du formulaire de mise à jour
     const [showUpdateForm, setShowUpdateForm] = useState(false);
     const [newEquipment, setNewEquipment] = useState({
      reference: '',
      designation: '',
      price: '',
      cout: '',
      option: '',
      subcategory: subcategory, // Initialize with the current subcategory
  });
   
   const [editedEquipment, setEditedEquipment] = useState({
     reference: '',
     designation: '',
     price: '',
     cout:'',
     option: '',        // Type d'achat
   });
    const [isAddingNewEquipment, setIsAddingNewEquipment] = useState(false);
  
    const [equipmentList, setEquipmentList] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('equipmentData')) || [];
        setEquipmentData(storedData);
    }, []);

    useEffect(() => {
        if (equipmentData.length > 0) {
            localStorage.setItem('equipmentData', JSON.stringify(equipmentData));
        }
    }, [equipmentData]);
    
   useEffect(() => {
    const storedList = localStorage.getItem("equipmentList");
    if (storedList) {
      setEquipmentList(JSON.parse(storedList));
    }
  }, []);
 



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

     // Compute filtered equipment
  const filteredEquipment = equipmentData.filter((equipment) => {
    return (
      (referenceFilter === '' || equipment.reference.toLowerCase().includes(referenceFilter.toLowerCase())) &&
      (designationFilter === '' || equipment.designation.toLowerCase().includes(designationFilter.toLowerCase()))
    );
  });

    const handleNewEquipment = () => {
        setIsAddingNewEquipment(true);
       };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewEquipment((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setEditedEquipment((prev) => ({ ...prev, [name]: value }));
};
 const handleSubmitOne = (e) => {
  e.preventDefault();
  const uniqueId = new Date().getTime();
  const equipmentWithId = {
      ...newEquipment,
      id: uniqueId,
      addedDate: moment().format('YYYY-MM-DD'),
      subcategory: subcategory, // Ensure the current subcategory is assigned
  };
  setEquipmentData((prevData) => [...prevData, equipmentWithId]);
  setIsAddingNewEquipment(false);
  setNewEquipment({
      reference: '',
      designation: '',
      price: '',
      cout: '',
      option: '',
      subcategory: subcategory, // Reset with the current subcategory
  });
};
const handleUpdateClick = () => {
  if (selectedEquipment) {
    setEditedEquipment(selectedEquipment); // Pre-fill with existing equipment data
  }
  setShowUpdateForm(true); // Display the update form
};

 const handleDeleteEquipment = (id) => {
     const updatedEquipment = equipmentData.filter(equipment => equipment.id !== id);
     setEquipmentData(updatedEquipment);
     localStorage.setItem('equipmentData', JSON.stringify(updatedEquipment)); // Save updated data to local storage
 };

 const handleRowClick = (equipment) => {
  setSelectedEquipment(equipment); // Update the selected equipment
  setEditedEquipment({ ...equipment }); // Pré-remplir avec les anciennes valeurs
  setShowUpdateForm(true); // Afficher le formulaire de mise à jour
};

// Fonction pour annuler l'édition
   const handleCancelEdit = () => {
     setEditedEquipment({ reference: '', designation: '', price: 0 });
   };
   const handleAddToUpdatePriceTable = () => {
    if (editedEquipment) {
      // add row in UpdatePriceForm
      const updatedList = [...equipmentList, editedEquipment];
      setEquipmentList(updatedList);
      localStorage.setItem("equipmentList", JSON.stringify(updatedList)); 
      //edit in (Nouvel Équipement)
      const updatedEquipmentData = equipmentData.map((equipment) =>
        equipment.id === editedEquipment.id ? editedEquipment : equipment
      );
      setEquipmentData(updatedEquipmentData);
      localStorage.setItem("equipmentData", JSON.stringify(updatedEquipmentData)); 
    }
  };
  
   const handleDelete = (index) => {
     // Create a new list without the item to be deleted
     const updatedList = equipmentList.filter((_, i) => i !== index);
     setEquipmentList(updatedList);
     localStorage.setItem('equipmentList', JSON.stringify(updatedList)); // Save updated list to local storage
 };
 useEffect(() => {
  AOS.init({
    duration: 1000, // Durée de l'animation en millisecondes (par exemple, 1000ms = 1s)
    easing: 'ease-in-out', // Type de transition d'animation
    once: true, // Si true, l'animation ne se déclenche qu'une seule fois
  });
}, []);

const handleBackToCategories = () => {

  setSelectedSubcategoryIndex(null);  // Assuming you have state for selectedSubcategoryIndex
  
 
};
const handleBackToEquipment = () => {
  setShowUpdateForm(false); // Fermez le formulaire de mise à jour
};
return (
  <div className="mt-10 m-10  sm:p-8   ">
    {/* Formulaire d'ajout ou de mise à jour */}
    {isAddingNewEquipment ? (
      <NewEquipmentForm
        newEquipment={newEquipment}
        subcategory={subcategory}
        handleInputChange={handleInputChange}
        handleSubmitOne={handleSubmitOne}
        setIsAddingNewEquipment={setIsAddingNewEquipment}
      />
    ) : selectedEquipment && showUpdateForm ? (
      <UpdatePriceForm
        editedEquipment={editedEquipment}
        subcategory={subcategory}
        product={product}
        handleInputChange={handleInputChange2}
        handleAddToUpdatePriceTable={handleAddToUpdatePriceTable}
        handleCancelEdit={handleCancelEdit}
        handleUpdateClick={handleUpdateClick}
        showUpdateForm={showUpdateForm}
        equipmentList={equipmentList}
        handleBack={handleBackToEquipment}
      
      />
    ) : (
      <>
         <div className="flex justify-between items-center mb-4">
          
        <h3 className="text-lg font-bold mb-4 text-blue-950">
          Équipements dans {subcategory}
        </h3>
        <button onClick={ handleBackToCategories} className="p-2 m-4   sm:w-32 text-white bg-yellow-800 rounded-lg  link  ">
                            Retour 
                        </button>

        </div>
        {/* Filtres */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 md:p-10 rounded-lg shadow-md space-y-4 md:space-y-0 w-full mt-12">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
            <input
              type="text"
              placeholder="Filtrer par référence"
              value={referenceFilter}
              onChange={handleReferenceFilterChange}
              className="border w-full md:w-72 border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Filtrer par désignation"
              value={designationFilter}
              onChange={handleDesignationFilterChange}
              className="border w-full md:w-72 border-gray-300 rounded-md p-2"
            />
            <button
              onClick={handleCancelFilter}
              className="text-slate-800 bg-amber-100 font-medium rounded-md px-4 py-2 w-full sm:w-auto link"
            >
              Annuler
            </button>
            <button
              onClick={handleNewEquipment}
              className="bg-slate-800 text-amber-100 font-medium rounded-md px-4 py-2 w-full sm:w-auto link"
            >
              Nouvel Équipement
            </button>
          </div>
        </div>

        {/* Tableau filtré */}
        {filteredEquipment.length > 0 ? (
          <div className="p-4 md:p-6 overflow-x-auto">
            <table className="min-w-full bg-slate-800 border border-gray-300 mt-14 shadow-lg">
              <thead>
                <tr>
                  <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">
                    Référence
                  </th>
                  <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">
                    Désignation
                  </th>
                  <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">
                    Prix public
                  </th>
                  <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">
                    Option
                  </th>
                  <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">
                    Sous-catégorie
                  </th>
                  <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((equipment) => (
                  <tr
                    key={equipment.id}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(equipment)}
                  >
                    <td className="text-gray-500 border border-gray-300 bg-white px-4 py-2">
                      {equipment.reference}
                    </td>
                    <td className="text-gray-500 border border-gray-300 bg-white px-4 py-2">
                      {equipment.designation}
                    </td>
                    <td className="text-gray-500 border border-gray-300 bg-white px-4 py-2">
                      {equipment.price}
                    </td>
                    <td className="text-gray-500 border border-gray-300 bg-white px-4 py-2">
                      {equipment.option}
                    </td>
                    <td className="text-gray-500 border border-gray-300 bg-white px-4 py-2">
                      {equipment.subcategory}
                    </td>
                    <td className="text-gray-500 border border-gray-300 bg-white px-4 py-2">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleDeleteEquipment(equipment.id)}
                          className="bg-slate-800 rounded text-amber-100 p-2"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-14">
            Aucun équipement disponible pour cette sous-catégorie.
          </p>
        )}
      </>
    )}
  </div>
);


};

export default EquipmentComponent;
