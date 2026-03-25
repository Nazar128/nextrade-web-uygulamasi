"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { CheckCircle2, Package, Calendar, ArrowRight, Loader2 } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderIdFromUrl = searchParams.get('orderId');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderIdFromUrl) {
                try {
                    const ordersRef = collection(db, "orders");
                    const q = query(ordersRef, where("orderId", "==", orderIdFromUrl));
                    const querySnapshot = await getDocs(q);
                    
                    if (!querySnapshot.empty) {
                        setOrder(querySnapshot.docs[0].data());
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            setLoading(false);
        };
        fetchOrder();
    }, [orderIdFromUrl]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
            <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
    );

    return (
        <div className="min-h-screen mx-auto mt-6 flex items-start justify-center p-4 overflow-hidden relative">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -z-10" />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border border-white/20 shadow-2xl text-center relative"
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] mb-8"
                >
                    <CheckCircle2 size={48} className="text-white" />
                </motion.div>

                <h1 className="text-3xl font-black text-white tracking-tight uppercase">Siparişiniz Alındı!</h1>
                
                <p className="text-gray-400 mt-3">
                    Harika bir seçim yaptın, {order?.address?.fullName?.split(' ')[0] || 'Müşterimiz'}!
                </p>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-10 space-y-4 text-left">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Package size={16} />
                            <span>Sipariş No:</span>
                        </div>
                        <span className="text-white font-mono font-bold">#{orderIdFromUrl || "---"}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Calendar size={16} />
                            <span>Toplam Tutar:</span>
                        </div>
                        <span className="text-green-400 font-bold">
                            {order?.totalAmount ? `${order.totalAmount.toLocaleString('tr-TR')} TL` : '0 TL'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-10">
                    <Link href="/">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-white text-black rounded-2xl font-black tracking-wide shadow-xl hover:bg-gray-100 flex items-center justify-center gap-2 text-xs uppercase"
                        >
                            ALIŞVERİŞE DEVAM ET <ArrowRight size={18} />
                        </motion.button>
                    </Link>
                    
                    <Link href="/routes/orders">
                        <button className="w-full py-2 bg-transparent text-gray-400 hover:text-white rounded-2xl font-bold transition-all text-xs tracking-widest uppercase">
                            Siparişimi Takip Et
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={null}>
            <SuccessContent />
        </Suspense>
    );
}