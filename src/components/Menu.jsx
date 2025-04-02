import React, { useState } from "react";
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { Clock, UserCheck, User } from "lucide-react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Menú lateral */}
      <div className={`fixed top-0 left-0 h-full bg-blue-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
        
        {/* Botón para abrir/cerrar menú */}
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Opciones del menú expandido */}
        <ul className={`mt-5 px-5 space-y-3 ${isOpen ? "block" : "hidden"}`}>
          <NavLink 
            to="/dashboard" 
            className="flex items-center p-2 hover:bg-blue-700 rounded cursor-pointer"
            activeClassName="bg-blue-800"
          >
            <Clock className="mr-3" size={18} />
            <span>Mis horas extra</span>
          </NavLink>
          
          <NavLink 
            to="/dashboard/admin-panel" 
            className="flex items-center p-2 hover:bg-blue-700 rounded cursor-pointer"
            activeClassName="bg-blue-800"
          >
            <FaUserShield className="mr-3" size={18} />
            <span>Administrador</span>
          </NavLink>
          
          <NavLink 
            to="/dashboard/profile" 
            className="flex items-center p-2 hover:bg-blue-700 rounded cursor-pointer"
            activeClassName="bg-blue-800"
          >
            <User className="mr-3" size={18} />
            <span>Mi perfil</span>
          </NavLink>
        </ul>

        {/* Iconos del menú colapsado */}
        <ul className={`mt-5 px-4 space-y-3 ${isOpen ? "hidden" : "block"}`}>
          <NavLink 
            to="/dashboard" 
            className="flex justify-center p-2 hover:bg-blue-700 rounded cursor-pointer"
            activeClassName="bg-blue-800"
            title="Mis horas extra"
          >
            <Clock size={20} />
          </NavLink>
          
          <NavLink 
            to="/dashboard/admin-panel" 
            className="flex justify-center p-2 hover:bg-blue-700 rounded cursor-pointer"
            activeClassName="bg-blue-800"
            title="Administrador"
          >
            <FaUserShield size={20} />
          </NavLink>
          
          <NavLink 
            to="/dashboard/profile" 
            className="flex justify-center p-2 hover:bg-blue-700 rounded cursor-pointer"
            activeClassName="bg-blue-800"
            title="Mi perfil"
          >
            <User size={20} />
          </NavLink>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;