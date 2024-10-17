import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';
const EquipmentComponent = ({ selectedSubcategoryIndex, subcategory ,product }) => {
    const [equipmentData, setEquipmentData] = useState([]);
    const [referenceFilter, setReferenceFilter] = useState('');
    const [designationFilter, setDesignationFilter] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [newEquipment, setNewEquipment] = useState({
     reference: '',
     designation: '',
     price: '',
     cout: '', // Ensure this is included
     option: '',
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
        if (selectedEquipment) {
            setEditedEquipment({ ...editedEquipment, [name]: value });
        } else {
            setNewEquipment({ ...newEquipment, [name]: value });
        }
    };

 //ajoute equipement modifier 
const handleSubmit = (e) => {
     e.preventDefault();
     const uniqueId = new Date().getTime();
     
     // Ajout de la date d'ajout
     const equipmentWithId = {
         ...newEquipment,
         id: uniqueId,
         addedDate: moment().format('YYYY-MM-DD'), // Date ajoutée ici
     };
     
     setEquipmentList((prevData) => [...prevData, equipmentWithId]);
     
   
     
     setIsAddingNewEquipment(false);
 };
 
 const handleCancelAdd = () => {
     setIsAddingNewEquipment(false);
     setEquipmentData([...newEquipment]);
     setNewEquipment({
         reference: '',
         designation: '',
         price: '',
         option: '',
     });
 };
 const handleSubmitOne = (event) => {
     event.preventDefault(); // Prevent default form submission
     // Logic to save the new equipment
     // For example, you can add the new equipment to your equipmentData
     setEquipmentData((prev) => [...prev, newEquipment]);
     setNewEquipment({
          reference: '',
          designation: '',
          price: '',
          cout: '', // Reset cout as well
          option: '',
      });
 }; 


 const handleDeleteEquipment = (id) => {
     const updatedEquipment = equipmentData.filter(equipment => equipment.id !== id);
     setEquipmentData(updatedEquipment);
     localStorage.setItem('equipmentData', JSON.stringify(updatedEquipment)); // Save updated data to local storage
 };

    const handleRowClick = (equipment) => {
        setSelectedEquipment(equipment);
        setEditedEquipment({ ...equipment });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setEquipmentData((prevData) =>
            prevData.map((item) =>
                item.id === editedEquipment.id ? editedEquipment : item
            )
        );
        setSelectedEquipment(null);
    };

   // Fonction pour annuler l'édition
   const handleCancelEdit = () => {
     setEditedEquipment({ reference: '', designation: '', price: 0 });
   };
 
    const handleAddList =()=>{
     const updatedList = [...equipmentList, editedEquipment];
     setEquipmentList(updatedList);
 
     // Sauvegarde dans localStorage
     localStorage.setItem("equipmentList", JSON.stringify(updatedList));
 
     // Réinitialise les champs du formulaire
     setEditedEquipment({ reference: '', designation: '', price: 0  });
    }
   
 
 
   // Récupérer les données de localStorage lorsque le composant est monté
   useEffect(() => {
     const storedList = localStorage.getItem("equipmentList");
     if (storedList) {
       setEquipmentList(JSON.parse(storedList));
     }
   }, []);
   const handleDelete = (index) => {
     // Create a new list without the item to be deleted
     const updatedList = equipmentList.filter((_, i) => i !== index);
     setEquipmentList(updatedList);
     localStorage.setItem('equipmentList', JSON.stringify(updatedList)); // Save updated list to local storage
 };
    return (
        <div className="mt-8">
            {/* Only show the new equipment form if not editing an equipment */}
            {isAddingNewEquipment && !selectedEquipment ? (
              <form onSubmit={handleSubmitOne} className="mb-4">
              <h4 className="font-bold mb-2">Nouvel Équipement</h4>
              <div className="flex mb-4">
                  <input
                      type="text"
                      name="reference"
                      placeholder="Référence"
                      value={newEquipment.reference}
                      onChange={handleInputChange}
                      className="p-2 mt-2 border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12"
                      required
                  />
                  <input
                      type="text"
                      name="designation"
                      placeholder="Désignation"
                      value={newEquipment.designation}
                      onChange={handleInputChange}
                      className="p-2 mt-2 border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12"
                      required
                  />
                  <input
                      type="number"
                      name="price"
                      placeholder="Prix public"
                      value={newEquipment.price}
                      onChange={handleInputChange}
                      className="p-2 mt-2 border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12"
                      required
                  />
              </div>
          
              {/* Flex container for cards and additional inputs */}
              <div className="flex mb-4">
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">{subcategory}</h5>
                  </div>
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">Moins de 5 utilisateurs</h5>
                  </div>
                  <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left">
                      <h5 className="text-sm">Jusqu'à 2.000 pages / mois</h5>
                  </div>
              </div>
          
              {/* Radio Buttons */}
              <div className="flex items-center mb-4">
    <label className="flex items-center mr-4">
        <input
            type="radio"
            name="option"
            value="importation"
            checked={newEquipment.option === "importation" || editedEquipment.option === "importation"} // Check based on both newEquipment and equipment values
            onChange={handleInputChange}
            className="mr-2 accent-gray-600" // Set color to gray
        />
        Importation
    </label>
    <label className="flex items-center">
        <input
            type="radio"
            name="option"
            value="achat_local"
            checked={newEquipment.option === "achat_local" || editedEquipment.option === "achat_local"} // Check based on both newEquipment and equipment values
            onChange={handleInputChange}
            className="mr-2 accent-gray-600" // Set color to gray
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
                  <button type="submit"  className="p-2 text-white bg-teal-600 rounded-lg">
                      Enregistrer
                  </button>
                  <button type="button"  className="ml-2 p-2 w-24 text-white bg-teal-600 rounded-lg">
                      Annuler
                  </button>
              </div>
          </form>
            ) : selectedEquipment ? (
               <div className="mt-4">
                 <h4 className="font-bold mb-2">Modifier Équipement</h4>
             
                 {/* Formulaire de modification */}
                 <form onSubmit={handleAddList} className="mb-4">
                   <div className="flex flex-wrap mb-4">
                     <input
                       type="text"
                       name="reference"
                       placeholder="Référence"
                       value={editedEquipment.reference}
                       onChange={handleInputChange}
                       className="p-2 mt-2  max-w-xs border border-gray-900 text-gray-900 placeholder-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12"
                       required
                     />
                     <input
                       type="text"
                       name="designation"
                       placeholder="Désignation"
                       value={editedEquipment.designation}
                       onChange={handleInputChange}
                       className="p-2 mt-2  max-w-xs border border-gray-900 text-gray-900 placeholder-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12"
                       required
                     />
                     <input
                       type="number"
                       name="price"
                       placeholder="Prix public"
                       value={editedEquipment.price}
                       onChange={handleInputChange}
                       className="p-2 mt-2 max-w-xs border border-gray-900 text-gray-900 placeholder-gray-900 text-sm shadow rounded-lg flex-1 mr-2 h-12"
                       required
                     />
                   </div>
             
                   <div className="flex flex-wrap mb-4">
                     <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left max-w-xs">
                       <h5 className="text-sm">{subcategory}</h5>
                     </div>
                     <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left max-w-xs">
                       <h5 className="text-sm">Moins de 5 utilisateurs</h5>
                     </div>
                     <div className="flex-1 p-3 m-2 bg-white rounded-lg border border-black shadow text-left max-w-xs">
                       <h5 className="text-sm">Jusqu'à 2.000 pages / mois</h5>
                     </div>
                   </div>
                   <br></br>
                   <div className="flex flex-wrap mb-4 ">
                    
                    
                   <div className="flex-1 p-3 m-2   bg-white rounded-lg border border-black shadow text-left max-w-xs">
                   <h5 className="text-sm">{subcategory}</h5>
                   </div>
                  <div className="flex-1 p-3 m-2  bg-white rounded-lg border border-black shadow text-left max-w-xs">
                   <h5 className="text-sm">{product?.name || "No Product"}</h5>
                   </div>

                   </div>
             
                   <div className="flex justify-end mt-6">
                     <button type="submit" className="p-2 text-white bg-teal-600 rounded-lg">
                       Enregistrer
                     </button>
                     <button type="button" onClick={handleCancelEdit} className="ml-2 p-2 w-24 text-white bg-teal-600 rounded-lg">
                       Annuler
                     </button>
                   </div>
                 </form>
             
                 {/* Tableau affiché au-dessus du formulaire */}
                 {equipmentList.length > 0 && (
                   <table className="min-w-full p-2 mb-4">
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
    <tr key={index} >
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.reference}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.designation}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.option}</td>
      <td className="px-4 py-2 text-gray-500  border border-gray-300  bg-white">0.00</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">0.00</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">0.00</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.cout}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">
           {moment(equipment.addedDate).format('DD/MM/YYYY')}
        </td>
        <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">
        <button 
          onClick={() => handleDelete(index)} // Call delete function with the index
          className="bg-red-500 text-white p-2 rounded"
        >
          <FaTimes/>
        </button>
      </td>
    </tr>
  ))}
</tbody>

                   </table>
                 )}
               </div>
             ) :(
                
                <>
                    <h3 className="text-lg font-bold mb-4">Équipements dans {subcategory}</h3>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Filtrer par référence"
                            value={referenceFilter}
                            onChange={handleReferenceFilterChange}
                            className="p-2 border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow rounded-lg w-1/4"
                        />
                        <input
                            type="text"
                            placeholder="Filtrer par désignation"
                            value={designationFilter}
                            onChange={handleDesignationFilterChange}
                            className="p-2 border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow rounded-lg w-1/4 ml-2"
                        />
                        <button onClick={handleCancelFilter} className="ml-2 p-2 text-white bg-teal-600 rounded-lg">
                            Annuler
                        </button>
                        <button onClick={handleNewEquipment} className="ml-auto w-52 p-2 text-white bg-blue-950 rounded-lg">
                            Nouvel Équipement
                        </button>
                    </div>
                    <table className="min-w-full border-collapse  border border-gray-300 p-2 ">
                        <thead>
                            <tr>
                                <th className=" bg-slate-800
                                 border border-gray-300  text-gray-300  px-4 py-2">Référence</th>
                                <th className=" bg-slate-800
                                  border border-gray-300  text-gray-300  px-4 py-2">Désignation</th>
                                <th className=" bg-slate-800
                                   border border-gray-300  text-gray-300  px-4 py-2">Prix public</th>
                                <th className=" bg-slate-800
                                  border border-gray-300  text-gray-300  px-4 py-2">Option</th>
                                <th className=" bg-slate-800
                                  border border-gray-300  text-gray-300  px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentData
                                .filter(equipment => 
                                    equipment.reference.includes(referenceFilter) && 
                                    equipment.designation.includes(designationFilter)
                                )
                                .map(equipment => (
                                    <tr key={equipment.id} onClick={() => handleRowClick(equipment)} className="cursor-pointer hover:bg-gray-50">
                                        <td className="text-gray-500 border  border-gray-300 p-2 bg-white px-4 py-2">{equipment.reference}</td>
                                        <td className="text-gray-500 border  border-gray-300 p-2 bg-white px-4 py-2">{equipment.designation}</td>
                                        <td className="text-gray-500 border  border-gray-300 p-2 bg-white px-4 py-2">{equipment.price}</td>
                                        <td className=" text-gray-500 border  border-gray-300 p-2 bg-white px-4 py-2"> {subcategory}</td>
                                        <td className="text-gray-500 border  border-gray-300 p-2 bg-white px-4 py-2">
                                            <button onClick={() => handleDeleteEquipment(equipment.id)} className="bg-red-500 text-white p-2 rounded">
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

export default EquipmentComponent;
