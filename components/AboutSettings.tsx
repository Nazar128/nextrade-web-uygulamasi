"use client";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Loader2, Save, Plus, Trash2, Type } from 'lucide-react';

export default function AboutSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({
        heroTitle: '',
        heroSubTitle: '',
        heroBg: '',
        visionTitle: '',
        visionDesc: '',
        visionImg: '',
        visionMiniDesc: '',
        statsUser: '',
        statsCountry: '',
        features: [] as { iconName: string, title: string, description: string }[]
    });

    useEffect(() => {
        const fetchAbout = async () => {
            const docSnap = await getDoc(doc(db, "corporate", "about"));
            if (docSnap.exists()) {
                setData(docSnap.data() as any);
            }
            setLoading(false);
        };
        fetchAbout();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await setDoc(doc(db, "corporate", "about"), data);
        setSaving(false);
    };

    const addFeature = () => {
        setData({
            ...data,
            features: [...data.features, { iconName: 'Zap', title: '', description: '' }]
        });
    };

    const removeFeature = (index: number) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData({ ...data, features: newFeatures });
    };

    const updateFeature = (index: number, field: string, value: string) => {
        const newFeatures = [...data.features];
        (newFeatures[index] as any)[field] = value;
        setData({ ...data, features: newFeatures });
    };

    if (loading) return <Loader2 className="animate-spin text-blue-500" size={32} />;

    return (
        <div className="space-y-8 bg-slate-900/50 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <h3 className="text-blue-400 font-mono text-xs tracking-widest uppercase border-b border-white/5 pb-2">Hero Bölümü</h3>
                    <input 
                        value={data.heroTitle}
                        onChange={e => setData({...data, heroTitle: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl text-white text-xs outline-none focus:border-blue-500 transition-all"
                        placeholder="Hero Başlık"
                    />
                    <textarea 
                        value={data.heroSubTitle}
                        onChange={e => setData({...data, heroSubTitle: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl text-white text-xs h-28 outline-none focus:border-blue-500 transition-all"
                        placeholder="Hero Alt Başlık"
                    />
                    <input 
                        value={data.heroBg}
                        onChange={e => setData({...data, heroBg: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl text-white text-xs outline-none focus:border-blue-500 transition-all"
                        placeholder="Hero Arka Plan Görsel URL"
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-purple-400 font-mono text-xs tracking-widest uppercase border-b border-white/5 pb-2">Vizyon & Detaylar</h3>
                    <input 
                        value={data.visionTitle}
                        onChange={e => setData({...data, visionTitle: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl text-white text-xs outline-none focus:border-blue-500 transition-all"
                        placeholder="Vizyon Başlığı"
                    />
                    <textarea 
                        value={data.visionDesc}
                        onChange={e => setData({...data, visionDesc: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl text-white text-xs h-28 outline-none focus:border-blue-500 transition-all"
                        placeholder="Vizyon Açıklaması"
                    />
                    <input 
                        value={data.visionImg}
                        onChange={e => setData({...data, visionImg: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl text-white text-xs outline-none focus:border-blue-500 transition-all"
                        placeholder="Vizyon Ana Görsel URL"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <h3 className="text-emerald-400 font-mono text-xs tracking-widest uppercase">Özellik Kartları</h3>
                    <button onClick={addFeature} className="text-[10px] bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full hover:bg-emerald-500/20 transition-all flex items-center gap-1">
                        <Plus size={12} /> KART EKLE
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.features.map((feature, index) => (
                        <div key={index} className="bg-slate-800/30 p-4 rounded-2xl border border-white/5 relative group">
                            <button onClick={() => removeFeature(index)} className="absolute top-2 right-2 text-red-500/50 hover:text-red-500 transition-all">
                                <Trash2 size={16} />
                            </button>
                            <div className="grid gap-3">
                                <input 
                                    value={feature.iconName}
                                    onChange={e => updateFeature(index, 'iconName', e.target.value)}
                                    className="bg-transparent border-b border-white/10 text-xs text-blue-400 outline-none pb-1"
                                    placeholder="Icon Adı (Lucide: Zap, Shield...)"
                                />
                                <input 
                                    value={feature.title}
                                    onChange={e => updateFeature(index, 'title', e.target.value)}
                                    className="bg-transparent border-b border-white/10 text-sm font-bold text-white outline-none pb-1"
                                    placeholder="Kart Başlığı"
                                />
                                <textarea 
                                    value={feature.description}
                                    onChange={e => updateFeature(index, 'description', e.target.value)}
                                    className="bg-transparent text-xs text-slate-400 outline-none h-12"
                                    placeholder="Kart Açıklaması"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6">
                <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-2 tracking-widest">Aktif Kullanıcı Sayısı</label>
                    <input 
                        value={data.statsUser}
                        onChange={e => setData({...data, statsUser: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all"
                    />
                </div>
                <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-2 tracking-widest">Ülke Erişimi</label>
                    <input 
                        value={data.statsCountry}
                        onChange={e => setData({...data, statsCountry: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all"
                    />
                </div>
            </div>

            <button 
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gradient-to-r from-blue-600 via-gray-300 to-gray-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
            >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                KAYDET VE YAYINLA
            </button>
        </div>
    );
}