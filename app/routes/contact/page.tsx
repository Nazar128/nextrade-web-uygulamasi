import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white w-full overflow-x-hidden">

            <section className="relative pt-12 pb-12 px-6 text-center border-slate-900">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10"></div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter  mb-4">
                    BİZE <span className="text-blue-500 font-sans not-italic font-extrabold">BAĞLANIN</span>
                </h1>
                <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                    Sorularınız, iş birliği teklifleriniz veya sadece merhaba demek için dijital kapımız her zaman açık.
                </p>
            </section>

            <section className="max-w-[1440px] mx-auto px-4 py-2 grid lg:grid-cols-2 gap-12">

                <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <MessageSquare className="text-blue-400" /> Mesaj Gönderin
                    </h2>

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-200 ml-2">Ad Soyad</label>
                                <input type="text" placeholder="Nazar kalçık" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:border-blue-500 outline-none transition" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-200 ml-2  ">E-Posta</label>
                                <input type="email" placeholder="nazar@example.com" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:border-blue-500 outline-none transition" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-200 ml-2  ">Konu</label>
                            <select className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:border-blue-500 outline-none transition appearance-none">
                                <option>Genel Destek</option>
                                <option>Satıcı Olma Hakkında</option>
                                <option>Teknik Sorun</option>
                                <option>Diğer</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-200 ml-2 ">Mesajınız</label>
                            <textarea rows={5} placeholder="Nasıl yardımcı olabiliriz?" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:border-blue-500 outline-none transition resize-none"></textarea>
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-800 via-gray-400 to-blue-800 hover: from-blue-800 via-gray-400 to-blue-800 text-white font-bold py-5 rounded-2xl transition flex items-center justify-center gap-3 group shadow-lg shadow-blue-500/20">
                            GÖNDER <Send size={20} className="group-hover:translate-x-2 transition" />
                        </button>
                    </form>
                </div>

                <div className="flex flex-col justify-between">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/50 transition">
                            <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500">
                                <Phone size={32} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-mono">// TELEFON</p>
                                <p className="text-xl font-bold">+90 (212) 000 00 00</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/50 transition">
                            <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-500">
                                <Mail size={32} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-mono">// E-POSTA</p>
                                <p className="text-xl font-bold">destek@nextrade.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/50 transition">
                            <div className="bg-purple-500/10 p-4 rounded-2xl text-purple-500">
                                <MapPin size={32} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-mono">// MERKEZ OFİS</p>
                                <p className="text-xl font-bold ">Teknoloji Vadisi, No: 42, İstanbul</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 h-64 rounded-[2rem] overflow-hidden relative border border-slate-800 group">
                        <div className="absolute inset-0 bg-blue-600/10 z-10 pointer-events-none group-hover:bg-transparent transition duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2000"
                            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition duration-700 ease-in-out"
                            alt="Global E-Ticaret Ağı"
                        />
                        <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs flex items-center gap-2">
                            <Globe size={14} className="animate-spin-slow" /> Global Operasyon Merkezi
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}