"use client";
import React, { useState } from 'react';
import { Plus, Search, Filter, X, Image as ImageIcon, Calendar } from 'lucide-react';
import { CampaignCard } from '@/components/CampaignCard';

export default function CMSPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([
   

    {
      title: "Bahar İndirimleri",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800",
      status: "Aktif" as const,
      clicks: "48.2K",
      period: "01.03 - 31.03"
    },
    {
      title: "Teknoloji Haftası",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
      status: "Pasif" as const,
      clicks: "12.4K",
      period: "15.03 - 22.03"
    },
    {
      title: "Yeni Üyelik Bonusu",
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800",
      status: "Aktif" as const,
      clicks: "5.1K",
      period: "Süresiz"
    },

  ]);

  return (
    <div className="p-4 bg-slate-950 min-h-screen mx-auto text-slate-300 font-sans relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-600 tracking-tight leading-none">
            <span className='text-4xl text-blue-700 '>İÇERİK</span> YÖNETİMİ
          </h1>
          <p className="text-xs text-slate-500 mt-2">Platform görsellerini ve aktif kampanyaları kontrol edin.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          YENİ İÇERİK EKLE
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
          <input 
            type="text" 
            placeholder="Kampanya ara..." 
            className="w-full bg-slate-900/40 border border-slate-800/60 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:border-blue-700/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/40 border border-slate-800/60 rounded-xl text-xs text-slate-500 hover:text-white transition-colors font-medium">
          <Filter size={14} />
          Filtrele
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {campaigns.map((camp, index) => (
          <CampaignCard key={index} {...camp} />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-lg font-bold text-white tracking-tight">Yeni Kampanya Oluştur</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Kampanya Başlığı</label>
                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-700 outline-none transition-all text-white" placeholder="Örn: Yaz Fırsatları" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Görsel URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-3 text-sm focus:border-blue-700 outline-none transition-all text-white" placeholder="https://..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Geçerlilik</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-700 outline-none transition-all text-white" placeholder="01.03 - 31.03" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Durum</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-700 outline-none transition-all text-white appearance-none">
                    <option>Aktif</option>
                    <option>Pasif</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                  onClick={() => setIsModalOpen(false)}
                >
                  KAMPANYAYI YAYINLA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}