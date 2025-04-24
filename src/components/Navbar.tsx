import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import Cart from '../pages/Cart'


const Navbar = () => {
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setCartOpen] = useState(false);
    
    console.log("pengalihan"+setCartItems); 

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    const handleCartClick = () => {
        if (!isLoggedIn) {
            // Jika belum login, arahkan ke halaman login
            navigate('/login');
        } else {
            // Jika sudah login, buka modal cart
            setCartOpen(true); // ini membuka modal Cart
        }
    };

    const location = useLocation();
    const currentPath = location.pathname;

    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Product', href: '/products', current: false },
        { name: 'Cart', href: '/cart', current: false, isCart: true },
    ];

    const auth = isLoggedIn
        ? [
            {
                name: 'Logout',
                href: '#',
                onClick: handleLogout,
                current: false,
            },
        ]
        : [
            { name: 'Login', href: '/login', current: false },
            { name: 'Register', href: '/register', current: false },
        ];

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-green-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <p className="text-4xl">🛒</p>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) =>
                                        item.isCart ? (
                                            <button
                                                key={item.name}
                                                // onClick={() => setCartOpen(true)}
                                                onClick={handleCartClick}
                                                className="text-green-300 hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                                            >
                                                {item.name}
                                            </button>
                                        ) : (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={currentPath === item.href ? 'page' : undefined}
                                                className={classNames(
                                                    currentPath === item.href ? 'bg-green-900 text-white' : 'text-green-300 hover:bg-green-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                {auth.map((item) =>
                                    item.name === "Logout" ? (
                                        <button
                                            key={item.name}
                                            onClick={handleLogout}
                                            className={classNames(
                                                'text-green-300 hover:bg-green-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </button>
                                    ) : (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={currentPath === item.href ? 'page' : undefined}
                                            className={classNames(
                                                currentPath === item.href ? 'bg-green-900 text-white' : 'text-green-300 hover:bg-green-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-green-800 p-2 text-green-400 hover:bg-green-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800 focus:outline-hidden">
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
                        {navigation.map((item) =>
                            item.isCart ? (
                                <button
                                    key={item.name}
                                    // onClick={() => setCartOpen(true)}
                                    onClick={handleCartClick}
                                    className="text-green-300 hover:bg-green-700 hover:text-white block rounded-md text-base font-medium"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'bg-green-900 text-white' : 'text-green-300 hover:bg-green-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                    </div>
                    <div className="border-t border-green-700 pt-4 pb-3">
                        <div className="mt-3 space-y-1 px-2">
                            {auth.map((item) => 
                                item.name === "Logout" ? (
                                    <button
                                        key={item.name}
                                        onClick={handleLogout}
                                        className={classNames(
                                            'text-green-300 hover:bg-green-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'bg-green-900 text-white' : 'text-green-300 hover:bg-green-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </div>
                </DisclosurePanel>
            </Disclosure>
            
            <Cart open={isCartOpen} setOpen={setCartOpen} cartItems={cartItems} />
            {/* <Cart open={isCartOpen} setOpen={setCartOpen} /> */}
        </div>
    );
};

export default Navbar;