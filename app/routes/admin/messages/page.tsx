"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, CheckCircle, AlertCircle, Eye, X, Clock, User, Tag, HelpCircle, Save, Sparkles, Mail } from 'lucide-react';

export default function AdminMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMsg, setSelectedMsg] = useState<any | null>(null);
    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
    const [faqDraft, setFaqDraft] = useState({ question: '', answer: '', category: 'Genel' });

    useEffect(() => {
        const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const toggleStatus = async (id: string, current: string) => {
        await updateDoc(doc(db, "contactMessages", id), { status: current === 'unread' ? 'read' : 'unread' });
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm('Mesaj silinsin mi?')) {
            await deleteDoc(doc(db, "contactMessages", id));
            if (selectedMsg?.id === id) setSelectedMsg(null);
        }
    };

    const openMessage = async (msg: any) => {
        setSelectedMsg(msg);
        if (msg.status === 'unread') {
            await updateDoc(doc(db, "contactMessages", msg.id), { status: 'read' });
        }
    };

    const handlePrepareFAQ = (msg: any) => {
        setFaqDraft({ question: msg.subject, answer: msg.message, category: 'Genel' });
        setIsFAQModalOpen(true);
    };

    const saveAsFAQ = async () => {
        try {
            await addDoc(collection(db, "faqs"), {
                ...faqDraft,
                order: 0,
                status: 'published',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            setIsFAQModalOpen(false);
            alert("SSS Eklendi.");
        } catch (e) { console.error(e); }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500 font-mono text-xs tracking-widest">LOADING...</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-4 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight uppercase text-blue-600">Gelen <span className="text-slate-600 text-3xl">Kutusu</span></h1>
                        <p className="text-slate-500 text-[10px] font-mono mt-1 uppercase tracking-wider">{messages.length} Aktif Etkileşim</p>
                    </div>
                </header>
                
                <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-md">
                    <table className="w-full text-left text-sm border-separate border-spacing-0">
                        <thead className="bg-slate-800/30 text-slate-500 text-[12px] m-8 uppercase font-bold tracking-widest">
                            <tr className='m-4'>
                                <th className="p-5 border-b border-slate-800">GÖNDEREN</th>
                                <th className="p-5 border-b border-slate-800">KONU</th>
                                <th className="p-5 border-b border-slate-800 text-center">DURUM</th>
                                <th className="p-5 border-b border-slate-800 text-right">İŞLEM</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/20 text-xs">
                            {messages.map((m) => (
                                <tr key={m.id} onClick={() => openMessage(m)} className="group cursor-pointer hover:bg-white/[0.02] transition-colors">
                                    <td className="p-5">
                                        <div className="font-bold text-slate-200">{m.name}</div>
                                        <div className="text-[10px] text-slate-500 font-mono lowercase">{m.email}</div>
                                    </td>
                                    <td className="p-5 font-medium text-slate-400 italic">#{m.subject}</td>
                                    <td className="p-5 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-tighter ${m.status === 'unread' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                            {m.status === 'unread' ? 'YENİ' : 'OKUNDU'}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right flex justify-end gap-3">
                                        <button onClick={(e) => handleDelete(e, m.id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedMsg && !isFAQModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500"><Mail size={20} /></div>
                                <button onClick={() => setSelectedMsg(null)} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{selectedMsg.name}</h3>
                            <p className="text-xs text-slate-500 font-mono mb-6">{selectedMsg.email}</p>
                            
                            <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 text-slate-300 text-sm leading-relaxed mb-6 italic min-h-[100px]">
                                "{selectedMsg.message}"
                            </div>

                            <div className="flex flex-col gap-2">
                                <button onClick={() => handlePrepareFAQ(selectedMsg)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                    <Sparkles size={14} /> SSS'ye Dönüştür
                                </button>
                                <button onClick={() => setSelectedMsg(null)} className="w-full bg-slate-800 text-slate-400 font-bold py-3.5 rounded-xl hover:text-white transition-all text-xs uppercase tracking-widest">Kapat</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isFAQModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in zoom-in-95 duration-200">
                    <div className="bg-slate-900 border border-blue-500/20 w-full max-w-lg rounded-3xl shadow-2xl">
                        <div className="p-8">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <HelpCircle size={16} className="text-blue-500" /> SSS TASLAĞI
                            </h4>
                            <div className="space-y-4">
                                <input 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:border-blue-500 outline-none font-bold italic"
                                    value={faqDraft.question}
                                    onChange={(e) => setFaqDraft({...faqDraft, question: e.target.value})}
                                    placeholder="Soru..."
                                />
                                <textarea 
                                    rows={4}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 focus:border-blue-500 outline-none font-medium italic"
                                    value={faqDraft.answer}
                                    onChange={(e) => setFaqDraft({...faqDraft, answer: e.target.value})}
                                    placeholder="Cevap..."
                                />
                                <select 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-[10px] text-slate-400 font-black uppercase outline-none cursor-pointer"
                                    value={faqDraft.category}
                                    onChange={(e) => setFaqDraft({...faqDraft, category: e.target.value})}
                                >
                                    {['Genel', 'Ödeme', 'Kargo', 'İade', 'Hesap'].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button onClick={saveAsFAQ} className="flex-1 bg-white text-black font-black py-3.5 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-[10px] uppercase tracking-widest">KAYDET</button>
                                <button onClick={() => setIsFAQModalOpen(false)} className="px-6 bg-slate-800 text-slate-500 font-bold rounded-xl hover:text-white transition-all text-[10px] uppercase">İPTAL</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}