// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard' },
//   { name: 'Horas Extra', href: '/extrahours' },
// ];

// const userNavigation = [
//   { name: 'Tu Perfil', href: '#' },
//   { name: 'Configuraciones', href: '#' },
//   { name: 'Cerrar Sesión', href: '/login' },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Header = () => {
//   return (
//     <Disclosure as="nav" className="bg-blue-800">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex items-center">
//             <div className="shrink-0">
//               <div className="bg-white text-blue-800 px-3 py-1 rounded-md text-lg font-bold">
//                 AMADEUS
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <div className="ml-10 flex items-baseline space-x-4">
//                 {navigation.map((item) => (
//                   <NavLink
//                     key={item.name}
//                     to={item.href}
//                     className={({ isActive }) =>
//                       classNames(
//                         isActive ? 'bg-blue-900 text-white' : 'text-white hover:bg-blue-700 hover:text-white',
//                         'rounded-md px-3 py-2 text-sm font-medium',
//                       )
//                     }
//                   >
//                     {item.name}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="hidden md:block">
//             <div className="ml-4 flex items-center md:ml-6">
//               <button
//                 type="button"
//                 className="relative rounded-full bg-blue-800 p-1 text-white hover:bg-blue-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 focus:outline-none"
//               >
//                 <span className="absolute -inset-1.5" />
//                 <span className="sr-only">Ver notificaciones</span>
//                 <BellIcon aria-hidden="true" className="size-6" />
//               </button>
//               <Menu as="div" className="relative ml-3">
//                 <div>
//                   <MenuButton className="relative flex max-w-xs items-center rounded-full bg-blue-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 focus:outline-none">
//                     <span className="absolute -inset-1.5" />
//                     <span className="sr-only">Abrir menú de usuario</span>
//                     <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
//                   </MenuButton>
//                 </div>
//                 <MenuItems
//                   transition
//                   className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
//                 >
//                   {userNavigation.map((item) => (
//                     <MenuItem key={item.name}>
//                       {({ active }) => (
//                         <button
//                           href={item.href}
//                           className={classNames(
//                             active ? 'bg-gray-100' : '',
//                             'block px-4 py-2 text-sm text-gray-700'
//                           )}
//                         >
//                           {item.name}
//                         </button>
//                       )}
//                     </MenuItem>
//                   ))}
//                 </MenuItems>
//               </Menu>
//             </div>
//           </div>
//           <div className="-mr-2 flex md:hidden">
//             <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-blue-800 p-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 focus:outline-none">
//               <span className="absolute -inset-0.5" />
//               <span className="sr-only">Abrir menú principal</span>
//               <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
//               <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
//             </DisclosureButton>
//           </div>
//         </div>
//       </div>

//       <DisclosurePanel className="md:hidden">
//         <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
//           {navigation.map((item) => (
//             <DisclosureButton
//               key={item.name}
//               as={NavLink}
//               to={item.href}
//               className={({ isActive }) =>
//                 classNames(
//                   isActive ? 'bg-blue-900 text-white' : 'text-white hover:bg-blue-700',
//                   'block rounded-md px-3 py-2 text-base font-medium'
//                 )
//               }
//             >
//               {item.name}
//             </DisclosureButton>
//           ))}
//         </div>
//         <div className="border-t border-blue-700 pt-4 pb-3">
//           <div className="flex items-center px-5">
//             <div className="shrink-0">
//               <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
//             </div>
//             <div className="ml-3">
//               <div className="text-base font-medium text-white">{user.name}</div>
//               <div className="text-sm font-medium text-blue-200">{user.email}</div>
//             </div>
//             <button
//               type="button"
//               className="relative ml-auto shrink-0 rounded-full bg-blue-800 p-1 text-white hover:bg-blue-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 focus:outline-none"
//             >
//               <span className="absolute -inset-1.5" />
//               <span className="sr-only">Ver notificaciones</span>
//               <BellIcon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="mt-3 space-y-1 px-2">
//             {userNavigation.map((item) => (
//               <DisclosureButton
//                 key={item.name}
//                 as="a"
//                 href={item.href}
//                 className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
//               >
//                 {item.name}
//               </DisclosureButton>
//             ))}
//           </div>
//         </div>
//       </DisclosurePanel>
//     </Disclosure>
//   );
// };

// export default Header;