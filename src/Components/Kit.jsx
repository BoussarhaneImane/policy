import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";
  
const  Kit = () => {
    const [kitData, setkitData] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showForm ,setShowForm] =useState(false)
    const [referenceFilter, setReferenceFilter] = useState('');
    const [designationFilter, setDesignationFilter] = useState('');
    const [newkit, setNewkit] = useState({
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
    const [editedkit, setEditedkit] = useState({
        reference: '',
        designation: '',
        affect: '',
        price: '',
        option: '', 
        cout: '',   
    });
      const [kitList, setkitList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('kitData')) || [];
        setkitData(storedData);
    }, []);

    useEffect(() => {
        if (kitData.length > 0) {
            localStorage.setItem('kitData', JSON.stringify(kitData));
        }
    }, [kitData]);

    const handleColorChange = () => {
        setIsColorChecked(!isColorChecked);
    };

    const handleMonochromeChange = () => {
        setIsMonochromeChecked(!isMonochromeChecked);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewkit({ ...newkit, [name]: value });
    };

    const handleSubmitOne = (event) => {
        event.preventDefault();
        setkitData((prev) => [...prev, newkit]);
        setNewkit({
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
        const updatedList = kitData.filter((_, i) => i !== index);
        setkitData(updatedList);
        localStorage.setItem('kitData', JSON.stringify(updatedList));
    };

    const handleUpdateClick = () => {
        setShowUpdateForm(true);
    };


    const handleGoBack = () => {
        navigate(-1)
    };
    const handleAddList =()=>{
        const updatedList = [...kitList, editedkit];
        setkitList(updatedList);
    
        // Sauvegarde dans localStorage
        localStorage.setItem("kitList", JSON.stringify(updatedList));
    
        // Réinitialise les champs du formulaire
        setEditedkit({  reference: '',
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
   useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation en millisecondes (par exemple, 1000ms = 1s)
      easing: 'ease-in-out', // Type de transition d'animation
      once: true, // Si true, l'animation ne se déclenche qu'une seule fois
    });
  }, []);  
    return (
        <div className="mt-14 shadow-xl p-8 font-medium bg-gray-100 m-20 rounded-xl">
             <div className="flex justify-between items-center mb-10 p-4 ">
            
             <Link to='/Consommables' className=' text-2xl  font-bold text-blue-950'>
             Kit de nettoyage
    </Link>
             
    
 <button
   onClick={handleGoBack}
     className="p-2 w-32  rounded-xl link bg-amber-900 text-white "
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
        <h1 className="mt-10 text-xl font-bold text-blue-950">Ajouter Kit de nettoyage</h1>
      </>
    )}
  </>
)}


{!showForm &&(
    <>
<div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Référence"
                            value={referenceFilter}
                            onChange={handleReferenceFilterChange}
                            className="p-2 border  rounded-xl border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  w-1/4"
                        />
                        <input
                            type="text"
                            placeholder="Désignation"
                            value={designationFilter}
                            onChange={handleDesignationFilterChange}
                            className="p-2 border  rounded-xl border-gray-900 text-gray-900 placeholder:text-gray-900 text-sm shadow  w-1/4 ml-2"
                        />
                         <button onClick={{}} className="ml-2 p-2 link  rounded-xl w-32 text-white bg-slate-800 ">
                          Rechercher
                        </button>
                        <button onClick={handleCancelFilter} className="ml-2 p-2 link  rounded-xl w-32 text-white bg-amber-900 ">
                            Annuler
                        </button>
                       
                        <button onClick={handleConsommable} className="ml-auto link  rounded-xl w-52 p-2 text-white bg-slate-800 ">
                        Ajouter Kit de nettoyage
                        </button>
                    </div>
<h1 className='text-xl text-blue-950 font-bold mt-10 ml-4'>Liste des Kit de nettoyage</h1>



<table  data-aos="fade-up"  className="min-w-full p-2 mt-8 shadow-lg">
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
  {kitData.map((equipment, index) => (
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

</>
)}
{showForm && (
<form onSubmit={handleSubmitOne} className="mb-4 p-4">
                   
                   <div className="flex  mb-4 ">
                       <input
                           type="text"
                           name="reference"
                           placeholder="Référence"
                           value={newkit.reference}
                           onChange={handleInputChange}
                           className="p-2 mt-2 border  rounded-xl border-gray-900 text-gray-900 text-sm shadow  flex-1 mr-2 h-12 placeholder:text-gray-950"
                           required
                       />
                       <input
                           type="text"
                           name="designation"
                           placeholder="Désignation"
                           value={newkit.designation}
                           onChange={handleInputChange}
                           className="p-2 mt-2 border  rounded-xl border-gray-900 text-gray-900 text-sm shadow  flex-1 mr-2 h-12 placeholder:text-gray-950"
                           required
                       />
                       <input
                           type="number"
                           name="price"
                           placeholder="Prix public"
                           value={newkit.price}
                           onChange={handleInputChange}
                           className="p-2 mt-2 border  rounded-xl border-gray-900 text-gray-900 text-sm shadow  flex-1 mr-2 h-12 placeholder:text-gray-950"
                           required
                       />
                       <input
                           type="text"
                           name="affect"
                           placeholder="Affectation"
                           value={newkit.affect}
                           onChange={handleInputChange}
                           className="p-2 mt-2 border  rounded-xl border-gray-900 text-gray-900 text-sm shadow  flex-1 mr-2 h-12 placeholder:text-gray-950"
                           required
                       />
                       
                   </div>
                   {!showUpdateForm && (
                   <div className="flex mt-10 justify-end">
                       <button type="submit" className="p-2  rounded-xl w-44 link text-white bg-slate-800 ">
                           Enregistrer
                       </button>
                       <button type="button" onClick={() => setShowForm(false)}  className=" rounded-xl w-44 ml-2 p-2 link  text-white bg-amber-900 ">
                           Annuler
                       </button>
                </div>)}
                   </form>
)}    
           

 
        </div>
           
    );
};

export default Kit;
