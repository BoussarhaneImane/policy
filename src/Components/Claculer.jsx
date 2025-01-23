import React, { useState } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
function Claculer() {
  const [showInputEquipement, setShowInputEquipement] = useState({
    prixEquipement: false,
    amortissementMonoEquipement: false,
    amortissementMonoPage: false,
    amortissementCouleurEquipement: false,
    amortissementCouleurPage: false,
  });

  const [showInputService, setShowInputService] = useState({
    totalProvisionMO: false,
    totalProvisionPieces: false,
    coutMensuelService: false,
    amortissementMonoService: false,
    amortissementServiceMonoPage: false,
    amortissementCouleurService: false,
    amortissementServiceCouleurPage: false,
  });

  const [showService, setShowService] = useState(false); // État pour gérer l'affichage de la section Service
const [showInputConsommables, setshowInputConsommables] =useState({
  pageMonochrome:false,
  pageMonochrome2:false,
  pageMonochrome3:false

})
const [showInputLoyer, setshowInputLoyer] =useState({
  pageLoyer:false,
  pageLoyer2:false,
  pageLoyer3:false

})
const [showLoyer, setshowLoyer] =useState(false)
const [showConsommables, setshowConsommables] = useState(false);
const [selectedOption, setSelectedOption] = useState('');
const [showSecondTable, setShowSecondTable] = useState(false);
const [showEquipement,setshowEquipement]= useState(false);
  const toggleInputEquipement = (inputName) => {
    setShowInputEquipement((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  const toggleInputService = (inputName) => {
    setShowInputService((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };
  const toggleInputConsomables= (inputName) => {
    setshowInputConsommables((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  const toggleInputLoyer= (inputName) => {
    setshowInputLoyer((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const toggleSecondTable = () => {
    setShowSecondTable((prev) => !prev);
  };

  const handleShowService = () => {
    setShowService((prev) => !prev); // Afficher ou cacher la section Service
    setShowInputEquipement({ // Cacher la section Équipements
      prixEquipement: false,
      amortissementMonoEquipement: false,
      amortissementMonoPage: false,
      amortissementCouleurEquipement: false,
      amortissementCouleurPage: false,
    });
  };
  const handleShowLoyer = () => {
    setshowLoyer((prev) => !prev); // Afficher ou cacher la section Consommables
    setShowInputEquipement({
      prixEquipement: false,
      amortissementMonoEquipement: false,
      amortissementMonoPage: false,
      amortissementCouleurEquipement: false,
      amortissementCouleurPage: false,
    });
  };
  const handleShowConsommables = () => {
    setshowConsommables((prev) => !prev); // Afficher ou cacher la section Consommables
    setShowInputEquipement({
      prixEquipement: false,
      amortissementMonoEquipement: false,
      amortissementMonoPage: false,
      amortissementCouleurEquipement: false,
      amortissementCouleurPage: false,
    });
  };
  const handleShowEquipment = ()=>{
    setshowEquipement((prev) => !prev); // Afficher ou cacher la section Consommables
    setShowInputEquipement({
      prixEquipement: false,
      amortissementMonoEquipement: false,
      amortissementMonoPage: false,
      amortissementCouleurEquipement: false,
      amortissementCouleurPage: false,
    });

  }
  return (
    <div className="p-6 bg-white rounded-xl shadow">


      
      {/* Separator */}
      <hr className="my-6" />

      {/* Button to toggle the Service section */}
      <div className="flex flex-wrap gap-1 mt-4 sm:mt-8 md:mt-16 justify-center sm:justify-start">
      <button 
          onClick={handleShowEquipment} 
          className="mb-4 text-sm p-2 bg-cyan-900 shadow-xl text-white rounded-lg"
        >
          {showEquipement ? "Cacher equipement" : "Détails equipement"}
        </button>
        <button 
          onClick={handleShowService} 
          className="mb-4  ml-6 text-sm p-2 bg-cyan-900 shadow-xl text-white rounded-lg"
        >
          {showService ? "Cacher service" : "Détails service"}
        </button>

        <button 
          onClick={handleShowConsommables} 
          className="mb-4 ml-6 text-sm p-2 bg-cyan-900 shadow-xl text-white rounded-lg"
        >
          {showConsommables ? "Cacher consommables" : "Détails consommables"}
        </button>
        
        <button 
          onClick={handleShowLoyer} 
          className="mb-4 ml-6 text-sm p-2 bg-teal-700  text-white shadow-lg rounded-lg"
        >
          {showLoyer ? "Cacher Loyer cible" : "Voir Loyer cible"}
        </button>
        <button 
        onClick={toggleSecondTable}
        className="mb-4 w-48 ml-6 text-sm p-3 bg-teal-600  text-white shadow-lg rounded-lg"
      >
       {showSecondTable ? "Cacher Modes de facturation " : "Modes de facturation"}
      </button>
      </div>
      {showEquipement && (
        <>
         <hr className="my-6" />
      <h2 className="text-blue-950 font-medium text-xl mb-4">Équipements</h2>

      <div className="flex flex-wrap space-x-6 text-sm">
        {/* Prix de revient équipement */}
        <div className="flex flex-col items-center">
          <label
            className="text-blue-950 text-xs font-medium cursor-pointer"
        
          >
            Prix de revient équipement
          </label>
        
            <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
              10
            </button>
        
        </div>

        {/* Amortissement monochrome de l'équipement */}
        <div className="flex flex-col items-center">
          <label
            className="text-blue-950  text-xs font-medium cursor-pointer"
           
          >
            Amortissement monochrome
          </label>
        
            <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
              10
            </button>
      
        </div>

        {/* Amortissement équipement / page monochrome */}
        <div className="flex flex-col items-center">
          <label
            className="text-blue-950  text-xs font-medium cursor-pointer"
          
          >
            Amortissement / page monochrome
          </label>
          <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
              10
            </button>
     
        </div>

        {/* Amortissement couleur de l'équipement */}
        <div className="flex flex-col items-center">
          <label
            className="text-blue-950  text-xs font-medium cursor-pointer"
         
          >
            Amortissement couleur
          </label>
      
            <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
              10
            </button>
      
        </div>

        {/* Amortissement équipement / page couleur */}
        <div className="flex flex-col items-center">
          <label
            className="text-blue-950  text-xs font-medium cursor-pointer"
         
          >
            Amortissement / page couleur
          </label>
          
            <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
              10
            </button>
      
        </div>
        
      </div>
      
</>)}

      {showService && (
        <>
         <hr className="my-6" />
          <h2 className="text-blue-950 font-medium text-xl mb-4">Service</h2>
          {/* Container for Service Labels and Buttons */}
          <div className="flex flex-wrap space-x-6 text-sm">
            {/* Total provision main d'œuvre */}
            <div className="flex flex-col items-center">
              <label
                className="text-blue-950  font-medium text-xs cursor-pointer"
              
              >
                Total provision main d'œuvre
              </label>
            
                <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                 10.00
                </button>
            
            </div>

            {/* Total provision pièces */}
            <div className="flex flex-col items-center">
              <label
                className="text-blue-950 font-medium text-xs cursor-pointer"
               
              >
                Total provision pièces
              </label>
             
                <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                  20.00
                </button>
             
            </div>

            {/* Coût mensuel du service */}
            <div className="flex flex-col items-center">
              <label
                className="text-blue-950 font-medium text-xs cursor-pointer"
                
              >
                Coût mensuel du service
              </label>
            
                <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                 0.36
                </button>
           
            </div>

            {/* Amortissement monochrome du service */}
            <div className="flex flex-col items-center">
              <label
                className="text-blue-950 font-medium text-xs cursor-pointer"
                
              >
                Amortissement monochrome
              </label>
            
                <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                  0.14
                </button>
              
            </div>

            <div className="flex flex-col items-center">
              <label
                className="text-blue-950 font-medium text-xs cursor-pointer"
              
              >
                Amortissement / page monochrome
              </label>
      <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                  0.000
                </button>
          
            </div>
            

          
          </div>
          <br></br>

          {/* Amortissement service / page couleur */}
          <div className="flex flex-wrap space-x-6 text-sm">

{/* Amortissement service / page monochrome */}
              {/* Amortissement couleur du service */}
              <div className="flex flex-col items-center">
              <label
                className="text-blue-950 font-medium text-xs cursor-pointer"
              
              >
                Amortissement couleur
              </label>
              
                <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                  0.48
                </button>
            
            </div>
            <div className="flex flex-col items-center">
            <label
              className="text-blue-950 font-medium text-xs cursor-pointer"
             
            >
              Amortissement / page couleur
            </label>
          
              <button className="mt-2 w-52  shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                0.000
              </button>
              </div>
          </div>
        </>
      )}
    
      {showConsommables && (
        <>
        <hr className="my-6" />
         <h2 className="text-blue-950 font-medium text-xl mb-4 ">Consommables</h2>
          <div className="flex flex-wrap space-x-6 text-sm">
         
          {/* Container for Consommables Labels and Buttons */}
          <div className="flex flex-col items-center">
            <label
              className="text-blue-950 text-xs font-medium cursor-pointer"
             
            >
             Coût théorique /page monochrome
            </label>
          
              <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                0.000
              </button>
       
          </div>
          <div className="flex flex-col items-center">
            <label
              className="text-blue-950 text-xs font-medium cursor-pointer"
          
            >
            Coût théorique/page couleur
            </label>
          
              <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
                0.000
              </button>
           
          </div>
          <div className="flex flex-col items-center">
            <label
              className="text-blue-950 text-xs font-medium cursor-pointer"
              onClick={() => toggleInputConsomables('pageMonochrome3')}
            >
         Consommables couleur/page
            </label>
           
              <input defaultValue='0.000' className="mt-2 w-52 shadow p-2 text-center text-sm bg-gray-100 text-blue-950 rounded-lg"/>
            
          </div>
          </div>
        </>
      )}
      {showLoyer && (
        <>
        <hr className="my-6" />
         <h2 className="text-blue-950 font-medium text-xl mb-4 ">Loyer cible</h2>
          <div className="flex flex-wrap space-x-6 text-sm">
         
          {/* Container for Consommables Labels and Buttons */}
          <div className="flex flex-col items-center">
            <label
              className="text-blue-950 text-xs font-medium cursor-pointer"
             
            >
            Coût mensuel équipement & service
            </label>
          
              <button className="mt-2 w-52 shadow p-2 bg-gray-100 text-blue-950 rounded-lg">
              3,02
              </button>
            
          </div>
          <div className="flex flex-col items-center">
            <label
              className="text-blue-950 text-xs font-medium cursor-pointer"
             
            >
           Loyer mensuel cible
            </label>
           
             <input defaultValue='5.03' className="mt-2 w-52 shadow text-center p-2 text-sm bg-gray-100 text-blue-950 rounded-lg"/>
           
          </div>
          <div className="flex flex-col items-center">
            <label
              className="text-blue-950 text-xs font-medium cursor-pointer"
              
            >
             Marge
            </label>
            
              <input defaultValue='  40.00' className="mt-2 w-52 shadow p-2 text-center text-sm bg-gray-100 text-blue-950 rounded-lg"/>
              
            
          </div>
          </div>
        </>)}

        <hr className="my-6" />


  {/* Bouton pour afficher le second tableau */}
 
      
      {/* Si le second tableau doit être affiché */}
      {showSecondTable && (
        <>

{/* Section pour le loyer mensuel et prix à la page sans engagement de volume */}
<div className="mb-6">
 
  <div>
    <label  className='text-lg  '>
      <input
        type="radio"
        value="loyerMensuel"
        checked={selectedOption === 'loyerMensuel'}
        onChange={handleOptionChange}
       className=''
      />
    Loyer mensuel + vente de consommables
    </label>
  </div>
</div>


 {/* Tableau des services */}
 <table className="min-w-full border text-sm text-blue-950 text-center border-gray-300">
        <thead>
          <tr>
            <th className="border bg-gray-100 border-gray-300 p-2">Prestation</th>
            <th className="border border-gray-300 p-2 bg-gray-100">Référence</th>
            <th className="border border-gray-300 p-2 bg-gray-100">Désignation</th>
            <th className="border border-gray-300 p-2 bg-gray-100">Qté</th>
            <th className="border border-gray-300 p-2 bg-gray-100">Prix de revient</th>
            <th className="border border-gray-300 p-2 bg-gray-100">Total P.R.</th>
            <th className="border border-gray-300 p-2 bg-gray-100">Prix unitaire</th>
            <th className="border border-gray-300 p-2 bg-gray-100">Prix total</th>
            <th className="border border-gray-300 p-2 bg-gray-100">Marge</th>
          </tr>
        </thead>
        <tbody>
         
            <tr>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2">
              1102WH3NL0
              </td>
              <td className="border border-gray-300 p-2">
              TASKalfa 508ci
              </td>
              <td className="border border-gray-300 p-2">
              1
              </td>
              <td className="border border-gray-300 p-2">
              3.02
              </td>
              <td className="border border-gray-300 p-2">
              3.02
              </td>
              <td className="border border-gray-300 p-2">
              5.03
              </td>
              <td className="border border-gray-300 p-2">
              5.03
              </td>
              <td className="border border-gray-300 p-2">
              40,00%
              </td>
             
            </tr>
       
        </tbody>
      </table>
 
    

    
        <div className="mt-6">
          {/* Nouvelle section pour l'input radio */}
          <div>
            <label className='text-lg'>
              <input
                type="radio"
                value="nouveauLoyer"
                checked={selectedOption === 'nouveauLoyer'}
                onChange={handleOptionChange}
              />
             Loyer mensuel + prix à la page sans engagement de volume
            </label>
          </div>

          {/* Nouveau tableau des services */}
          <table className="min-w-full border text-sm text-blue-950 text-center border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border bg-gray-100 border-gray-300 p-2">Prestation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Référence</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Désignation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Qté</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix de revient</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Total P.R.</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix unitaire</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix total</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Marge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Loyer mensuel équipement</td>
                <td className="border border-gray-300 p-2">1234ABCD</td>
                <td className="border border-gray-300 p-2">TASKalfa 408ci</td>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">3.02</td>
                <td className="border border-gray-300 p-2">3.02</td>
                <td className="border border-gray-300 p-2">5.03</td>
                <td className="border border-gray-300 p-2">5.03</td>
                <td className="border border-gray-300 p-2">40,00%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prix par page monochrome</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prix par page couleur</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      
        <div className="mt-6">
          {/* Nouvelle section pour l'input radio */}
          <div>
            <label className='text-lg'>
              <input
                type="radio"
                value="nouveauLoyer"
                checked={selectedOption === 'nouveauLoyer2'}
                onChange={handleOptionChange}
              />
            Loyer mensuel incluant volume forfaitaire de 5000 pages
            </label>
          </div>

          {/* Nouveau tableau des services */}
          <table className="min-w-full border text-sm text-blue-950 text-center border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border bg-gray-100 border-gray-300 p-2">Prestation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Référence</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Désignation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Qté</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix de revient</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Total P.R.</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix unitaire</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix total</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Marge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Loyer mensuel incluant forfait</td>
                <td className="border border-gray-300 p-2">1234ABCD</td>
                <td className="border border-gray-300 p-2">TASKalfa 408ci</td>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">3.02</td>
                <td className="border border-gray-300 p-2">3.02</td>
                <td className="border border-gray-300 p-2">5.03</td>
                <td className="border border-gray-300 p-2">5.03</td>
                <td className="border border-gray-300 p-2">40,00%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prix par page monochrome additionnelle</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prix par page couleur additionnelle</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div className="mt-6">
          {/* Nouvelle section pour l'input radio */}
          <div>
            <label className='text-lg'>
              <input
                type="radio"
                value="nouveauLoyer"
                checked={selectedOption === 'nouveauLoyer3'}
                onChange={handleOptionChange}
              />
            Forfait à la page incluant équipement, service et consommables calculé pour 5000 pages
            </label>
          </div>

          {/* Nouveau tableau des services */}
          <table className="min-w-full border text-sm text-blue-950 text-center border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border bg-gray-100 border-gray-300 p-2">Prestation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Référence</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Désignation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Qté</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix de revient</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Total P.R.</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix unitaire</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix total</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Marge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Prix forfaitaire / Page monochrome</td>
                <td className="border border-gray-300 p-2">1234ABCD</td>
                <td className="border border-gray-300 p-2">TASKalfa 408ci</td>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">0.70</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">1.16</td>
                <td className="border border-gray-300 p-2">40,00%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prix forfaitaire/Page couleur</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0.001</td>
                <td className="border border-gray-300 p-2">2.32</td>
                <td className="border border-gray-300 p-2">0.002</td>
                <td className="border border-gray-300 p-2">3.87</td>
                <td className="border border-gray-300 p-2">40.00%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Total</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">3.02</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">5.03</td>
                <td className="border border-gray-300 p-2">40.00%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prix par page monochrome additionnelle</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prix par page couleur additionnelle</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
     
    
        <div className="mt-6">
          {/* Nouvelle section pour l'input radio */}
          <div>
            <label className='text-lg'>
              <input
                type="radio"
                value="nouveauLoyer"
                checked={selectedOption === 'nouveauLoyer4'}
                onChange={handleOptionChange}
              />
             Loyer mensuel incluant volume forfaitaire pour 5000 pages SANS ADDITIONNEL
            </label>
          </div>

          {/* Nouveau tableau des services */}
          <table className="min-w-full border text-sm text-blue-950 text-center border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border bg-gray-100 border-gray-300 p-2">Prestation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Référence</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Désignation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Qté</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix de revient</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Total P.R.</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix unitaire</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix total</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Marge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Loyer mensuel incluant forfait	</td>
                <td className="border border-gray-300 p-2">1234ABCD</td>
                <td className="border border-gray-300 p-2">TASKalfa 408ci</td>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">3.02</td>
                <td className="border border-gray-300 p-2">3.02</td>
                <td className="border border-gray-300 p-2">5.03</td>
                <td className="border border-gray-300 p-2">5.03</td>
                <td className="border border-gray-300 p-2">40,00%</td>
              </tr>
            
             
            </tbody>
          </table>
        </div>
     




        <div className="mt-6">
          {/* Nouvelle section pour l'input radio */}
          <div>
            <label className='text-lg'>
              <input
                type="radio"
                value="nouveauLoyer"
                checked={selectedOption === 'nouveauLoyer4'}
                onChange={handleOptionChange}
              />
             Loyer mensuel à la page incluant équipement, consommables et service pour 5000 SANS ADDITIONNEL
            </label>
          </div>

          {/* Nouveau tableau des services */}
          <table className="min-w-full border text-sm text-blue-950 text-center border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border bg-gray-100 border-gray-300 p-2">Prestation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Référence</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Désignation</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Qté</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix de revient</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Total P.R.</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix unitaire</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Prix total</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Marge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Prix forfaitaire / Page monochrome</td>
                <td className="border border-gray-300 p-2">1234ABCD</td>
                <td className="border border-gray-300 p-2">TASKalfa 408ci</td>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">0.070</td>
                <td className="border border-gray-300 p-2">0.000</td>
                <td className="border border-gray-300 p-2">1.16</td>
                <td className="border border-gray-300 p-2">40,00%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prix forfaitaire/Page couleur</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0,001</td>
                <td className="border border-gray-300 p-2">	2,32</td>
                <td className="border border-gray-300 p-2">0,002</td>
                <td className="border border-gray-300 p-2">3,87</td>
                <td className="border border-gray-300 p-2">40,00%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Total</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">3.02</td>
                <td className="border border-gray-300 p-2">---</td>
                <td className="border border-gray-300 p-2">5.03</td>
                <td className="border border-gray-300 p-2">40,00%</td>
              </tr>
            
             
            </tbody>
          </table>

          <div className="flex gap-2 mt-16">
          <button id="link"  className="bg-amber-800 text-sm text-white font-medium p-5 transition rounded-xl hover:bg-amber-900"> <FaCheck size={10}/> Valider</button>
          
          <button id="link"   className="bg-slate-800  text-sm text-white font-medium p-5  transition rounded-xl hover:bg-slate-700">
          <FaPlus size={10} /> Autre équipement</button>

        </div>
        </div>
     </>
      )}


    </div>
  );
}

export default Claculer;
