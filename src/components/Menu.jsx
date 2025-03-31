import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cierra el menú si el usuario hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      {/* Contenedor del menú */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Botón para abrir/cerrar */}
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Lista de opciones */}
        <ul className={`mt-5 px-5 space-y-3 ${isOpen ? "block" : "hidden"}`}>
          <li>
            <NavLink
              to="/dashboard"
              className="block p-2 hover:bg-blue-700 rounded cursor-pointer"
            >
              Mis horas extra
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className="block p-2 hover:bg-blue-700 rounded cursor-pointer"
            >
              Configuración
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="block p-2 hover:bg-blue-700 rounded cursor-pointer"
            >
              Mi perfil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-panel"
              className="block p-2 hover:bg-blue-700 rounded cursor-pointer"
            >
              Admin
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Contenido de la página que se ajusta al tamaño del menú */}
      <div
        className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}
      >
        {/* Aquí va el resto del contenido de la página */}
      </div>
    </div>
  );
};

export default Menu;
