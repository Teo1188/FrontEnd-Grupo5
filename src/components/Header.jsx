import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';

const user = {
  name: 'María Rodríguez',
  email: 'maria.rodriguez@amadeus.com',
};

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '/' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userProfileImage');
    navigate('/');
  };

  return (
    <div className="flex justify-end items-center px-4 py-2">
      {/* Botón de notificaciones */}
      <button
        type="button"
        className="relative p-1 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Menú de usuario */}
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
          </MenuButton>
        </div>
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <MenuItem key={item.name}>
              {({ active }) => (
                item.name === 'Sign out' ? (
                  <button
                    onClick={handleSignOut}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block w-full px-4 py-2 text-sm text-gray-700 text-left'
                    )}
                  >
                    {item.name}
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    {item.name}
                  </NavLink>
                )
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Header;
