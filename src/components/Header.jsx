import React from 'react';
import { NavLink } from 'react-router-dom';
import { Disclosure, Menu, MenuButton, MenuItems, MenuItem, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
   
    
];

const userNavigation = [
    { name: 'Tu Perfil', href: '#' },
    { name: 'Configuraciones', href: '#' },
    { name: 'Cerrar Sesión', href: '/login' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Header = () => {
    return (
        <Disclosure as="nav" className="bg-blue-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <div className="bg-white text-blue-800 px-3 py-1 rounded-md text-lg font-bold">
                                AMADEUS
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? 'bg-blue-900 text-white'
                                                    : 'text-white hover:bg-blue-700',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sección de usuario y notificaciones */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="relative rounded-full bg-blue-800 p-1 text-white hover:bg-blue-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 focus:outline-none"
                            >
                                <span className="sr-only">Ver notificaciones</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Menú de usuario */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-blue-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 focus:outline-none">
                                        <span className="sr-only">Abrir menú de usuario</span>
                                        <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                                    </MenuButton>
                                </div>
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            {({ active }) => (
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                            )}
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>

                    {/* Botón de menú para móviles */}
                    <div className="-mr-2 flex md:hidden">
                        <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-blue-800 p-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 focus:outline-none">
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            {/* Menú desplegable en móviles */}
            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={NavLink}
                            to={item.href}
                            className={({ isActive }) =>
                                classNames(
                                    isActive ? 'bg-blue-900 text-white' : 'text-white hover:bg-blue-700',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )
                            }
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export default Header;
