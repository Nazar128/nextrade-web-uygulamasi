"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, CheckCircle2, AlertCircle, X } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

interface BannerState {
    show: boolean;
    type: 'success' | 'error';
    message: string;
}

export default function ContactPage() {
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Genel Destek',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [banner, setBanner] = useState<BannerState>({
        show: false,
        type: 'success',
        message: ''
    });

    useEffect(() => {
        if (banner.show) {
            const timer = setTimeout(() => setBanner(prev => ({ ...prev, show: false })), 5000);
            return () => clearTimeout(timer);
        }
    }, [banner.show]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        if (!recaptchaToken) {
            setBanner({ show: true, type: 'error', message: 'Lütfen robot olmadığınızı doğrulayın.' });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, recaptcha: recaptchaToken }),
            });

            const data = await response.json();

            if (response.ok) {
                setBanner({ show: true, type: 'success', message: 'Mesajınız başarıyla iletildi!' });
                setFormData({ name: '', email: '', subject: 'Genel Destek', message: '' });
                setRecaptchaToken(null);
            } else {
                throw new Error(data.message || "Hata oluştu");
            }
        } catch (error: any) {
            setBanner({ show: true, type: 'error', message: error.message || 'Bir hata oluştu.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white w-full overflow-x-hidden relative">
            {banner.show && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in zoom-in duration-300">
                    <div className={`flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[320px] ${
                        banner.type === 'success' 
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                        : 'bg-red-500/20 border-red-500/50 text-red-400'
                    }`}>
                        {banner.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        <p className="flex-1 font-bold">{banner.message}</p>
                        <button onClick={() => setBanner(prev => ({ ...prev, show: false }))}><X size={20} /></button>
                    </div>
                </div>
            )}

            <section className="relative pt-12 pb-12 px-6 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10"></div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">
                    BİZE <span className="text-blue-500 font-sans not-italic font-extrabold">ULAŞIN</span>
                </h1>
            </section>

            <section className="max-w-[1440px] mx-auto px-4 py-2 grid lg:grid-cols-2 gap-12 mb-12">
                <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl text-left">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <MessageSquare className="text-blue-400" /> Mesaj Gönderin
                    </h2>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-200 ml-2">Ad Soyad</label>
                                <input 
                                    type="text" required value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="Nazar kalçık" 
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:border-blue-500 outline-none transition" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-200 ml-2">E-Posta</label>
                                <input 
                                    type="email" required value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="nazar@example.com" 
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:border-blue-500 outline-none transition" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-200 ml-2">Konu</label>
                            <select 
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:border-blue-500 outline-none transition appearance-none"
                            >
                                <option value="Genel Destek" className="bg-slate-900">Genel Destek</option>
                                <option value="Satıcı Olma Hakkında" className="bg-slate-900">Satıcı Olma Hakkında</option>
                                <option value="Teknik Sorun" className="bg-slate-900">Teknik Sorun</option>
                                <option value="Diğer" className="bg-slate-900">Diğer</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-200 ml-2">Mesajınız</label>
                            <textarea 
                                rows={5} required value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                placeholder="Nasıl yardımcı olabiliriz?" 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:border-blue-500 outline-none transition resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-center py-2 overflow-hidden rounded-xl">
                            <ReCAPTCHA
                                sitekey="6LdIlo4sAAAAAHV6CD06jGZgcu2XUrVKauPsvj6R"
                                theme="dark"
                                onChange={(token) => setRecaptchaToken(token)}
                                onExpired={() => setRecaptchaToken(null)}
                            />
                        </div>

                        <button 
                            type="submit" disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-800 via-gray-400 to-blue-800 text-white font-bold py-5 rounded-2xl transition flex items-center justify-center gap-3 group disabled:opacity-50"
                        >
                            {loading ? "GÖNDERİLİYOR..." : "GÖNDER"} 
                            {!loading && <Send size={20} className="group-hover:translate-x-2 transition" />}
                        </button>
                    </form>
                </div>

                <div className="flex flex-col justify-between">
                    <div className="grid grid-cols-1 gap-8 text-left">
                        <ContactInfo icon={<Phone size={32} />} label="TELEFON" value="+90 (212) 000 00 00" color="text-blue-500" bgColor="bg-blue-500/10" />
                        <ContactInfo icon={<Mail size={32} />} label="E-POSTA" value="destek@nextrade.com" color="text-emerald-500" bgColor="bg-emerald-500/10" />
                        <ContactInfo icon={<MapPin size={32} />} label="MERKEZ OFİS" value="Teknoloji Vadisi, No: 42, İstanbul" color="text-purple-500" bgColor="bg-purple-500/10" />
                    </div>

                    <div className="mt-12 h-64 rounded-[2rem] overflow-hidden relative border border-slate-800 group">
                        <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2000" className="w-full h-full object-cover grayscale brightness-75 transition duration-700" alt="Global" />
                        <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs flex items-center gap-2">
                            <Globe size={14} className="animate-spin" /> Global Operasyon Merkezi
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ContactInfo({ icon, label, value, color, bgColor }: { icon: React.ReactNode, label: string, value: string, color: string, bgColor: string }) {
    return (
        <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/50 transition">
            <div className={`${bgColor} ${color} p-4 rounded-2xl`}>{icon}</div>
            <div>
                <p className="text-slate-500 text-xs font-mono">// {label}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
}