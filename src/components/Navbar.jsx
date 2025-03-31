import React from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { FaBell } from 'react-icons/fa';

const userNavigation = [
  { name: 'Tu Perfil', href: '/profile' },
  { name: 'Cerrar Sesión', href: '/login' },
];

const Navbar = () => {
  return (
    <header className="bg-white shadow-md flex justify-between items-center p-4">
      
      <div className="ml-auto flex items-center space-x-4">
        {/* Botón de notificaciones */}
        <button className="text-gray-600 hover:text-gray-800 relative">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        {/* Información del usuario */}
        <div className="text-right">
          <h3 className="text-gray-800 font-semibold">Michell Londoño</h3>
          <p className="text-gray-500 text-sm">Empleado</p>
        </div>
        
        {/* Menú desplegable en la bolita */}
        <Menu as="div" className="relative">
          <MenuButton className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold focus:outline-none">
            ML
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                  >
                    {item.name}
                  </a>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
      
    </header>
  );
};

export default Navbar;
