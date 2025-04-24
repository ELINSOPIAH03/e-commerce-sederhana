'use client'

import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { useNavigate } from "react-router-dom";


interface Item {
    id: number;
    name: string;
    price: string;
    color: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    quantity: number;
}

interface CartProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    cartItems: Item[];
}

export default function Cart({ open, setOpen }: CartProps) {
    const navigate = useNavigate();

    // Mengambil data cart dari localStorage
    const [cartItems, setCartItems] = useState<Item[]>(() => {
        const existingCart = localStorage.getItem("cartItems");
        return existingCart ? JSON.parse(existingCart) : [];
    });

    // Menghitung subtotal
    const subtotal = cartItems.reduce((total: number, item: Item) => {
        return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
    }, 0).toFixed(2);


    const handleRemoveItem = (id: number) => {
        // Filter item dengan ID yang sesuai
        const updatedCart = cartItems.filter(item => item.id !== id);

        if (updatedCart.length !== cartItems.length) {
            // Hanya update state dan localStorage jika ada perubahan
            setCartItems(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }
    };

    useEffect(() => {
        // Update cartItems ke localStorage setiap ada perubahan
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cartItems.length > 0 ? (
                                                    cartItems.map((product) => (
                                                        <li key={product.id} className="flex py-6">
                                                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between font-medium text-gray-900 text-xs sm:text-base lg:text-lg">
                                                                        <h3 className="text-xs sm:text-base lg:text-lg">
                                                                            <a href={product.href}>{product.name}</a>
                                                                        </h3>
                                                                        ${(parseFloat(product.price.replace('$', '')) * product.quantity).toFixed(2)}
                                                                        {/* <p className="ml-4">{product.price}</p> */}
                                                                    </div>
                                                                    <p className="mt-1 text-xs sm:text-sm text-gray-500">{product.color}</p>
                                                                </div>
                                                                <div className="flex flex-1 justify-between text-sm items-center">
                                                                    <p className="text-gray-500 text-xs sm:text-sm">Qty {product.quantity}</p>

                                                                    <div className="flex">
                                                                        <button type="button"
                                                                            onClick={() => handleRemoveItem(product.id)}
                                                                            className=" text-green-600 hover:text-green-500 text-xs sm:text-sm p-0 m-0">
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p>Your cart is empty</p>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${subtotal}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-green-700"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOpen(false);
                                                    navigate('/products');
                                                }}
                                                className="font-medium text-green-600 hover:text-green-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}