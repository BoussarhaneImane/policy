import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import DashboardPage from './Components/DashboardPage';
import FirstNav from './Components/FirstNav';
import Navbar from './Components/Navbar';
import Consommables from './Components/consommables';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route 
                    path="/Produits" 
                    element={
                        <>
                            <FirstNav /> 
                            <Navbar/>
                            <DashboardPage /> 
                        </>
                    } 
                />
                <Route path='/Consommables' element={
                    <>
                    <FirstNav /> 
                    <Navbar/>
                    <Consommables/>
                    </>
                    }
                    />
            </Routes>
        </Router>
    );
};

export default App;
