import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";
  import './dashbord.css'
const Options = () => {
    const [OptionData, setOptionData] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showForm ,setShowForm] =useState(false)
    const [referenceFilter, setReferenceFilter] = useState('');
    const [designationFilter, setDesignationFilter] = useState('');
    const [newOption, setNewOption] = useState({
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
    const [editedOption, setEditedOption] = useState({
        reference: '',
        designation: '',
        affect: '',
        price: '',
        Option: '', 
        cout: '',   
    });
      const [OptionList, setOptionList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('OptionData')) || [];
        setOptionData(storedData);
    }, []);

    useEffect(() => {
        if (OptionData.length > 0) {
            localStorage.setItem('OptionData', JSON.stringify(OptionData));
        }
    }, [OptionData]);

    const handleColorChange = () => {
        setIsColorChecked(!isColorChecked);
    };

    const handleMonochromeChange = () => {
        setIsMonochromeChecked(!isMonochromeChecked);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOption({ ...newOption, [name]: value });
    };
    
    const handleSubmitOne = (event) => {
        event.preventDefault();
        setOptionData((prev) => [...prev, newOption]);
        setNewOption({
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
        const updatedList = OptionData.filter((_, i) => i !== index);
        setOptionData(updatedList);
        localStorage.setItem('OptionData', JSON.stringify(updatedList));
    };

    const handleUpdateClick = () => {
        setShowUpdateForm(true);
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
        <div className="mt-14 shadow-xl  font-medium bg-gray-100  sm:p-8 sm:pt-4 m-10 rounded-lg">
             <div className="flex justify-between items-center mb-10 p-4 ">
            
             <Link to='/Consommables' className=' text-2xl  font-bold text-blue-950'>
       Options
    </Link>
             
    
 <button
   onClick={handleBack}
     className="p-2 m-4  sm:w-32 link rounded-lg text-white bg-yellow-800 "
 >
     Retour
 </button>
</div>
{showForm && (
  <>
    {showUpdateForm && (
      <div className="text-end mr-10">
       
      </div>
    )}

    {showUpdateForm && (
      <>
        <h1 className="mt-10 text-xl text-blue-950 font-bold">Nouvelle Option</h1>
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
                         <button onClick={{}} className="link ml-2 p-2 w-32 rounded-lg text-white bg-slate-800  ">
                          Rechercher
                        </button>
                        <button onClick={handleCancelFilter} className="link ml-2  w-32 p-2 rounded-lg text-slate-800 bg-amber-100 ">
                            Annuler
                        </button>
                       
                        <button onClick={handleConsommable} className="link ml-auto w-52 p-2 rounded-lg text-white bg-slate-800 ">
                            Nouvelle Option
                        </button>
                    </div>
<h1 className='text-xl text-blue-950 font-bold mt-10 ml-4'>Liste des Options</h1>



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
  {OptionData.map((equipment, index) => (
    <tr key={index} >
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.reference}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.designation}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.affect}</td>
      <td className="px-4 py-2 text-gray-500  border border-gray-300  bg-white">{equipment.price}</td>
      
       
        <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">
        <div className="flex justify-center items-center">
            <button onClick={() => handleDelete(index)} className='bg-slate-800 rounded text-amber-100 p-2 link '><FaTimes/>
            </button>
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
                           value={newOption.reference}
                           onChange={handleInputChange}
                          className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="text"
                           name="designation"
                           placeholder="Désignation"
                           value={newOption.designation}
                           onChange={handleInputChange}
                          className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="number"
                           name="price"
                           placeholder="Prix public"
                           value={newOption.price}
                           onChange={handleInputChange}
                          className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       <input
                           type="text"
                           name="affect"
                           placeholder="Affectation"
                           value={newOption.affect}
                           onChange={handleInputChange}
                          className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                           required
                       />
                       
                   </div>
                   {!showUpdateForm && (
                   <div className="flex mt-10 justify-end">
                       <button type="submit"  className="p-2 link rounded-lg w-44 text-white bg-slate-800 ">
                           Enregistrer
                       </button>
                       <button type="button" onClick={() => setShowForm(false)} className="ml-2 p-2  rounded-lg link w-44 text-slate-800 bg-amber-100 ">
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
            className="flex flex-col md:flex-row flex-wrap bg-white p-6 rounded-lg shadow-md text-gray-700 items-center mt-6 gap-6"
        >
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="option"
                        value="importation"
                        checked={newOption.option === "importation"}
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
                        checked={newOption.option === "achat_local"}
                        onChange={handleInputChange}
                        className="mr-2 accent-gray-600"
                    />
                    Achat Local
                </label>
            </div>

            <div className="flex flex-wrap gap-4 w-full">
                <input
                    type="number"
                    name="prix"
                    placeholder="Prix d'achat"
                    value={newOption.prix}
                    onChange={handleInputChange}
                    className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <input
                    type="text"
                    name="taux"
                    placeholder="Taux Change"
                    value={newOption.taux}
                    onChange={handleInputChange}
                    className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <input
                    type="number"
                    name="cout"
                    placeholder="Cout d'achat"
                    value={newOption.cout}
                    onChange={handleInputChange}
                    className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <input
                    type="number"
                    name="frais"
                    placeholder="Frais d'approche"
                    value={newOption.frais}
                    onChange={handleInputChange}
                    className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <input
                    type="number"
                    name="duree"
                    placeholder="Durée de vie"
                    value={newOption.duree}
                    onChange={handleInputChange}
                    className="p-2 w-full md:w-1/4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm shadow-sm h-12"
                    required
                />
                <div className="p-2 w-full md:w-1/4 flex items-center justify-center rounded-lg border border-gray-300 text-gray-900 text-sm shadow-sm h-12">
                    <h5 className="text-sm">Cout/page</h5>
                </div>
            </div>

            <div className="flex flex-wrap justify-end gap-4 mt-6 w-full">
                <button
                    type="submit"
                    className="p-2 link rounded-lg w-full md:w-44 text-white bg-slate-800"
                >
                    Enregistrer
                </button>
                <button
                    type="button"
                    onClick={() => setShowUpdateForm(false)}
                    className="p-2 link rounded-lg w-full md:w-44 text-slate-800 bg-amber-100"
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
     <h2 className="text-xl font-bold   text-blue-950 m-4"> Mise à jour des prix</h2>

    <button
         onClick={handleUpdateClick}
        className="p-2 w-52  link rounded-lg mb-2 bg-slate-800 text-white "
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
  {OptionData.map((equipment, index) => (
    <tr key={index} >
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.reference}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.designation}</td>
      <td className="px-4 py-2 text-gray-500 border border-gray-300  bg-white">{equipment.Option}</td>
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

export default Options;
