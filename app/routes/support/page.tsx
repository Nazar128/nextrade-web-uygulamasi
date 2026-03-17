"use client";
import React, { useState, useEffect } from 'react';
import { HelpCircle, ShieldCheck, FileText, ChevronDown, Sparkles } from 'lucide-react';
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('sss');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [legalData, setLegalData] = useState({
    privacy: { title: 'Dijital Veri Gizliliği', content: '' },
    terms: { title: 'Hizmet Kullanım Sözleşmesi', content: '' }
  });

  useEffect(() => {
    const unsubPrivacy = onSnapshot(doc(db, "legal", "privacy"), (doc) => {
      if (doc.exists()) setLegalData(prev => ({ ...prev, privacy: doc.data() as any }));
    });
    const unsubTerms = onSnapshot(doc(db, "legal", "terms"), (doc) => {
      if (doc.exists()) setLegalData(prev => ({ ...prev, terms: doc.data() as any }));
    });
    return () => { unsubPrivacy(); unsubTerms(); };
  }, []);

  const faqs = [
    { q: "Global Satıcı Ekosistemine Nasıl Katılırım?", a: "Marketplace platformumuzda satıcı olmak için..." },
    { q: "Lojistik ve Teslimat Süreçleri Nasıl Yönetiliyor?", a: "Platformumuz, 'Smart-Route' teknolojisi ile..." },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 w-full pt-12 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-l-4 border-blue-600 pl-8">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
            Destek & <span className="text-blue-500 not-italic">Hukuk</span>
          </h1>
          <p className="text-slate-200 max-w-3xl text-lg font-light leading-relaxed">
            Şeffaflık, dijital ekosistemimizin temel taşıdır.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          <aside className="space-y-3">
            {[
              { id: 'sss', label: 'Sıkça Sorulan Sorular', icon: <HelpCircle size={18} /> },
              { id: 'gizlilik', label: 'Gizlilik Politikası', icon: <ShieldCheck size={18} /> },
              { id: 'sartlar', label: 'Kullanım Koşulları', icon: <FileText size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all border ${
                  activeTab === tab.id 
                  ? 'bg-slate-600 border-blue-500 text-white shadow-2xl' 
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-200'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </aside>

          <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-md shadow-inner">
            {activeTab === 'sss' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                   <span className="w-10 h-[2px] bg-blue-500"></span> Operasyonel Detaylar
                </h2>
                {faqs.map((faq, index) => (
                  <div key={index} className="group border border-slate-800/50 rounded-3xl overflow-hidden bg-slate-900/80 transition-all">
                    <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left outline-none">
                      <span className={`font-bold ${openFaq === index ? 'text-blue-400' : 'text-slate-200'}`}>{faq.q}</span>
                      <ChevronDown className={`transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && <p className="p-7 pt-0 text-slate-400 border-t border-slate-800/50 leading-relaxed">{faq.a}</p>}
                  </div>
                ))}
              </div>
            )}

            {(activeTab === 'gizlilik' || activeTab === 'sartlar') && (
              <div className="space-y-8 animate-in fade-in duration-700">
                <h2 className="text-3xl font-bold text-white border-b border-slate-800 pb-2">
                  {activeTab === 'gizlilik' ? legalData.privacy.title : legalData.terms.title}
                </h2>
                <div className="text-slate-400 leading-relaxed text-lg font-light whitespace-pre-wrap">
                  {activeTab === 'gizlilik' ? legalData.privacy.content : legalData.terms.content}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SupportPage;