import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import EquipmentComponent from './EquipmentComponent';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import './dashbord.css'
const DashboardPage = () => {
    const [filter, setFilter] = useState('');
    const [newProduct, setNewProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [editingProductIndex, setEditingProductIndex] = useState(null);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState(null); // New state for subcategory index
    const [newSubcategory, setNewSubcategory] = useState('');
    const [subcategoryFilter, setSubcategoryFilter] = useState('');
    const [editingSubcategoryIndex, setEditingSubcategoryIndex] = useState(null);

    // Load products from localStorage on component mount
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const validProducts = storedProducts.filter(product => 
            typeof product === 'object' && product !== null && 'name' in product
        );
        setProducts(validProducts);
    }, []);

    // Save products to localStorage whenever products change
    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }, [products]);

    // Handle input changes
    const handleFilterChange = (e) => setFilter(e.target.value);
    const handleProductChange = (e) => setNewProduct(e.target.value);
    const handleSubcategoryChange = (e) => setNewSubcategory(e.target.value);
    const handleSubcategoryFilterChange = (e) => setSubcategoryFilter(e.target.value);

    // Add or update a product
    const handleAddOrUpdateProduct = () => {
        if (newProduct.trim()) {
            if (editingProductIndex !== null) {
                const updatedProducts = products.map((product, index) => 
                    index === editingProductIndex ? { ...product, name: newProduct } : product
                );
                setProducts(updatedProducts);
                setEditingProductIndex(null);
            } else {
                setProducts([...products, { name: newProduct, subcategories: [] }]);
            }
            setNewProduct('');
        }
    };

    // Delete a product
    const handleDeleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        if (selectedProductIndex === index) {
            setSelectedProductIndex(null);
            setSelectedSubcategoryIndex(null); // Reset selected subcategory index
        }
    };

    // Edit a product
    const handleEditProduct = (index) => {
        setNewProduct(products[index].name);
        setEditingProductIndex(index);
    };

    // Select a product for managing subcategories
    const handleSelectProduct = (index) => {
        setSelectedProductIndex(index);
        setSubcategoryFilter('');
        setNewSubcategory('');
        setEditingSubcategoryIndex(null);
    };

    // Cancel product addition or modification
    const handleCancelProduct = () => {
        setNewProduct('');
        setEditingProductIndex(null);
    };

    // Add a subcategory
    const handleAddSubcategory = () => {
        if (newSubcategory.trim() && selectedProductIndex !== null) {
            const updatedProducts = products.map((product, index) => {
                if (index === selectedProductIndex) {
                    return {
                        ...product,
                        subcategories: editingSubcategoryIndex !== null
                            ? product.subcategories.map((sub, subIndex) => 
                                subIndex === editingSubcategoryIndex ? newSubcategory : sub
                            )
                            : [...product.subcategories, newSubcategory]
                    };
                }
                return product;
            });
            setProducts(updatedProducts);
            setNewSubcategory('');
            setEditingSubcategoryIndex(null);
        }
    };

    // Delete a subcategory
    const handleDeleteSubcategory = (index) => {
        const updatedProducts = products.map((product, pIndex) => {
            if (pIndex === selectedProductIndex) {
                return {
                    ...product,
                    subcategories: product.subcategories.filter((_, sIndex) => sIndex !== index)
                };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    // Edit a subcategory
    const handleEditSubcategory = (index) => {
        const subcategory = products[selectedProductIndex].subcategories[index];
        setNewSubcategory(subcategory);
        setEditingSubcategoryIndex(index);
    };

    // Cancel subcategory addition or modification
    const handleCancelSubcategory = () => {
        setNewSubcategory('');
        setEditingSubcategoryIndex(null);
    };

    // Return to product list
    const handleBackToProducts = () => {
        setSelectedProductIndex(null);
        setSubcategoryFilter('');
        setNewSubcategory('');
        setEditingSubcategoryIndex(null);
        setSelectedSubcategoryIndex(null); // Reset selected subcategory index
    };
  

    // Handle selecting a subcategory
    const handleSelectSubcategory = (index) => {
        setSelectedSubcategoryIndex(index); // Set selected subcategory index
    };

  
    useEffect(() => {
        AOS.init({
          duration: 1000, // Durée de l'animation en millisecondes (par exemple, 1000ms = 1s)
          easing: 'ease-in-out', // Type de transition d'animation
          once: true, // Si true, l'animation ne se déclenche qu'une seule fois
        });
      }, []); 
    return (
        <div className="min-h-screen mt-14 shadow-xl m-10  sm:p-8 sm:pt-4  font-medium bg-gray-100  rounded-xl ">
            {/* Search and add product forms */}
            {selectedProductIndex === null ? (
                <div >
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-blue-950 " > Equipements</h2>
                    <div className="flex justify-end mb-8 mt-8">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="p-2 m-4  sm:w-32 text-white bg-yellow-800 rounded-lg  link " 
                           
                        >
                            Retour 
                        </button>
                        </div>
                    </div>
                    <div>
                       
                       
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white  p-8 md:p-10 rounded-lg shadow-md  space-y-4 md:space-y-0 w-full">
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
                                    <input
                                        type="text"
                                        placeholder="Filtrer les produits"
                                        value={filter}
                                        onChange={handleFilterChange}
                                       className="border w-full md:w-72 border-gray-300 rounded-md p-2 "
                                    />
                                    <button onClick={() => {}} className="link  text-slate-800  bg-amber-100 font-medium rounded-md px-4 py-2 w-full sm:w-auto link ">
                                        ReChercher
                                    </button>
                                    <button onClick={() => setFilter('')}    className="bg-slate-800  text-amber-100 font-medium  rounded-md px-4 py-2 w-full sm:w-auto link">
                                        Annuler
                                    </button>
                                </div>
                        
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
                                    <input
                                        type="text"
                                        placeholder="Ajouter ou modifier un produit"
                                        value={newProduct}
                                        onChange={handleProductChange}
                                        className="border w-full md:w-72 border-gray-300 rounded-md p-2 "
                                    />
                                    <button 
                                        onClick={handleAddOrUpdateProduct} 
                                        className={`   text-slate-800  bg-amber-100 font-medium rounded-md px-4 py-2 w-full sm:w-auto link  ${editingProductIndex !== null ? 'w-40' : ''}`}
                                    >
                                        {editingProductIndex !== null ? 'Mettre à jour' : 'Enregistrer'}
                                    </button>
                                    <button onClick={handleCancelProduct} className="bg-slate-800  text-amber-100 font-medium  rounded-md px-4 py-2 w-full sm:w-auto link">
                                        Annuler
                                    </button>
                                </div>
                            </div>
                       

                      
                        {/* Products table */}
                        <table
                        
                        
  
   className="min-w-full bg-slate-800 border border-gray-300 mt-14 shadow-lg"
>
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2 text-gray-300 text-left">Produit</th>
                                    <th className="border border-gray-300 p-2 text-gray-300 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products
                                    .filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
                                    .map((product, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 bg-white p-2 text-gray-700 ">
                                                <button 
                                                    onClick={() => handleSelectProduct(index)} 
                                                    className="text-left w-full text-gray-500 "
                                                >
                                                    {product.name}
                                                </button>
                                            </td>
                                            <td className="border border-gray-300 p-2 bg-white flex">
                                                <button 
                                                    onClick={() => handleEditProduct(index)} 
                                                    className="link flex items-center rounded bg-amber-100 text-blue-950 p-2  mr-2"
                                                    style={{backgroundColor:''}}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteProduct(index)} 
                                                    className="link bg-slate-800 rounded  text-amber-100 p-2 "
                                                >
                                                    <FaTimes />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
              
            ) : (
                selectedSubcategoryIndex === null ? (
                <div>
                {/* Sous-catégories */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        {/*<h2 className="text-lg font-medium">Sous-catégories de {products[selectedProductIndex].name}</h2>*/}
                        <h2 className="text-xl font-bold text-blue-950"> Equipements</h2>
                        <button onClick={handleBackToProducts} className="p-2 w-32 text-white bg-yellow-800 rounded-lg  link  ">
                            Retour 
                        </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center  bg-white  p-8 md:p-10 rounded-lg shadow-md  space-y-4 md:space-y-0 w-full" style={{marginTop:'3rem'}}>
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
                            <input
                                type="text"
                                placeholder="Filtrer les sous-catégories"
                                value={subcategoryFilter}
                                onChange={handleSubcategoryFilterChange}
                                className="border w-full md:w-72 border-gray-300 rounded-md p-2 "
                            />
                          <button onClick={() => {}} className="link  text-slate-800  bg-amber-100 font-medium rounded-md px-4 py-2 w-full sm:w-auto link ">
                                        ReChercher
                                    </button>

                                    <button onClick={() => setFilter('')}    className="bg-slate-800  text-amber-100 font-medium  rounded-md px-4 py-2 w-full sm:w-auto link">
                                        Annuler
                                    </button>
                        </div>

                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
                            <input
                                type="text"
                                placeholder="Ajouter une sous-catégorie"
                                value={newSubcategory}
                                onChange={handleSubcategoryChange}
                                className="border w-full md:w-72 border-gray-300 rounded-md p-2 "
                            />
                            <button 
                                onClick={handleAddSubcategory} 
                                className={`text-slate-800  bg-amber-100 font-medium rounded-md px-4 py-2 w-full sm:w-auto link   ${editingSubcategoryIndex !== null ? 'w-40' : ''}`}
                            >
                                {editingSubcategoryIndex !== null ? 'Mettre à jour' : 'Ajouter'}
                            </button>
                            <button onClick={handleCancelSubcategory} className="bg-slate-800  text-amber-100 font-medium  rounded-md px-4 py-2 w-full sm:w-auto link ">
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            

                    {/* Subcategories table */}
                    <table   className="min-w-full bg-slate-800 border border-gray-300 mt-14 shadow-lg">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2 text-gray-300 text-left">Sous-catégorie</th>
                                <th className="border border-gray-300 p-2 text-gray-300 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products[selectedProductIndex].subcategories
                                .filter(subcategory => subcategory.toLowerCase().includes(subcategoryFilter.toLowerCase()))
                                .map((subcategory, index) => (
                                    <tr key={index}>
                                        <td className="text-gray-500  border  border-gray-300 bg-white p-2   ">
                                            <button onClick={() => handleSelectSubcategory(index)} className="text-left w-full">
                                                {subcategory}
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 p-2 bg-white flex">
                                            <button 
                                                onClick={() => handleEditSubcategory(index)} 
                                                className="link flex items-center rounded bg-amber-100 text-slate-800 p-2  mr-2"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteSubcategory(index)} 
                                                className="link bg-slate-800 rounded  text-amber-100 p-2 "
                                            >
                                                <FaTimes />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                  
                </div>
            ) : (
                /* Render EquipmentComponent when subcategory is selected */
                <div >
                  
                 <div className="flex justify-between items-center mt-8">
  
     <h2 className="text-xl font-bold text-blue-950 p-4  "> Equipements</h2>


</div>
                <EquipmentComponent
                  
                  setSelectedSubcategoryIndex={setSelectedSubcategoryIndex}
                    selectedSubcategoryIndex={selectedSubcategoryIndex}
                    subcategory={products[selectedProductIndex].subcategories[selectedSubcategoryIndex]} 
                    product={products[selectedProductIndex]} 
                />
               
            </div>
        )
    )}
    </div>
);
};

export default DashboardPage;
