"use client"
import AboutHero from '@/components/AboutHero';
import InfoCard from '@/components/InfoCard';
import { Zap, ShieldCheck, ShoppingBag, TrendingUp, Globe, Cpu, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
    const router = useRouter();
    return (
        <main className="bg-slate-950 min-h-screen w-full overflow-x-hidden">
            <AboutHero />
            <section className="w-full px-6 md:px-20 -mt-32 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <InfoCard
                        icon={<Zap size={32} />}
                        title="Süper Hız"
                        description="İşlemler saniyeler içinde gerçekleşir, beklemeye son."
                    />
                    <InfoCard
                        icon={<ShieldCheck size={32} />}
                        title="Kırılmaz Güven"
                        description="Blockchain seviyesinde güvenlik ve koruma protokolleri."
                    />
                    <InfoCard
                        icon={<Globe size={32} />}
                        title="Global Erişim"
                        description="Dünyanın her yerinden satıcı ve alıcıya kapımız açık."
                    />
                    <InfoCard
                        icon={<Leaf size={32} />}
                        title="Yeşil Lojistik"
                        description="Karbon ayak izini minimize eden, doğa dostu teslimat süreçleri."
                    />
                </div>
            </section>

            <section className="py-40 w-full px-6 md:px-20 grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2rem]">
                        <img
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                            className="w-full h-[600px] object-cover transition-transform duration-[5000ms] group-hover:scale-110"
                            alt="Fütüristik Vizyon"
                        />
                        <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 max-w-xs">
                            <p className="text-blue-400 font-mono text-xs mb-2 underline"></p>
                            <p className="text-white text-sm">Tam otonom lojistik ve sıfır karbon salınımı ile ticaretin geleceğini kuruyoruz.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-blue-500 font-mono tracking-[0.3em] text-sm ">Vizyonumuz</h2>
                        <h3 className="text-5xl md:text-6xl font-bold text-white leading-tight ">
                            Alışverişi <br /> Yeniden Kodluyoruz.
                        </h3>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed">
                        Marketplace projemiz sadece ürün satılan bir yer değil; verinin, teknolojinin ve kullanıcı deneyiminin kusursuz bir uyumla birleştiği bir **dijital evrendir.**
                    </p>

                    <div className="grid grid-cols-2 gap-8 border-t border-slate-800 pt-10">
                        <div>
                            <p className="text-3xl font-bold text-white tracking-tighter">10M+</p>
                            <p className="text-slate-500 text-sm  tracking-widest">AKTİF KULLANICI</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white italic tracking-tighter">100+</p>
                            <p className="text-slate-500 text-sm  tracking-widest">ÜLKE ERİŞİMİ</p>
                        </div>
                    </div>

                    <button onClick={() => router.push("/")} className="group flex items-center gap-4 text-white font-bold bg-gradient-to-r from-blue-900 via-slate-300 to-blue-900 hover:bg-blue-700 px-8 py-4 rounded-full transition-all">
                        EKOSİSTEMİ İNCELE
                        <Zap className="group-hover:animate-pulse" size={20} />
                    </button>
                </div>
            </section>
        </main>
    );
}