"use client";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AboutHero from '@/components/AboutHero';
import InfoCard from '@/components/InfoCard';
import * as Icons from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const docSnap = await getDoc(doc(db, "corporate", "about"));
            if (docSnap.exists()) {
                setData(docSnap.data());
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="h-screen bg-slate-950 flex items-center justify-center">
            <Icons.Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
    );

    return (
        <main className="bg-slate-950 min-h-screen w-full overflow-x-hidden">
            <AboutHero 
                title={data?.heroTitle} 
                subTitle={data?.heroSubTitle} 
                bgImage={data?.heroBg} 
            />
            
            <section className="w-full px-6 md:px-20 -mt-32 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data?.features?.map((item: any, index: number) => {
                        const IconComponent = (Icons as any)[item.iconName || 'Zap'];
                        return (
                            <InfoCard 
                                key={index}
                                icon={<IconComponent size={32} />} 
                                title={item.title} 
                                description={item.description} 
                            />
                        );
                    }) || (
                        <p className="text-white">İçerik yüklenemedi...</p>
                    )}
                </div>
            </section>

            <section className="py-40 w-full px-6 md:px-20 grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2rem]">
                        <img
                            src={data?.visionImg}
                            className="w-full h-[600px] object-cover transition-transform duration-[5000ms] group-hover:scale-110"
                            alt="Vision"
                        />
                        <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 max-w-xs">
                            <p className="text-white text-sm">{data?.visionMiniDesc}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-blue-500 font-mono tracking-[0.3em] text-sm ">Vizyonumuz</h2>
                        <h3 className="text-5xl md:text-6xl font-bold text-white leading-tight ">
                            {data?.visionTitle}
                        </h3>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed">
                        {data?.visionDesc}
                    </p>

                    <div className="grid grid-cols-2 gap-8 border-t border-slate-800 pt-10">
                        <div>
                            <p className="text-3xl font-bold text-white tracking-tighter">{data?.statsUser}</p>
                            <p className="text-slate-500 text-sm tracking-widest uppercase">AKTİF KULLANICI</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white italic tracking-tighter">{data?.statsCountry}</p>
                            <p className="text-slate-500 text-sm tracking-widest uppercase">ÜLKE ERİŞİMİ</p>
                        </div>
                    </div>

                    <button onClick={() => router.push("/")} className="group flex items-center gap-4 text-white font-bold bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-full transition-all">
                        EKOSİSTEMİ İNCELE
                        <Icons.Zap className="group-hover:animate-pulse" size={20} />
                    </button>
                </div>
            </section>
        </main>
    );
}