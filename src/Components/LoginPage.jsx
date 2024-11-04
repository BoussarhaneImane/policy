import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isRobot, setIsRobot] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password && !isRobot) {
            navigate('/home');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form 
                onSubmit={handleSubmit} 
                className="bg-gray-100 rounded-xl p-8 shadow-lg w-full max-w-md transition-all transform hover:scale-105"
            >
                <h2 className="mb-6 text-3xl font-medium text-slate-800 text-center">Se connecter</h2>
                
                {/* Username input */}
                <div className="relative mb-4">
                    <div className="mb-2">
                        <label htmlFor="username" className="text-slate-800 font-medium">Nom d'utilisateur</label>
                    </div>
                    <FaUser className="absolute top-12 left-3 text-amber-800" />
                    <input
                        id="username"
                        type="text"
                        placeholder="Entrez votre nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 p-3 border border-gray-300 focus:outline-none focus:border-maroon-600 transition-all rounded-xl"
                        required
                    />
                </div>

                {/* Password input */}
                <div className="relative mb-4">
                    <div className="mb-2">
                        <label htmlFor="password" className="text-slate-800 font-medium">Mot de passe</label>
                    </div>
                    <FaLock className="absolute top-12 left-3 text-amber-800" />
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 p-3 border border-gray-300 focus:outline-none focus:border-maroon-600 transition-all rounded-xl"
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-10 right-3 text-gray-400"
                    >
                        {showPassword ? <AiFillEyeInvisible size={20} className="text-amber-800 mt-1" /> : <AiFillEye size={20} className="text-amber-800 mt-1" />}
                    </button>
                </div>

                {/* Remember Me and Are You a Robot Checkboxes */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-2"
                        />
                        <label htmlFor="rememberMe" className="text-slate-800 font-medium">Se souvenir de moi</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isRobot"
                            checked={isRobot}
                            onChange={() => setIsRobot(!isRobot)}
                            className="mr-2"
                        />
                        <label htmlFor="isRobot" className="text-slate-800 font-medium">Êtes-vous un robot?</label>
                    </div>
                </div>

                {/* Submit button */}
                <button 
                    type="submit" 
                    className="w-full p-3 text-white bg-slate-800 hover:bg-maroon-500 transition-all transform hover:scale-105 rounded-xl"
                    disabled={isRobot}
                >
                    Connexion
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
