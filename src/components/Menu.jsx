import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`bg-blue-900 text-white h-full p-5 pt-8 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-5 left-[200px] bg-white text-blue-900 rounded-full p-2 shadow-md"
      >
        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      <div className="flex items-center space-x-2">
        {isOpen ? (
          <h1 className="text-xl font-bold">Principal</h1>
        ) : (
          <h1 className="text-xl font-bold text-center w-full">P</h1>
        )}
      </div>

      <ul className="mt-10 space-y-4">
        <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer flex items-center">
          {isOpen ? "Mis horas extras" : "H"}
        </li>
        <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer flex items-center">
          {isOpen ? "Aprobaciones" : "A"}
        </li>
        <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer flex items-center">
          {isOpen ? "Rechazadas" : "R"}
        </li>
        
        {isOpen && <li className="mt-6 text-gray-400">Configuración</li>}
        
        <li 
          className="hover:bg-blue-700 p-2 rounded-md cursor-pointer flex items-center"
          onClick={() => handleNavigation('/profile')}
        >
          {isOpen ? "Mi perfil" : "P"}
        </li>
      </ul>
    </div>
  );
};

export default Menu;