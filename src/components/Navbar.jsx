import React from "react";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md flex justify-between items-center p-4">
      {/* Botón de menú */}
      <button className="text-gray-600 text-2xl">
        ☰
      </button>

      {/* Información del usuario */}
      <div className="flex items-center space-x-4">
        {/* Notificaciones */}
        <div className="relative">
          <FaBell className="text-gray-600 text-xl cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">4</span>
        </div>

        {/* Nombre del usuario */}
        <div className="text-right">
          <h3 className="text-gray-800 font-semibold">María Álvarez</h3>
          <p className="text-gray-500 text-sm">Empresa</p>
        </div>

        {/* Avatar circular */}
        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          MA
        </div>
      </div>
    </div>
  );
};

export default Navbar;
