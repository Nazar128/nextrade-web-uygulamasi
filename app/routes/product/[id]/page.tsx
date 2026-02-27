"use client";
import CommentSection from '@/components/CommentSection';
import ProductDetail from '@/components/ProductDetail';
import QuestionSection from '@/components/QuestionSection';
import { products } from '@/data/products';
import { HelpCircle, MessageSquareText, ShieldCheck } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
    const params = useParams();
    const selectedId = params.id;
    const product = products.find((p) => p.id === Number(selectedId));
    const [activeTab, setActiveTab] = useState('comment');

    if (!product) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-6">
                <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-white">Ürün Bulunamadı</h2>
                    <p className="text-slate-400 mt-2 text-sm">Aradığınız ürün stoklarımızda kalmamış olabilir.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen py-8  text-slate-300 mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <section className="mb-12">
                    <ProductDetail />
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
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        activeTab === tab.id
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
                        
                        {activeTab === 'comment' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <header className="mb-6 flex items-center gap-3 text-white">
                                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                                    <h2 className="text-xl font-bold tracking-tight">Ürün Yorumları</h2>
                                </header>
                                <CommentSection />
                            </div>
                        )}

                        {activeTab === 'question' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <header className="mb-6 flex items-center gap-3 text-white">
                                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                                    <h2 className="text-xl font-bold tracking-tight">Ürün Soru Cevapları</h2>
                                </header>
                                <QuestionSection productId={product.id} />
                            </div>
                        )}

                        {activeTab === 'sartlar' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-3xl">
                                <header className="mb-6 border-b border-slate-800 pb-4">
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Hizmet Sözleşmesi</h2>
                                </header>
                                <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
                                    <section>
                                        <h4 className="text-[10px] text-blue-500 font-bold tracking-widest uppercase mb-2">// 1.0 Genel Şartlar</h4>
                                        <p>Platform üzerindeki tüm işlemler yasal mevzuatlara tabidir. Kullanıcılar, etik ticaret kurallarına uymakla yükümlüdür.</p>
                                    </section>
                                    <section>
                                        <h4 className="text-[10px] text-blue-500 font-bold tracking-widest uppercase mb-2">// 2.0 Satıcı Sorumlulukları</h4>
                                        <p>Satıcılar, listeledikleri her ürünün orijinalliğini ve kalitesini garanti eder. Yanıltıcı içerikler sistem tarafından denetlenir.</p>
                                    </section>
                                    <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg text-xs italic text-blue-300">
                                        *Bu şartlar periyodik olarak güncellenmektedir.
                                    </div>
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