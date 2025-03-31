import React, { useState } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const userNavigation = [
  { name: 'Mi Perfil', href: '/profile' },
  { name: 'Cerrar Sesión', href: '/login' },
];

const Navbar = ({ notificaciones, userData }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Extraemos el nombre y las iniciales del usuario
  const userName = userData?.nombre || 'Usuario'; 
  const initials = userName.split(' ').map((name) => name[0]).join('');

  return (
    <header className="bg-white shadow-md flex justify-between items-center p-4">
      <div className="ml-auto flex items-center space-x-4">
        {/* Botón de notificaciones sin el contador */}
        <button className="text-gray-600 hover:text-gray-800 relative" onClick={toggleNotifications}>
          <FaBell className="text-xl" />
        </button>

        {/* Menú desplegable con las iniciales o nombre del usuario */}
        <Menu as="div" className="relative">
          <MenuButton className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold focus:outline-none">
            {initials} {/* Mostramos las iniciales */}
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                    onClick={item.name === 'Cerrar Sesión' ? () => navigate(item.href) : null} // Redirige al cerrar sesión
                  >
                    {item.name}
                  </a>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>

      {/* Mostrar las notificaciones cuando se presiona la campanita */}
      {showNotifications && (
        <div className="absolute top-14 right-4 w-72 bg-white shadow-lg rounded-md p-4">
          <h4 className="font-bold text-lg">Notificaciones</h4>
          <ul className="space-y-2 mt-2">
            {notificaciones.map((notif, index) => (
              <li key={index} className="text-sm text-gray-700">{notif}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
