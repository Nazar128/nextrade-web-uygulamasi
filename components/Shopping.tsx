"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';

const Shopping = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
    }, []);

    const updateCart = (newItems: any[]) => {
        setCartItems(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));
    };

    const handleQuantity = (id: number, type: 'inc' | 'dec') => {
        const updatedItems = cartItems.map(item => {
            if (item.id === id) {
                const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: Math.max(1, newQty) };
            }
            return item;
        });
        updateCart(updatedItems);
    };

    const removeItem = (id: number) => {
        const filteredItems = cartItems.filter(item => item.id !== id);
        updateCart(filteredItems);
    };

    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = (subTotal > 5000 || cartItems.length === 0) ? 0 : 150;
    const total = subTotal + shipping;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="group bg-white/[0.02] border border-white/5 rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4 md:gap-8 transition-all hover:bg-white/[0.04]">
                            <div className="w-full sm:w-24 h-24 bg-white/5 rounded-2xl flex-shrink-0 relative overflow-hidden">
                                <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-bold text-white text-lg line-clamp-1">{item.title}</h3>
                                <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">{item.brand}</p>
                                <p className="text-blue-400 font-bold mt-1 sm:hidden">{item.price} TL</p>
                            </div>

                            <div className="flex items-center bg-black/40 rounded-xl border border-white/10 p-1">
                                <button onClick={() => handleQuantity(item.id, 'dec')} className="p-2 text-gray-400 hover:text-white"><Minus size={16}/></button>
                                <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                                <button onClick={() => handleQuantity(item.id, 'inc')} className="p-2 text-gray-400 hover:text-white"><Plus size={16}/></button>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                                <span className="hidden sm:block font-black text-xl text-white">{(item.price * item.quantity).toLocaleString()} TL</span>
                                <button onClick={() => removeItem(item.id)} className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                                <span className="sm:hidden font-black text-xl text-white">{(item.price * item.quantity).toLocaleString()} TL</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white/[0.02] rounded-[2.5rem] border border-dashed border-white/10">
                        <p className="text-gray-500">Sepetinizde ürün bulunmuyor.</p>
                    </div>
                )}
            </div>

            <div className="lg:col-span-4">
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-8 sticky top-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CreditCard size={20} className="text-blue-500" /> Sipariş Özeti
                    </h2>
                    
                    <div className="space-y-4 text-sm md:text-base">
                        <div className="flex justify-between text-gray-400">
                            <span>Ara Toplam</span>
                            <span className="text-white font-bold">{subTotal.toLocaleString()} TL</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Kargo</span>
                            <span className={shipping === 0 ? "text-green-400" : "text-white"}>{shipping === 0 ? "Bedava" : `${shipping} TL`}</span>
                        </div>
                        <div className="h-px bg-white/5 my-4" />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-bold">Toplam</span>
                            <span className="text-2xl font-black text-blue-500">{total.toLocaleString()} TL</span>
                        </div>
                    </div>

                    <button className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl mt-8 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                        ÖDEMEYE GEÇ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shopping;