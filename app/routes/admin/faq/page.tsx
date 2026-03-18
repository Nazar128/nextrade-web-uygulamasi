"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, Edit3, Plus, X, Save, HelpCircle, GripVertical, Check } from 'lucide-react';

export default function FAQManagement() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'Genel',
        order: 0,
        status: 'published'
    });

    const categories = ['Genel', 'Ödeme', 'Kargo', 'İade', 'Hesap'];

    useEffect(() => {
        const q = query(collection(db, "faqs"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setFaqs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { 
            ...formData, 
            order: Number(formData.order) || 0,
            updatedAt: serverTimestamp() 
        };

        if (editingFaq) {
            await updateDoc(doc(db, "faqs", editingFaq.id), data);
        } else {
            await addDoc(collection(db, "faqs"), { ...data, createdAt: serverTimestamp() });
        }
        
        closeModal();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Bu soruyu silmek istediğinize emin misiniz?')) {
            await deleteDoc(doc(db, "faqs", id));
        }
    };

    const openModal = (faq: any = null) => {
        if (faq) {
            setEditingFaq(faq);
            setFormData({
                question: faq.question,
                answer: faq.answer,
                category: faq.category,
                order: faq.order,
                status: faq.status
            });
        } else {
            setEditingFaq(null);
            setFormData({ 
                question: '', 
                answer: '', 
                category: 'Genel', 
                order: faqs ? faqs.length : 0, 
                status: 'published' 
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingFaq(null);
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black tracking-widest text-xs">YÜKLENİYOR...</div>;

    return (
        <div className="min-h-screen  text-white p-4 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl text-blue-600 font-black tracking-tighter leading-none">
                            SSS <span className="text-slate-500 text-2xl md:text-3xl">YÖNETİMİ</span>
                        </h1>
                        <p className="text-slate-500 text-xs mt-3 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                            Dinamik yardım merkezi içerikleri.
                        </p>
                    </div>
                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-black text-xs  transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                    >
                        <Plus size={18} /> Yeni Soru Ekle
                    </button>
                </div>

                <div className="space-y-4">
                    {faqs.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-slate-900 rounded-[3rem]">
                            <HelpCircle size={48} className="mx-auto text-slate-800 mb-4" />
                            <p className="text-slate-600 font-bold  tracking-widest text-sm">Henüz soru eklenmemiş.</p>
                        </div>
                    ) : (
                        faqs.map((f) => (
                            <div key={f.id} className="group bg-slate-900/40 border border-slate-800/50 p-6 md:p-8 rounded-[2rem] backdrop-blur-3xl hover:border-blue-500/30 transition-all flex items-center gap-6 shadow-xl">
                                <div className="hidden md:block text-slate-700">
                                    <GripVertical size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] font-black text-blue-500  tracking-widest bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                                            {f.category}
                                        </span>
                                        {f.status === 'published' ? (
                                            <span className="flex items-center gap-1 text-[9px] text-emerald-500 font-bold tracking-widest bg-emerald-500/10 px-2 py-1 rounded-lg">
                                                <Check size={10} /> Yayında
                                            </span>
                                        ) : (
                                            <span className="text-[9px] text-amber-500 font-bold  tracking-widest bg-amber-500/10 px-2 py-1 rounded-lg">Taslak</span>
                                        )}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-black text-white mb-2 leading-tight  tracking-tight ">
                                        {f.question}
                                    </h3>
                                    <p className="text-slate-500 text-sm md:text-base line-clamp-2  leading-relaxed">
                                        {f.answer}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => openModal(f)}
                                        className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                    >
                                        <Edit3 size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(f.id)}
                                        className="p-3 bg-slate-800 text-slate-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-8 md:p-14">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl md:text-3xl font-black text-white  tracking-tighter leading-none">
                                    {editingFaq ? 'Soruyu Düzenle' : 'Yeni Soru Oluştur'}
                                </h2>
                                <button type="button" onClick={closeModal} className="p-2 text-slate-500 hover:text-white transition-all">
                                    <X size={32} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-500  tracking-[0.2em] mb-3 block">Soru Metni</label>
                                    <input 
                                        required
                                        className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-bold "
                                        placeholder="Örn: İade politikanız nedir?"
                                        value={formData.question}
                                        onChange={(e) => setFormData({...formData, question: e.target.value})}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-500 tracking-[0.2em] mb-3 block">Cevap Metni</label>
                                    <textarea 
                                        required
                                        rows={4}
                                        className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-medium leading-relaxed "
                                        placeholder="Cevabı buraya detaylıca yazın..."
                                        value={formData.answer}
                                        onChange={(e) => setFormData({...formData, answer: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-500  tracking-[0.2em] mb-3 block">Kategori</label>
                                    <select 
                                        className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 text-white focus:outline-none focus:border-blue-500 appearance-none font-bold cursor-pointer"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    >
                                        {categories.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-500  tracking-[0.2em] mb-3 block">Sıralama (Order)</label>
                                    <input 
                                        type="number"
                                        className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 text-white focus:outline-none focus:border-blue-500 font-bold"
                                        value={isNaN(formData.order) ? '' : formData.order}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            setFormData({...formData, order: isNaN(val) ? 0 : val});
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-12 pt-10 border-t border-slate-800/50">
                                <button 
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-3 text-xs md:text-sm shadow-xl"
                                >
                                    <Save size={20} /> Değişiklikleri Kaydet
                                </button>
                                <button 
                                    type="button" 
                                    onClick={closeModal}
                                    className="px-8 md:px-12 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-[1.5rem] transition-all text-xs md:text-sm"
                                >
                                    Vazgeç
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}