"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Shopping = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
        setIsCartEmpty(savedCart.length === 0);
    }, []);

    const updateCart = (newItems: any[]) => {
        setCartItems(newItems);
        setIsCartEmpty(newItems.length === 0);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[500px]">
            <div className="lg:col-span-8 space-y-3">
                <AnimatePresence mode="popLayout">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <motion.div 
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="group bg-white/[0.02] border border-white/5 rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4 md:gap-8 transition-all hover:bg-white/[0.04]"
                            >
                                <div className="w-full sm:w-24 h-24 bg-white/5 rounded-2xl flex-shrink-0 relative overflow-hidden">
                                    <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="font-bold text-white text-lg line-clamp-1">{item.title}</h3>
                                    <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">{item.brand}</p>
                                    <p className="text-blue-400 font-bold mt-1 sm:hidden">{item.price.toLocaleString()} TL</p>
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
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 px-6 bg-white/[0.02] rounded-[2.5rem] border border-dashed border-white/10 text-center"
                        >
                            <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 text-blue-500">
                                <ShoppingBag size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Sepetin Şu An Boş</h3>
                            <p className="text-gray-500 max-w-xs mx-auto mb-8 text-sm">Harika ürünlerimizi keşfetmek için mağazaya göz atmaya ne dersin?</p>
                            <button 
                                onClick={() => router.push('/')}
                                className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all text-sm"
                            >
                                Alışverişe Başla
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="lg:col-span-4 h-full">
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-8 sticky top-8 shadow-2xl">
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
                            <span className={shipping === 0 ? "text-green-400" : "text-white"}>
                                {shipping === 0 ? "Bedava" : `${shipping} TL`}
                            </span>
                        </div>
                        <div className="h-px bg-white/5 my-4" />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-bold">Toplam</span>
                            <span className="text-2xl font-black text-blue-500">{total.toLocaleString()} TL</span>
                        </div>
                    </div>

                    {isCartEmpty ? (
                        <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                            <AlertCircle className="text-amber-500 shrink-0" size={18} />
                            <p className="text-[11px] text-amber-200/70 leading-relaxed font-medium">
                                Ödeme adımına geçebilmek için sepetinize en az bir ürün eklemelisiniz.
                            </p>
                        </div>
                    ) : (
                        <button 
                            onClick={() => router.push("/routes/checkOut")} 
                            className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl mt-8 transition-all active:scale-95 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
                        >
                            ÖDEMEYE GEÇ
                            <motion.span 
                                animate={{ x: [0, 5, 0] }} 
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shopping;