import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import DashboardPage from './Components/DashboardPage';
import FirstNav from './Components/FirstNav';
import Navbar from './Components/Navbar';
import Consommables from './Components/consommables';
import Options from './Components/Options'
import Pieces from './Components/Pieces';
import Homepage from './Components/Homepage';
import Categories from './Components/Categories';
import Produits from './Components/Produits';
import Attributs from './Components/Attributs'
import Kit from './Components/Kit';
import Simulation from './Components/Simulation';
import Footer from './Components/Footer';
import Devis from './Components/Devis';
import NotFoundPage from './Components/NotFoundPage';
import Attente from './Components/Attente';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route 
                    path="/Produits/CategoriesProduits" 
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <DashboardPage /> 
                            <Footer/>
                        </>
                    } 
                />
                 <Route 
                    path="/Produits/ImporterCategories" 
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <Categories/>
                            <Footer/>
                        </>
                    } 
                />
                  <Route 
                    path="/Produits/ImporterProduits" 
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <Produits/>
                            <Footer/>
                        </>
                    } 
                />
                <Route 
                    path="/Produits/Attributs/ImporterAttributs" 
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <Attributs/>
                            <Footer/>
                        </>
                    } 
                />
                <Route 
                    path="/Produits/Attributs/Kit" 
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <Kit/>
                            <Footer/>
                        </>
                    } 
                />
                <Route 
                    path="/Simulation" 
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <Simulation/>
                            <Footer/>
                        </>
                    } 
                />
              
                <Route 
                    path="/Devis"
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <Devis/>
                        
                        </>
                    } 
                />
               
                <Route 
                    path="/attente"
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <Attente/>
                        
                        </>
                    } 
                />
                <Route 
                    path="/home" 
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <Homepage/> 
                           
                        </>
                    } 
                />
                <Route path='/Produits/Attributs/Consommables' element={
                    <>
                    <FirstNav /> 
                    <Navbar/>
                    <Consommables/>
                    <Footer/>
                    </>
                    }
                    />
                      <Route path='/Produits/Attributs/Options' element={
                    <>
                    <FirstNav /> 
                    <Navbar/>
                    <Options/>
                    <Footer/>
                    </>
                    
                    }
                    />

                     <Route path="*" element={<NotFoundPage/>} />
                     <Route path='/Produits/Attributs/Pièces' element={
                    <>
                    <FirstNav /> 
                    <Navbar/>
                  <Pieces/>
                  <Footer/>
                    </>
                     
                    }
                    />
            </Routes>
        </Router>
    );
};

export default App;
