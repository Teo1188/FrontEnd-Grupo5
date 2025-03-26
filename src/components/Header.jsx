import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'

const user = {
    name: 'María Rodríguez',
    email: 'maria.rodriguez@amadeus.com',
    imageUrl: localStorage.getItem('userProfileImage') || 'https://images.unsplash.com/photo-1472099645-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard'},
    { name: 'Extra hours', href: '/extrahours'},
]
const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Sign out', href: '/' },
]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Clear any stored user data
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userProfileImage');
        // Redirect to login
        navigate('/');
    };

    return(
        <Disclosure as="nav" className="bg-[#0070AD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  alt="Amadeus Logo"
                  src="https://www.amadeus.com/content/dam/logos/logo-main.svg"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                            isActive ? 'bg-[#00A3E1] text-white' : 'text-white hover:bg-[#00A3E1] hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-[#0070AD] p-1 text-white hover:text-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0070AD] focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-[#0070AD] text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0070AD] focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {item.name === 'Sign out' ? (
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <NavLink
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {item.name}
                          </NavLink>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-[#0070AD] p-2 text-white hover:bg-[#00A3E1] hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0070AD] focus:outline-hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={NavLink}
                to={item.href}
                className={({ isActive }) => classNames(
                  isActive ? 'bg-[#00A3E1] text-white' : 'text-white hover:bg-[#00A3E1]',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-[#00A3E1] pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">{user.name}</div>
                <div className="text-sm font-medium text-gray-200">{user.email}</div>
              </div>
              <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full bg-[#0070AD] p-1 text-white hover:text-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0070AD] focus:outline-hidden"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={item.name === 'Sign out' ? 'button' : NavLink}
                  to={item.name === 'Sign out' ? undefined : item.href}
                  onClick={item.name === 'Sign out' ? handleSignOut : undefined}
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#00A3E1] hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    )
}

export default Header;