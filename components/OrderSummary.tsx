"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

interface OrderSummaryProps {
    isFinalStep: boolean;
    addressData?: any; 
    paymentMethod?: any;
}

const OrderSummary = ({ isFinalStep, addressData, paymentMethod }: OrderSummaryProps) => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe: any;
        const loadCart = () => {
            const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (auth.currentUser) {
                const cartRef = doc(db, "carts", auth.currentUser.uid);
                unsubscribe = onSnapshot(cartRef, (docSnap) => {
                    if (docSnap.exists() && docSnap.data().items?.length > 0) {
                        setCartItems(docSnap.data().items);
                    } else {
                        setCartItems(localCart);
                    }
                    setLoading(false);
                });
            } else {
                setCartItems(localCart);
                setLoading(false);
            }
        };
        loadCart();
        return () => unsubscribe && unsubscribe();
    }, []);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = (subtotal > 5000 || cartItems.length === 0) ? 0 : 150;
    const total = subtotal + shipping;

    const handleConfirmOrder = async () => {
        if (!isFinalStep || !paymentMethod) return;

        try {
            const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            const orderData = {
                orderId,
                userId: auth.currentUser?.uid || "guest",
                items: cartItems,
                address: addressData,
                payment: {
                    type: paymentMethod.method,
                    transactionId: paymentMethod.token || "COD_PENDING",
                    last4: paymentMethod.last4 || null
                },
                totalAmount: total,
                status: paymentMethod.method === 'CARD' ? "paid" : "pending",
                createdAt: new Date().toISOString()
            };

            await setDoc(doc(db, "orders", orderId), orderData);
            if (auth.currentUser) await setDoc(doc(db, "carts", auth.currentUser.uid), { items: [] });
            localStorage.removeItem('cart');
            
            router.push(`/routes/success?orderId=${orderId}`);
        } catch (error) {
            alert("Hata oluştu, tekrar deneyin.");
        }
    };

    if (loading) return <div className="p-8 text-white/50 text-center text-xs font-bold uppercase tracking-widest">Hesaplanıyor...</div>;

    return (
        <div className='w-full bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 shadow-2xl text-white'>
            <h2 className='text-xl font-bold mb-6 border-b border-white/10 pb-4'>Sipariş Özeti</h2>
            <div className='space-y-4 max-h-64 overflow-y-auto pr-2 mb-6'>
                {cartItems.map((item) => (
                    <div key={item.id} className='flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-3'>
                            <div className="relative">
                                <img src={item.image} alt={item.title} className='w-12 h-12 rounded-xl object-cover bg-white/5 border border-white/10' />
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{item.quantity}</span>
                            </div>
                            <div className="min-w-0">
                                <p className='text-sm font-bold truncate w-32'>{item.title}</p>
                                <p className='text-[10px] text-gray-400 uppercase'>{item.brand}</p>
                            </div>
                        </div>
                        <p className='text-sm font-black'>{(item.price * item.quantity).toLocaleString('tr-TR')} TL</p>
                    </div>
                ))}
            </div>

            <div className='space-y-3 border-t border-white/10 pt-4'>
                <div className='flex justify-between text-sm text-gray-400'>
                    <span>Ara Toplam</span>
                    <span className='text-white'>{subtotal.toLocaleString('tr-TR')} TL</span>
                </div>
                <div className='flex justify-between text-sm text-gray-400'>
                    <span>Kargo</span>
                    <span className={shipping === 0 ? 'text-green-400 font-bold' : 'text-white'}>{shipping === 0 ? 'Ücretsiz' : `${shipping} TL`}</span>
                </div>
                <div className='flex justify-between text-2xl font-black mt-6 pt-4 border-t border-white/20 text-blue-500'>
                    <span className="text-white text-lg">Toplam</span>
                    <span>{total.toLocaleString('tr-TR')} TL</span>
                </div>
            </div>

            <button
                onClick={handleConfirmOrder}
                disabled={!isFinalStep}
                className={`w-full font-black py-4 rounded-2xl mt-8 transition-all duration-300 uppercase tracking-widest text-xs ${isFinalStep ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/30' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
            >
                {isFinalStep ? "Siparişi Onayla" : "Ödemeyi Doğrulayın"}
            </button>
        </div>
    );
};

export default OrderSummary;