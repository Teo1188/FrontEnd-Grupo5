import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Contenedor del menú */}
      <div className={`fixed top-0 left-0 h-full bg-blue-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
        {/* Botón para abrir/cerrar */}
        <div className="flex items-center justify-between px-4 py-4">

          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Lista de opciones */}
        <ul className={`mt-5 px-5 space-y-3 ${isOpen ? "block" : "hidden"}`}>
        <NavLink to="/dashboard" className="block p-2 hover:bg-blue-700 rounded cursor-pointer">
              Mis horas extra
            </NavLink>
          <li className="p-2 bg-transparent hover:bg-blue-700 rounded cursor-pointer">Aprobaciones</li>
          <li className="p-2 bg-transparent hover:bg-blue-700 rounded cursor-pointer">Rechazadas</li>
          <li className="p-2 bg-transparent hover:bg-blue-700 rounded cursor-pointer">Configuración</li>
           <NavLink to="/profile" className="block p-2 hover:bg-blue-700 rounded cursor-pointer">
              Mi perfil
            </NavLink>
        </ul>
      </div>

      {/* Contenido de la página que se ajusta al tamaño del menú */}
      <div className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
        
        {/* Aquí va el resto del contenido de la página */}
      </div>
    </div>
  );
};

export default Menu;
