"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Loader2 } from 'lucide-react';
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const CategoryBar = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "categories"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategories(data);
            setLoading(false);
        }, (error) => {
            console.error("Kategori çekme hatası:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return (
        <div className="sticky top-[72px] w-full bg-slate-900/40 backdrop-blur-md border-b border-white/5 z-[90] h-[57px] flex items-center px-6">
            <Loader2 size={14} className="animate-spin text-blue-500 mr-2" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Yükleniyor...</span>
        </div>
    );

    return (
        <div
            className="sticky top-[72px] w-full bg-slate-900/40 backdrop-blur-md border-b border-white/5 z-[90]"
            onMouseLeave={() => setActiveTab(null)}
        >
            <div className="max-w-[1500px] mx-auto px-2">
                <div className="flex items-center justify-start gap-1 py-3 flex-wrap lg:flex-nowrap">

                    {categories.map((item) => (
                        <div
                            key={item.id}
                            className="relative shrink-0"
                            onMouseEnter={() => setActiveTab(item.id)}
                        >
                            <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-300 ${activeTab === item.id ? 'bg-white/10 text-white shadow-lg' : 'text-blue-200 hover:text-white'}`}>
                                <span className="whitespace-nowrap uppercase tracking-wider">{item.title}</span>
                                <ChevronDown size={12} className={`transition-transform duration-300 ${activeTab === item.id ? 'rotate-180' : ''}`} />
                            </button>

                            {activeTab === item.id && item.subCategories && (
                                <div className="absolute top-full left-0 mt-2 min-w-[240px] bg-slate-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-2xl p-2 z-[100] animate-in fade-in zoom-in-95">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2 border-b border-white/5 mb-1">
                                            {item.title} Alt Kategorileri
                                        </p>

                                        {item.subCategories.map((sub: any, index: number) => {
                                            const finalId = sub.id ? String(sub.id) : index.toString();

                                            return (
                                                <Link
                                                    key={`${item.id}-${index}`}
                                                    href={`/routes/category/${finalId}`}
                                                    className="..."
                                                >
                                                    <span className="text-sm font-semibold">{sub.title}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryBar;