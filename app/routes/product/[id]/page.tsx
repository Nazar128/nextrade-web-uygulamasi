"use client";
import CommentSection from '@/components/CommentSection';
import ProductDetail from '@/components/ProductDetail';
import QuestionSection from '@/components/QuestionSection';
import { HelpCircle, MessageSquareText, ShieldCheck, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, setDoc, getDoc, doc, updateDoc, increment } from "firebase/firestore";

const Page = () => {
    const params = useParams();
    const rawId = params?.id;
    const selectedId = Array.isArray(rawId) ? rawId[0] : rawId;
    
    const [activeTab, setActiveTab] = useState('comment');
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            if (!selectedId) return;
            setLoading(true);
            try {
                const productsRef = collection(db, "products");
                const qNumber = query(productsRef, where("id", "==", Number(selectedId)));
                const querySnapshotNumber = await getDocs(qNumber);

                if (!querySnapshotNumber.empty) {
                    setProduct(querySnapshotNumber.docs[0].data());
                } else {
                    const qString = query(productsRef, where("id", "==", String(selectedId)));
                    const querySnapshotString = await getDocs(qString);
                    if (!querySnapshotString.empty) {
                        setProduct(querySnapshotString.docs[0].data());
                    } else {
                        setProduct(null);
                    }
                }
            } catch (error) {
                console.error(error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [selectedId]);

    useEffect(() => {
        if (!product || !selectedId) return;

        const analyticsRef = doc(db, "analytics", "store_stats");
        const reportView = async () => {
            if (auth.currentUser?.uid === product.sellerId) return;
            try {
                const docSnap = await getDoc(analyticsRef);
                if (!docSnap.exists()) {
                    await setDoc(analyticsRef, { totalViews: 1, activeUsers: 1 });
                } else {
                    await updateDoc(analyticsRef, {
                        totalViews: increment(1),
                        activeUsers: increment(1)
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        reportView();

        return () => {
            updateDoc(analyticsRef, {
                activeUsers: increment(-1)
            }).catch(() => {});
        };
    }, [product, selectedId]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                    <p className="text-slate-500 text-sm animate-pulse">Ürün bilgileri getiriliyor...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-6">
                <div className="text-center p-10 bg-slate-900/50 rounded-3xl border border-white/5 backdrop-blur-md">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="text-red-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Ürün Bulunamadı</h2>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen py-8 text-slate-300 mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <section className="mb-12">
                    <ProductDetail product={product} />
                </section>

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-64 flex-shrink-0">
                        <nav className="flex lg:flex-col gap-2 p-1 bg-slate-900/30 border border-slate-800/50 rounded-xl">
                            {[
                                { id: 'comment', label: 'Yorumlar', icon: <MessageSquareText size={16} /> },
                                { id: 'question', label: 'Soru & Cevap', icon: <HelpCircle size={16} /> },
                                { id: 'sartlar', label: 'Sözleşme', icon: <ShieldCheck size={16} /> },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                            ? 'bg-blue-600/10 border border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div className="flex-1 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                        {activeTab === 'comment' && selectedId && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <header className="mb-6 flex items-center gap-3 text-white">
                                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                                    <h2 className="text-xl font-bold tracking-tight">Ürün Yorumları</h2>
                                </header>
                                <CommentSection 
                                    productId={String(selectedId)} 
                                    product={product} 
                                />
                            </div>
                        )}

                        {activeTab === 'question' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <header className="mb-6 flex items-center gap-3 text-white">
                                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                                    <h2 className="text-xl font-bold tracking-tight">Ürün Soru Cevapları</h2>
                                </header>
                                <QuestionSection product={product} />
                            </div>
                        )}

                        {activeTab === 'sartlar' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-3xl">
                                <header className="mb-6 border-b border-slate-800 pb-4">
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Hizmet Sözleşmesi</h2>
                                </header>
                                <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
                                    <p>Platform üzerindeki tüm işlemler yasal mevzuatlara tabidir.</p>
                                    <p>Satıcılar, listeledikleri her ürünün orijinalliğini garanti eder.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;