import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";
import './dashbord.css'
const  Pieces = () => {
    const [pieceData, setpieceData] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showForm ,setShowForm] =useState(false)
    const [referenceFilter, setReferenceFilter] = useState('');
    const [designationFilter, setDesignationFilter] = useState('');
    const [newpiece, setNewpiece] = useState({
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
    const [editedpiece, setEditedpiece] = useState({
        reference: '',
        designation: '',
        affect: '',
        price: '',
        option: '', 
        cout: '',   
    });
      const [pieceList, setpieceList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('pieceData')) || [];
        setpieceData(storedData);
    }, []);

    useEffect(() => {
        if (pieceData.length > 0) {
            localStorage.setItem('pieceData', JSON.stringify(pieceData));
        }
    }, [pieceData]);

    const handleColorChange = () => {
        setIsColorChecked(!isColorChecked);
    };

    const handleMonochromeChange = () => {
        setIsMonochromeChecked(!isMonochromeChecked);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewpiece({ ...newpiece, [name]: value });
    };

    const handleSubmitOne = (event) => {
        event.preventDefault();
        setpieceData((prev) => [...prev, newpiece]);
        setNewpiece({
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
        const updatedList = pieceData.filter((_, i) => i !== index);
        setpieceData(updatedList);
        localStorage.setItem('pieceData', JSON.stringify(updatedList));
    };

    const handleUpdateClick = () => {
        setShowUpdateForm(true);
    };


    const handleGoBack = () => {
        navigate(-1)
    };
    const handleAddList =()=>{
        const updatedList = [...pieceList, editedpiece];
        setpieceList(updatedList);
    
        // Sauvegarde dans localStorage
        localStorage.setItem("pieceList", JSON.stringify(updatedList));
    
        // Réinitialise les champs du formulaire
        setEditedpiece({  reference: '',
            designation: '',
            affect: '',
            price: 0,
            option: '', // Ajouté pour gérer l'option (radio buttons)
            cout: '',   });
       }
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
        <div className="mt-14 shadow-xl  m-10  sm:p-8 sm:pt-4  rounded-lg font-medium bg-gray-100 ">
             <div className="flex justify-between items-center mb-10 p-4 ">
            
             <Link to='/Consommables' className=' text-2xl  font-bold text-blue-950'>
             Pièces détachées
    </Link>
             
    
 <button
   onClick={handleBack}
     className="p-2 m-4  sm:w-32  rounded-lg link text-white bg-yellow-800 "
 >
     Retour
 </button>
</div>
{showForm && (
  <>
    {!showUpdateForm && (
      <div className="text-end mr-10">
        <Link to="/Pieces" className="text-xl font-bold text-blue-950">
     
        </Link>
      </div>
    
)}
    {showUpdateForm && (
      <>
        <h1 className="mt-10 text-xl font-bold text-blue-950">Nouvelle  Pièce détachée</h1>
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
                         <button onClick={{}} className="link ml-2 p-2 rounded-lg w-32 text-white bg-slate-800 ">
                          Rechercher
                        </button>
                        <button onClick={handleCancelFilter} className=" link ml-2 p-2 rounded-lg w-32 text-slate-800 bg-amber-100 ">
                            Annuler
                        </button>
                       
                        <button onClick={handleConsommable} className="link ml-auto rounded-lg  w-52 p-2 text-white bg-slate-800 ">
                            Nouvelle Pièce détachée
                        </button>
                    </div>
<h1 className='text-xl text-blue-950 font-bold mt-10 ml-4'>Liste  Pièces détachées</h1>


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
  {pieceData.map((equipment, index) => (
    <tr key={index} >
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.reference}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.designation}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.affect}</td>
      <td className="px-4 py-2 text-gray-500  border border-gray-300  bg-white">{equipment.price}</td>
      
       
        <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">
        <div className="flex justify-center items-center">
            <button onClick={() => handleDelete(index)} className='bg-slate-800  text-amber-100 p-2 rounded link'><FaTimes/></button>
            </div>
            </td>
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
                           value={newpiece.reference}
                           onChange={handleInputChange}
                           className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="text"
                           name="designation"
                           placeholder="Désignation"
                           value={newpiece.designation}
                           onChange={handleInputChange}
                           className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="number"
                           name="price"
                           placeholder="Prix public"
                           value={newpiece.price}
                           onChange={handleInputChange}
                           className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="text"
                           name="affect"
                           placeholder="Affectation"
                           value={newpiece.affect}
                           onChange={handleInputChange}
                           className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       
                   </div>
                   {!showUpdateForm && (
                   <div className="flex mt-10 justify-end">
                       <button type="submit" className="p-2 rounded-lg link w-44 text-white bg-slate-800 ">
                           Enregistrer
                       </button>
                       <button type="button" onClick={() => setShowForm(false)}  className="rounded-lg w-44 ml-2 p-2 link text-slate-800 bg-amber-100 ">
                           Annuler
                       </button>
                </div>)}
                   </form>
)}      
{showForm && (
  <>
  {showUpdateForm && (
  <>
    <h1 className="mt-4 text-xl font-bold text-blue-950">Calcul des prix</h1>
    <form
      onSubmit={handleSubmitOne}
      className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md text-gray-700 mt-6"
    >
      {/* Radio Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="importation"
            checked={newpiece.option === "importation"}
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
            checked={newpiece.option === "achat_local"}
            onChange={handleInputChange}
            className="mr-2 accent-gray-600"
          />
          Achat Local
        </label>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="number"
          name="prix"
          placeholder="Prix d'achat"
          value={newpiece.prix}
          onChange={handleInputChange}
          className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
          required
        />
        <input
          type="text"
          name="taux"
          placeholder="Taux Change"
          value={newpiece.taux}
          onChange={handleInputChange}
          className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
          required
        />
        <input
          type="number"
          name="cout"
          placeholder="Cout d'achat"
          value={newpiece.cout}
          onChange={handleInputChange}
          className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
          required
        />
        <input
          type="number"
          name="frais"
          placeholder="Frais d'approche"
          value={newpiece.frais}
          onChange={handleInputChange}
          className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
          required
        />
        <input
          type="number"
          name="duree"
          placeholder="Durée de vie"
          value={newpiece.duree}
          onChange={handleInputChange}
          className="p-2 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
          required
        />
        <div className="flex items-center justify-center w-full h-12 rounded-lg border border-gray-300 bg-gray-100 text-gray-900 text-sm shadow-sm">
          <h5 className="text-center">Cout/page</h5>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-end">
        <button
          type="submit"
          className="p-2 rounded-lg w-full sm:w-auto text-white bg-slate-800"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={() => setShowUpdateForm(false)}
          className="rounded-lg p-2 w-full sm:w-auto text-slate-800 bg-amber-100"
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
        className="p-2 w-52 mb-2 rounded-lg link  bg-slate-800 text-white "
    >
       Mettre à jour les prix
    </button>
</div>)}</>)}
             

                   
{/*

    {pieceList.length > 0 && (
                   
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
  {pieceData.map((equipment, index) => (
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

export default Pieces;
