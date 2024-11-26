import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";
import './dashbord.css'  
const Consommables = ({ selectedSubcategoryIndex, subcategory, product }) => {
    const [consomableData, setconsomableData] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showForm ,setShowForm] =useState(false)
    const [referenceFilter, setReferenceFilter] = useState('');
    const [designationFilter, setDesignationFilter] = useState('');
    const [newconsomable, setNewconsomable] = useState({
        reference: '',
        designation: '',
        price: '',
        affect: '',
        prix:'',
        taux:'',
        frais:'',
        cout:'',
        duree:''
    });
    const [isColorChecked, setIsColorChecked] = useState(false);
    const [isMonochromeChecked, setIsMonochromeChecked] = useState(false);
    const [editedconsomable, setEditedconsomable] = useState({
        reference: '',
        designation: '',
        affect: '',
        price: '',
        option: '', 
        cout: '',   
    });
      const [consomableList, setconsomableList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('consomableData')) || [];
        setconsomableData(storedData);
    }, []);

    useEffect(() => {
        if (consomableData.length > 0) {
            localStorage.setItem('consomableData', JSON.stringify(consomableData));
        }
    }, [consomableData]);

    const handleColorChange = () => {
        setIsColorChecked(!isColorChecked);
    };

    const handleMonochromeChange = () => {
        setIsMonochromeChecked(!isMonochromeChecked);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewconsomable({ ...newconsomable, [name]: value });
    };

    const handleSubmitOne = (event) => {
        event.preventDefault();
        setconsomableData((prev) => [...prev, newconsomable]);
        setNewconsomable({
            reference: '',
            designation: '',
            price: '',
            affect: '',
            prix:'',
            taux:'',
            frais:'',
            cout:'',
            duree:''
        
        
        });
    };

    const handleDelete = (index) => {
        const updatedList = consomableData.filter((_, i) => i !== index);
        setconsomableData(updatedList);
        localStorage.setItem('consomableData', JSON.stringify(updatedList));
    };

    const handleUpdateClick = () => {
        setShowUpdateForm(true);
    };


    const handleGoBack = () => {
        navigate(-1)
    };
    {/*
    const handleAddList =()=>{
        const updatedList = [...equipmentList, editedEquipment];
        setEquipmentList(updatedList);
    
        // Sauvegarde dans localStorage
        localStorage.setItem("equipmentList", JSON.stringify(updatedList));
    
        // Réinitialise les champs du formulaire
        setEditedEquipment({  reference: '',
            designation: '',
            affect: '',
            price: 0,
            option: '', // Ajouté pour gérer l'option (radio buttons)
            cout: '',   });
       }
            */}

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

   const handleConsommable = () =>{
        setShowForm(true);
   }
   const handleBack = () => {
    setShowForm(false)
      };
   useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation en millisecondes (par exemple, 1000ms = 1s)
      easing: 'ease-in-out', // Type de transition d'animation
      once: true, // Si true, l'animation ne se déclenche qu'une seule fois
    });
  }, []);
    return (
        <div className="mt-14 shadow-xl m-10  sm:p-8 sm:pt-4  font-medium bg-gray-100  rounded-lg" >
             <div className="flex justify-between items-center mb-10  ">
            
             <Link to='/Consommables' className=' text-xl  font-bold text-blue-950'>
        Consommables
    </Link>
             
    
 <button
   onClick={handleBack}
     className="p-2 m-4  sm:w-32 rounded-lg link bg-yellow-800 text-white "
 >
     Retour
 </button>
</div>
{showForm && (
  <>
    
    {showUpdateForm && (
      <>
      <div className="text-end mr-10">
       
      </div>
        <h1 className="mt-10 text-xl font-bold text-blue-950">Nouveau Consommable</h1>
      </>
    )}
  </>
)}


{!showForm &&(
    <>
<div className="flex flex-wrap md:flex-nowrap mb-4 bg-white p-6 rounded-lg shadow-md text-gray-700 items-center gap-4">
  <input
    type="text"
    placeholder="Référence"
    value={referenceFilter}
    onChange={handleReferenceFilterChange}
    className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
  />
  <input
    type="text"
    placeholder="Désignation"
    value={designationFilter}
    onChange={handleDesignationFilterChange}
    className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
  />
  <button
    onClick={() => {}}
    className="link p-2 rounded-lg w-full md:w-32 text-white bg-slate-800"
  >
    Rechercher
  </button>
  <button
    onClick={handleCancelFilter}
    className="link p-2 rounded-lg w-full md:w-32 text-slate-800 bg-amber-100"
  >
    Annuler
  </button>
  <button
    onClick={handleConsommable}
    className="link p-2 rounded-lg w-full md:w-52 text-white bg-slate-800 md:ml-auto "
  >
    Nouveau Consommable
  </button>
</div>
                    
<h1 className='text-xl text-blue-950 font-bold mt-10'>Liste des Consommables</h1>



<div className="p-4 md:p-6 overflow-x-auto">
<table className="min-w-full bg-slate-800 border border-gray-300 mt-14 shadow-lg">
                    <thead>
  <tr>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Référence</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Désignation</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Affectation</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix Public</th>
     
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">action</th>
   
  </tr>
</thead>
<tbody>
  {consomableData.map((equipment, index) => (
    <tr key={index} >
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.reference}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.designation}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.affect}</td>
      <td className="px-4 py-2 text-gray-500  border border-gray-300  bg-white">{equipment.price}</td>
      
       
        <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white"><button onClick={() => handleDelete(index)} className='bg-slate-800  text-amber-100 p-2 rounded link '><FaTimes/></button></td>
        </tr>
  ))}
</tbody>

                   </table>
</div>
</>
)}
{showForm && (
<form onSubmit={handleSubmitOne} className="mb-4 p-4">
                   
<div className="flex flex-wrap md:flex-nowrap mb-4 bg-white p-6 rounded-lg shadow-md text-gray-700 items-center gap-4">
                       <input
                           type="text"
                           name="reference"
                           placeholder="Référence"
                           value={newconsomable.reference}
                           onChange={handleInputChange}
                          className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="text"
                           name="designation"
                           placeholder="Désignation"
                           value={newconsomable.designation}
                           onChange={handleInputChange}
                          className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="number"
                           name="price"
                           placeholder="Prix public"
                           value={newconsomable.price}
                           onChange={handleInputChange}
                           className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="text"
                           name="affect"
                           placeholder="Affectation"
                           value={newconsomable.affect}
                           onChange={handleInputChange}
                           className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                         <label className="flex items-center m-2">
                           <input
                               type="checkbox"
                               checked={isColorChecked}
                               onChange={handleColorChange}
                               className="mr-2 h-5 w-5 text-gray-600 rounded border-gray-300"
                           />
                           Couleur
                       </label>

                       <label className="flex items-center m-2" >
                           <input
                               type="checkbox"
                               checked={isMonochromeChecked}
                               onChange={handleMonochromeChange}
                               className="mr-2 h-5 w-5 text-gray-600 rounded border-gray-300"
                           />
                           Monochrome
                       </label>
                   </div>
                   {!showUpdateForm && (
                   <div className="flex mt-10 justify-end">
                       <button type="submit" className="p-2 link rounded-lg w-44 text-white bg-slate-800">
                           Enregistrer
                       </button>
                       <button type="button" onClick={() => setShowForm(false)}  className=" rounded-lg ml-2 p-2 w-44 link text-slate-800 bg-amber-100 ">
                           Annuler
                       </button>
                </div>)}
                   </form>
)}      
{showForm && (
  <>{showUpdateForm && (
    <>
        <h1 className="mt-4 text-xl font-bold text-blue-950">Calcul des prix</h1>
        <form
            onSubmit={handleSubmitOne}
            className="flex flex-wrap mb-4 bg-white p-6 rounded-lg shadow-md text-gray-700 mt-6 gap-4"
        >
            {/* Radios */}
            <div className="flex flex-col sm:flex-row mb-4">
                <label className="flex items-center mr-4">
                    <input
                        type="radio"
                        name="option"
                        value="importation"
                        checked={newconsomable.option === "importation"}
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
                        checked={newconsomable.option === "achat_local"}
                        onChange={handleInputChange}
                        className="mr-2 accent-gray-600"
                    />
                    Achat Local
                </label>
            </div>

            {/* Input fields */}
            <div className="flex flex-wrap gap-4">
                <input
                    type="number"
                    name="prix"
                    placeholder="Prix d'achat"
                    value={newconsomable.prix}
                    onChange={handleInputChange}
                    className="p-2 w-full sm:w-1/2 lg:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <input
                    type="text"
                    name="taux"
                    placeholder="Taux Change"
                    value={newconsomable.taux}
                    onChange={handleInputChange}
                    className="p-2 w-full sm:w-1/2 lg:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <input
                    type="number"
                    name="cout"
                    placeholder="Cout d'achat"
                    value={newconsomable.cout}
                    onChange={handleInputChange}
                    className="p-2 w-full sm:w-1/2 lg:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <input
                    type="number"
                    name="frais"
                    placeholder="Frais d'approche"
                    value={newconsomable.frais}
                    onChange={handleInputChange}
                    className="p-2 w-full sm:w-1/2 lg:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <input
                    type="number"
                    name="duree"
                    placeholder="Durée de vie"
                    value={newconsomable.duree}
                    onChange={handleInputChange}
                    className="p-2 w-full sm:w-1/2 lg:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <div className="p-2 w-full sm:w-1/2 lg:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12">
                    <h5 className="text-sm">Cout/page</h5>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-end mt-10">
                <button
                    type="submit"
                    className="link p-2 rounded-lg w-full sm:w-44 text-white bg-slate-800"
                >
                    Enregistrer
                </button>
                <button
                    type="button"
                    onClick={() => setShowUpdateForm(false)}
                    className="link p-2 rounded-lg w-full sm:w-44 text-slate-800 bg-amber-100"
                >
                    Annuler
                </button>
            </div>
        </form>
    </>
)}
</>)}
                    {showForm && (
                        <>
                   {!showUpdateForm && (
                    <div className="flex justify-between items-center mt-8">
   {/* <Link to='/Consommables' className=' text-2xl hover:text-gray-700'>
        Consommables
    </Link>*/}
     <h2 className="text-xl font-bold text-blue-950 m-4"> Mise à jour des prix</h2>

    <button
         onClick={handleUpdateClick}
        className="p-2 w-52 link rounded-lg mb-2 bg-slate-800 text-white "
    >
       Mettre à jour les prix
    </button>
</div>)}</>)}
             

                   
{/*

    {equipmentList.length > 0 && (
                   
                 )}
           
          */}
           {showForm && (
                        <>
           {!showUpdateForm && (
            <div className="p-4 md:p-6 overflow-x-auto">
<table className="min-w-full bg-slate-800 border border-gray-300 mt-14 shadow-lg">
                    <thead>
  <tr>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Référence</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Désignation</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Type d'achat</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix d'achat</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Taux de change</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Prix d'achat</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Frais d'approche</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Durée de vie</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Cout d'achat</th>
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Date</th>
      {/*
    <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">action</th>
    */}
  </tr>
</thead>
<tbody>
  {consomableData.map((equipment, index) => (
    <tr key={index} >
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.reference}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.designation}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.option}</td>
      <td className="px-4 py-2 text-gray-500  border border-gray-300  bg-white">{equipment.prix}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.taux}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.prix}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.frais}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.duree}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.cout}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300 bg-white">
           {moment(equipment.addedDate).format('DD/MM/YYYY')}
        </td>
        {/*
        <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white"><button onClick={() => handleDelete(index)} className='bg-red-400 text-white p-2'><FaTimes/></button></td>*/
}
       
    </tr>
  ))}
</tbody>

                   </table>
                   </div>
            )}
            </>)}
        </div>
           
    );
};

export default Consommables;
