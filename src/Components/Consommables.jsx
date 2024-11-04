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
   useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation en millisecondes (par exemple, 1000ms = 1s)
      easing: 'ease-in-out', // Type de transition d'animation
      once: true, // Si true, l'animation ne se déclenche qu'une seule fois
    });
  }, []);
    return (
        <div className="mt-14 shadow-xl p-8 font-medium bg-gray-100 m-20 rounded-xl" >
             <div className="flex justify-between items-center mb-10  ">
            
             <Link to='/Consommables' className=' text-xl  font-bold text-blue-950'>
        Consommables
    </Link>
             
    
 <button
   onClick={handleGoBack}
     className="p-2 w-32 rounded-xl link bg-amber-900 text-white "
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
<div className="flex mb-4">
                        <input
                            type="text"
                            placeholder=" Référence"
                            value={referenceFilter}
                            onChange={handleReferenceFilterChange}
                            className="p-2 rounded-xl border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  w-1/4"
                        />
                        <input
                            type="text"
                            placeholder=" Désignation"
                            value={designationFilter}
                            onChange={handleDesignationFilterChange}
                            className="p-2 rounded-xl border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  w-1/4 ml-2"
                        />
                         <button onClick={{}} className="link ml-2 p-2 rounded-xl w-32 text-white bg-slate-800 ">
                          Rechercher
                        </button>
                        <button onClick={handleCancelFilter} className="link rounded-xl w-32 ml-2 p-2 text-white bg-amber-900">
                            Annuler
                        </button>
                       
                        <button onClick={handleConsommable} className="link ml-auto rounded-xl w-52 p-2 text-white bg-slate-800">
                            Nouveau Consommable
                        </button>
                    </div>
<h1 className='text-xl text-blue-950 font-bold mt-10'>Liste des Consommables</h1>



<table data-aos="fade-up"  className="min-w-full p-2 mt-8">
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

</>
)}
{showForm && (
<form onSubmit={handleSubmitOne} className="mb-4 p-4">
                   
                   <div className="flex  mb-4 ">
                       <input
                           type="text"
                           name="reference"
                           placeholder="Référence"
                           value={newconsomable.reference}
                           onChange={handleInputChange}
                           className="p-2 rounded-xl mt-2 border border-gray-900 text-gray-900 text-sm shadow  flex-1 mr-2 h-12 placeholder:text-gray-950"
                           required
                       />
                       <input
                           type="text"
                           name="designation"
                           placeholder="Désignation"
                           value={newconsomable.designation}
                           onChange={handleInputChange}
                           className="p-2 rounded-xl mt-2 border border-gray-900 text-gray-900 text-sm shadow  flex-1 mr-2 h-12 placeholder:text-gray-950"
                           required
                       />
                       <input
                           type="number"
                           name="price"
                           placeholder="Prix public"
                           value={newconsomable.price}
                           onChange={handleInputChange}
                           className="p-2 mt-2 rounded-xl border border-gray-900 text-gray-900 text-sm shadow  flex-1 mr-2 h-12 placeholder:text-gray-950"
                           required
                       />
                       <input
                           type="text"
                           name="affect"
                           placeholder="Affectation"
                           value={newconsomable.affect}
                           onChange={handleInputChange}
                           className="p-2 mt-2 rounded-xl border border-gray-900 text-gray-900 text-sm shadow  flex-1 mr-2 h-12 placeholder:text-gray-950"
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
                       <button type="submit" className="p-2 link rounded-xl w-44 text-white bg-slate-800">
                           Enregistrer
                       </button>
                       <button type="button" onClick={() => setShowForm(false)}  className=" rounded-xl ml-2 p-2 w-44 link text-white bg-amber-900 ">
                           Annuler
                       </button>
                </div>)}
                   </form>
)}      
{showForm && (
  <>
{showUpdateForm && (
    <>
    <h1 className='mt-4 text-xl font-bold text-blue-950'>Calcul des prix</h1>
                        <form onSubmit={handleSubmitOne} className='p-4' >
              <h3 className="font-bold  text-xl mb-4 mt-8"></h3>
                    
                    <div className="flex items-center mb-4">
                        <label className="flex items-center mr-4">
                            <input
                                type="radio"
                                name="option"
                                value="importation"
                                checked={newconsomable.option=== "importation"}
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

                    <div className="flex mb-4">
                 
                    <input
                  type="number"
                 name="prix"
                  placeholder="Prix d'achat"
                  value={newconsomable.prix}
                  onChange={handleInputChange}
                 className="p-2 rounded-xl mt-2 border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
                 required
/>
                  <input
                  type="text"
                 name="taux"
                  placeholder="Taux Change"
                  value={newconsomable.taux}
                  onChange={handleInputChange}
                 className="p-2 rounded-xl mt-2 border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
                 required
/>
        
                  <input
                  type="number"
                 name="cout"
                  placeholder="Cout d'achat"
                  value={newconsomable.cout}
                  onChange={handleInputChange}
                 className="p-2 mt-2 rounded-xl border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
                 required
/>
<input
                  type="number"
                 name="frais"
                  placeholder="Frais d'approche"
                  value={newconsomable.frais}
                  onChange={handleInputChange}
                 className="p-2 mt-2 rounded-xl border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
                 required
/>

<input
                  type="number"
                 name="duree"
                  placeholder="Durée de vie"
                  value={newconsomable.duree}
                  onChange={handleInputChange}
                 className="p-2 mt-2 rounded-xl border border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  flex-1 mr-2 h-12"
                 required
/>

 
                  <div className="flex-1 p-3 rounded-xl m-2 bg-white  border border-black shadow text-left">
                      <h5 className="text-sm">Cout/page</h5>
                  </div>
                 
              </div>
          
             {/* <div className="flex mt-10 justify-end">
                        <button type="submit" className="p-2 text-white bg-teal-600 ">
                            Enregistrer
                        </button>
                        <button type="button"  onClick={() => setShowUpdateForm(false)} className="ml-2 p-2 w-24 text-white bg-teal-600 ">
                            Annuler
                        </button>
                 </div>*/}
                      <div className="flex mt-10 justify-end">
                      <button type="submit" onClick={() => setShowUpdateForm(false)} className="link p-2 rounded-xl w-44 text-white bg-slate-800">
                           Enregistrer
                       </button>
                       <button type="button" onClick={() => setShowUpdateForm(false)}  className="link  rounded-xl ml-2 p-2  w-44 text-white bg-amber-900">
                           Annuler
                       </button>
                       </div>
                 </form>
               

                    </>
)}</>)}
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
        className="p-2 w-52 link rounded-xl mb-2 bg-slate-800 text-white "
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
                    <table data-aos="fade-up" className="min-w-full p-2 mb-4">
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
            )}
            </>)}
        </div>
           
    );
};

export default Consommables;
