import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AOS from "aos";
import "aos/dist/aos.css";
import './dashbord.css'
const EquipmentComponent = ({ selectedSubcategoryIndex, subcategory ,product }) => {
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

    const handleNewEquipment = () => {
        setIsAddingNewEquipment(true);
       };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewEquipment((prev) => ({ ...prev, [name]: value }));
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
     setShowUpdateForm(true);
 };


 const handleDeleteEquipment = (id) => {
     const updatedEquipment = equipmentData.filter(equipment => equipment.id !== id);
     setEquipmentData(updatedEquipment);
     localStorage.setItem('equipmentData', JSON.stringify(updatedEquipment)); // Save updated data to local storage
 };

 const handleRowClick = (equipment) => {
  setSelectedEquipment(equipment); // Update the selected equipment
  handleRowClick(equipment); // Original row click handler
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
    const filteredEquipment = equipmentData.filter(
      (equipment) => equipment.subcategory === subcategory
  );
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
    return (
        <div className="mt-10   ">
           
          {isAddingNewEquipment && !selectedEquipment ? (
  <form onSubmit={handleSubmitOne} className="mb-4">
    <h4 className="font-bold mb-2 text-blue-950">Nouvel Équipement</h4>
    
    {/* Input fields for equipment details */}
    <div className="flex mb-4">
      <input
        type="text"
        name="reference"
        placeholder="Référence"
        value={newEquipment.reference}
        onChange={handleInputChange}
        className="p-2 mt-2 rounded-xl border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
        required
      />
      <input
        type="text"
        name="designation"
        placeholder="Désignation"
        value={newEquipment.designation}
        onChange={handleInputChange}
        className="p-2 mt-2 rounded-xl  border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Prix public"
        value={newEquipment.price}
        onChange={handleInputChange}
        className="p-2 mt-2 rounded-xl  border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
        required
      />
    </div>

    {/* Flex container for cards and additional inputs */}
    <div className="flex mb-4">
      <div className="flex-1 rounded-xl  p-3 m-2 bg-white  border border-black shadow text-left">
        <h5 className="text-sm">{subcategory}</h5>
      </div>
      <div className="flex-1 p-3  rounded-xl  m-2 bg-white  border border-black shadow text-left">
        <h5 className="text-sm">Moins de 5 utilisateurs</h5>
      </div>
      <div className="flex-1  rounded-xl p-3 m-2 bg-white  border border-black shadow text-left">
        <h5 className="text-sm">Jusqu'à 2.000 pages / mois</h5>
      </div>
    </div>

    {/* Only show radio buttons if showUpdateForm is true */}
   
      <div className="flex items-center mb-4">
        <label className="flex items-center mr-4">
          <input
            type="radio"
            name="option"
            value="importation"
            checked={newEquipment.option === "importation"} // Use only editedEquipment here
            onChange={handleInputChange}
            className="mr-2 rounded-xl  accent-gray-600"
          />
          Importation
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="achat_local"
            checked={newEquipment.option === "achat_local"} // Use only newEquipment here
            onChange={handleInputChange}
            className="mr-2 rounded-xl  accent-gray-600"
          />
          Achat Local
        </label>
      </div>
  

    {/* Section for purchase price and cost */}
    <div className="flex mb-4">
      <div className="flex-1 rounded-xl  p-3 m-2 bg-white  border border-black shadow text-left">
        <h5 className="text-sm">Prix d'achat</h5>
      </div>
      <div className="flex-1 p-3 m-2 rounded-xl  bg-white  border border-black shadow text-left">
        <h5 className="text-sm">11</h5> {/* Static value; consider dynamic handling if necessary */}
      </div>
      <input
        type="number"
        name="cout"
        placeholder="Coût d'achat"
        value={newEquipment.cout}
        onChange={handleInputChange}
        className="p-2 mt-2 rounded-xl  border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
        required
      />
      <div className="flex-1 rounded-xl  p-3 m-2 bg-white  border border-black shadow text-left">
        <h5 className="text-sm">1,10</h5> {/* Static value; consider dynamic handling if necessary */}
      </div>
      <div className="flex-1 rounded-xl  p-3 m-2 bg-white  border border-black shadow text-left">
        <h5 className="text-sm">Prix de revient</h5>
      </div>
    </div>

    {/* Submit and Cancel buttons */}
    <div className="flex mt-10 justify-end">
      <button type="submit"  className=" link p-2 rounded-xl w-44 text-white bg-amber-900 ">
        Enregistrer
      </button>
      <button
        type="button"
        onClick={() => setShowUpdateForm(false)}
        className="ml-2 rounded-xl link  p-2 w-24 text-white bg-slate-800"
      >
        Annuler
      </button>
    </div>
 
  </form>

)  : selectedEquipment ?   (
               <div className="mt-4">
                
             {/* Formulaire de modification */}
                 <form onSubmit={handleAddList} className="mb-4 mt-10">
                 <div className="flex flex-wrap mb-4 gap-2 font-medium text-black">
  
  {/* Bloc Référence */}
  <div className="flex-1 w-full md:w-1/3">
    <label htmlFor="reference" className="block text-lg mb-2">
      Référence
    </label>
    <input
      type="text"
      name="reference"
      placeholder="Référence"
      value={editedEquipment.reference}
      onChange={handleInputChange}
      className="p-2 mt-1 w-full rounded-xl border border-gray-900 text-gray-900 placeholder-gray-900 text-sm shadow  h-12"
      required
    />
  </div>

  {/* Bloc Désignation */}
  <div className="flex-1 w-full md:w-1/3">
    <label htmlFor="designation" className="block text-lg  mb-2">
      Désignation
    </label>
    <input
      type="text"
      name="designation"
      placeholder="Désignation"
      value={editedEquipment.designation}
      onChange={handleInputChange}
      className="p-2 mt-1 w-full rounded-xl border border-gray-900 text-gray-900 placeholder-gray-900 text-sm shadow  h-12"
      required
    />
  </div>

  {/* Bloc Prix */}
  <div className="flex-1 w-full md:w-1/3">
    <label htmlFor="price" className="block text-lg  mb-2">
      Prix public
    </label>
    <input
      type="number"
      name="price"
      placeholder="Prix public"
      value={editedEquipment.price}
      onChange={handleInputChange}
      className="p-2 mt-1 w-full rounded-xl border border-gray-900 text-gray-900 placeholder-gray-900 text-sm shadow  h-12"
      required
    />
  </div>

  {/* Bloc Type */}
  <div className="flex-1 w-full md:w-1/3">
    <span className="block text-lg  ">Type</span>
    <div className="p-3 rounded-xl bg-white  border border-black shadow text-left mt-3">
      <h5 className="text-sm">{subcategory}</h5>
    </div>
  </div>
  </div>
<br></br>
<div className="flex flex-wrap space-x-4">
  {/* Bloc Nombre d'utilisateurs */}
  <div className="flex-1 w-full md:w-1/3 ">
    <span className="block text-lg mb-2">Nombre d'utilisateurs</span>
    <div className="p-3 bg-white border border-black shadow text-left rounded-xl">
      <h5 className="text-sm">Moins de 5 utilisateurs</h5>
    </div>
  </div>

  {/* Bloc Nombre de Pages */}
  <div className="flex-1 w-full md:w-1/3">
    <span className="block text-lg mb-2">Nombre de Pages</span>
    <div className="p-3 bg-white border border-black shadow text-left rounded-xl">
      <h5 className="text-sm">Jusqu'à 2.000 pages / mois</h5>
    </div>
  </div>
</div>

<br></br>
<div className="flex flex-wrap mb-4 gap-4 font-medium text-black">
  {/* Bloc Catégorie */}
  <div className="flex-1 w-auto max-w-xs">
    <span className="block text-lg  mb-2">Catégorie</span>
    <div className="p-3 bg-white  border border-black shadow text-left rounded-xl">
      <h5 className="text-sm">{product?.name || "No Product"}</h5>
    </div>
  </div>

  {/* Bloc Sous-catégorie */}
  <div className="flex-1 w-auto max-w-xs">
    <span className="block text-lg  mb-2">Sous-catégorie</span>
    <div className="p-3 bg-white  border border-black shadow text-left rounded-xl">
      <h5 className="text-sm">{subcategory}</h5>
    </div>
  </div>
</div>
 <div className="flex justify-end mt-6">
                     <button type="submit" className="p-2 w-44 link text-white bg-amber-900  rounded-xl">
                       Enregistrer
                     </button>
                     <button type="button" onClick={handleCancelEdit} className="ml-2 p-2 link rounded-xl w-44 text-white bg-slate-800 ">
                       Annuler
                     </button>
                   </div>
                 </form>
                 <div className="flex justify-between items-center mt-8">
   {/* <Link to='/Consommables' className=' text-2xl hover:text-gray-700'>
        Consommables
    </Link>*/}
     <h2 className="text-2xl font-medium text-blue-950 m-4 "> Mise à jour des prix</h2>

    <button
         onClick={handleUpdateClick}
        className="p-2 w-52 mb-2 rounded-xl link bg-slate-800 text-white "
    >
       Mettre à jour les prix
    </button>
</div>

{/**partie de modifier les prix */ }         
{showUpdateForm && ( <form onSubmit={handleAddList} className="mb-4 "> {/* Only show radio buttons if showUpdateForm is true */}
   
      <div className="flex items-center mb-4">
        <label className="flex items-center mr-4">
          <input
            type="radio"
            name="option"
            value="importation"
            checked={editedEquipment.option === "importation"} // Use only newEquipment here
            onChange={handleInputChange}
            className="mr-2  accent-gray-600 ml-2"
          />
          Importation
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="achat_local"
            checked={editedEquipment.option === "achat_local"} // Use only newEquipment here
            onChange={handleInputChange}
            className="mr-2 ml-4 accent-gray-600"
          />
          Achat Local
        </label>
      </div>
  

    {/* Section for purchase price and cost */}
    <div className="flex mb-4">
      <div className="flex-1 p-3 m-2 bg-white  border border-black shadow text-left rounded-xl">
        <h5 className="text-sm">Prix d'achat</h5>
      </div>
      <div className="flex-1 p-3 m-2 bg-white  border border-black shadow text-left rounded-xl">
        <h5 className="text-sm">11</h5> {/* Static value; consider dynamic handling if necessary */}
      </div>
      <input
        type="number"
        name="cout"
        placeholder="Coût d'achat"
        value={editedEquipment.cout}
        onChange={handleInputChange}
        className="p-2 mt-2 rounded-xl border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
        required
      />
      <div className="flex-1 p-3 m-2 bg-white  border border-black shadow text-left rounded-xl">
        <h5 className="text-sm">1,10</h5> {/* Static value; consider dynamic handling if necessary */}
      </div>
      <div className="flex-1 p-3 m-2 bg-white  border border-black shadow text-left rounded-xl">
        <h5 className="text-sm">Prix de revient</h5>
      </div>
    </div>

    {/* Submit and Cancel buttons */}
    <div className="flex mt-10 justify-end">
      <button type="submit" className="p-2 w-44 link rounded-xl  text-white bg-amber-900 ">
        Enregistrer
      </button>
      <button
        type="button"
        onClick={() => setShowUpdateForm(false)}
        className="ml-2 p-2 w-44 rounded-xl link text-white bg-slate-800 "
      >
        Annuler
      </button>
    </div>
 
  </form>)}
                 {/* Tableau affiché au-dessus du formulaire */}
                 {equipmentList.length > 0 && (
                   <table data-aos="fade-up"   className="min-w-full mt-14 p-2 mb-4  shadow-lg">
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
          className="bg-slate-800 text-amber-100 p-2 rounded link"
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
                    <h3 className="text-lg font-bold mb-4 text-blue-950">Équipements dans {subcategory}</h3>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Filtrer par référence"
                            value={referenceFilter}
                            onChange={handleReferenceFilterChange}
                            className="p-2 border rounded-xl border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  w-1/4"
                        />
                        <input
                            type="text"
                            placeholder="Filtrer par désignation"
                            value={designationFilter}
                            onChange={handleDesignationFilterChange}
                            className="p-2 border border-gray-900 rounded-xl text-gray-900 placeholder:text-gray-900 text-sm shadow  w-1/4 ml-2"
                        />
                        <button onClick={handleCancelFilter} className="ml-2  link p-2 w-44 rounded-xl text-white bg-slate-800">
                            Annuler
                        </button>
                        <button onClick={handleNewEquipment} className="ml-auto link w-52 rounded-xl p-2 text-white bg-slate-800 ">
                            Nouvel Équipement
                        </button>
                    </div>
 {filteredEquipment.length > 0 ? (
                <table data-aos="fade-up" className="min-w-full border-collapse mt-14 border border-gray-300 p-2 shadow-lg">
                    <thead>
                        <tr>
                            <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Référence</th>
                            <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Désignation</th>
                            <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Prix public</th>
                            <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Option</th>
                            <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Sous-catégorie </th>
                            <th className="bg-slate-800 border border-gray-300 text-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEquipment.map((equipment) => (
                            <tr key={equipment.id} className="cursor-pointer">
                                <td className="text-gray-500 border border-gray-300 p-2 bg-white px-4 py-2">{equipment.reference}</td>
                                <td className="text-gray-500 border border-gray-300 p-2 bg-white px-4 py-2">{equipment.designation}</td>
                                <td className="text-gray-500 border border-gray-300 p-2 bg-white px-4 py-2">{equipment.price}</td>
                                <td className="text-gray-500 border border-gray-300 p-2 bg-white px-4 py-2">{equipment.option}</td>
                                <td className="text-gray-500 border border-gray-300 p-2 bg-white px-4 py-2">{equipment.subcategory}</td>
                                <td className="text-gray-500 border border-gray-300 p-2 bg-white px-4 py-2">
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
            ) : (
                <p className="text-center text-gray-500 mt-14">Aucun équipement disponible pour cette sous-catégorie.</p>
            )}
                </>
            )}
        </div>
    );
};

export default EquipmentComponent;
