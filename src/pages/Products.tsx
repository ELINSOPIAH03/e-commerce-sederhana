import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import Header from '../components/Header'

import ModalSuccess from '../components/ModalSuccess'

import '../scss/components/_button.scss'
import '../scss/components/_input.scss'

type Item = {
    id: number;
    name: string;
    price: string;
    color: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    quantity: number;
};


export default function Products() {

    const items: Item[] = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
            quantity: 1,
        },
        {
            id: 2,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Aspen White',
            quantity: 1,
        },
        {
            id: 3,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Charcoal',
            quantity: 1,
        },
        {
            id: 4,
            name: 'Artwork Tee',
            href: '#',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
            imageAlt: "Front of men's Artwork Tee in black.",
            price: '$35',
            color: 'Iso Dots',
            quantity: 1,
        },
        {
            id: 5,
            name: 'Army',
            href: '#',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: "Front of men's Tumbler.",
            price: '$35',
            color: 'Tumbler',
            quantity: 1,
        },
        {
            id: 6,
            name: 'White and Black',
            href: '#',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-01.jpg',
            imageAlt: "Front of men's Tumbler.",
            price: '$35',
            color: 'Pouch',
            quantity: 1,
        },
        {
            id: 7,
            name: 'Throwback Hip Bag',
            href: '#',
            color: 'Salmon',
            price: '$90.00',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
            quantity: 1,
        },
        {
            id: 8,
            name: 'Medium Stuff Satchel',
            href: '#',
            color: 'Blue',
            price: '$32.00',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            quantity: 1,
        },
    ];

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);

        const savedCartItems = localStorage.getItem("cartItems");
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    const [cartItems, setCartItems] = useState<Item[]>(() => {
        const existingCart = localStorage.getItem("cartItems");
        return existingCart ? JSON.parse(existingCart) : [];
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleAddToCart = (item: Item) => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            // Cek jika item sudah ada di keranjang
            const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

            let updatedCart: Item[];

            if (existingItemIndex >= 0) {
                // Item sudah ada, update quantity dan harga
                updatedCart = [...cartItems];
                updatedCart[existingItemIndex].quantity += 1;  // Menambah quantity
            } else {
                // Item baru
                updatedCart = [...cartItems, { ...item, quantity: 1 }];
            }

            // Update state dan localStorage
            setCartItems(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            console.log("Added to cart:", item);


            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                window.location.reload();
            }, 3000);
        }
    };



    return (
        <>
            <div className="min-h-full">
                <Navbar />
                <Header title="Product Page 🛍️" />
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="bg-white">
                            <div className="mx-auto max-w-2xl px-4 py-7 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                    {items.map((item) => (
                                        <div key={item.id} className="group relative">
                                            <img
                                                alt={item.imageAlt}
                                                src={item.imageSrc}
                                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                            />
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <h3 className="text-sm text-gray-700">
                                                        <a href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleAddToCart(item);
                                                            }}>
                                                            <span aria-hidden="true" className="absolute inset-0" />
                                                            {item.name}
                                                        </a>
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">{item.price}</p>
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                                    // onClick={() => handleAddToCart(item)}
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    + Add To Chart
                                                </button>

                                                {showSuccessModal && <ModalSuccess onClose={() => setShowSuccessModal(false)} />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}  