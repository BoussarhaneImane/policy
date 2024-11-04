// Components/NotFoundPage.js
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="animate-bounce text-amber-900 mb-4">
                <FaExclamationTriangle size={80} />
            </div>
            <h1 className="text-6xl font-bold text-blue-950">404</h1>
            <p className="text-2xl mt-4 text-slate-900">Page Introuvable</p>
            <p className="text-slate-800 mt-2">La page que vous recherchez n'existe pas.</p>
            <a href="/" className="mt-6 px-4 py-2 bg-amber-900 shadow-lg text-white rounded hover:bg-amber-800">
                Retourner à l'accueil
            </a>
        </div>
    );
};

export default NotFoundPage;
