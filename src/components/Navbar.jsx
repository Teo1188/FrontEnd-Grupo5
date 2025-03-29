import React from 'react';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md flex justify-between items-center p-4">
      <div className="text-xl font-semibold text-gray-800">Dashboard</div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800 relative">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="text-right">
          <h3 className="text-gray-800 font-semibold">Michell Londoño</h3>
          <p className="text-gray-500 text-sm">Empleado</p>
        </div>
        
        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          ML
        </div>
      </div>
    </header>
  );
};

export default Navbar;