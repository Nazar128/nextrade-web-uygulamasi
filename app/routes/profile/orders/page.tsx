"use client"
import React from 'react';
import { Package, ChevronRight, Clock, CheckCircle2, Truck, Box, Search, Filter } from 'lucide-react';

const orders = [
  {
    id: "ORD-7521",
    date: "12 Şubat 2026",
    total: "4.250,00 TL",
    status: "Kargoda",
    items: 3,
    icon: <Truck size={20} />,
    theme: "cyan",
    glow: "shadow-cyan-500/20"
  },
  {
    id: "ORD-8942",
    date: "05 Ocak 2026",
    total: "1.120,50 TL",
    status: "Teslim Edildi",
    items: 1,
    icon: <CheckCircle2 size={20} />,
    theme: "green",
    glow: "shadow-green-500/20"
  },
  {
    id: "ORD-3310",
    date: "28 Aralık 2025",
    total: "850,00 TL",
    status: "Hazırlanıyor",
    items: 2,
    icon: <Clock size={20} />,
    theme: "yellow",
    glow: "shadow-yellow-500/20"
  }
];

export default function OrdersPage() {
  const themes: any = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    green: "text-green-400 bg-green-500/10 border-green-500/20",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  };

  return (
    <div className="w-full space-y-10 pb-20 px-4 font-sans">
      
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="space-y-2">
          <p className="text-cyan-500 text-xs font-black tracking-[0.4em] uppercase ml-1">Selin Çınar — İşlem Geçmişi</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white  leading-none">
            Siparişlerim
          </h1>
          <p className="text-gray-500 font-medium text-lg"></p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              placeholder="Sipariş ID ile ara..." 
              className="bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-cyan-500/50 w-full md:w-80 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-white/[0.03] border border-white/10 px-6 py-4 rounded-2xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Filter size={18} /> Filtrele
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div 
            key={order.id}
            className={`group relative overflow-hidden rounded-[2.5rem] bg-[#0f1115] border border-white/5 hover:border-white/10 transition-all duration-500 p-1 shadow-2xl ${order.glow}`}
          >
            <div className={`absolute -right-20 -top-20 w-64 h-64 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-[80px] rounded-full 
              ${order.theme === 'cyan' ? 'bg-cyan-500' : order.theme === 'green' ? 'bg-green-500' : 'bg-yellow-500'}`} 
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-6 md:p-8">
              
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 shadow-lg ${themes[order.theme]}`}>
                  <Box size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-white tracking-tight">#{order.id}</h3>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${themes[order.theme]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-tighter">{order.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:flex md:items-center gap-8 md:gap-16 border-t border-white/5 lg:border-none pt-6 lg:pt-0">
                <div className="space-y-1 text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Paket İçeriği</p>
                  <p className="text-lg font-bold text-gray-200">{order.items} Ürün</p>
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Tutar</p>
                  <p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{order.total}</p>
                </div>
                <div className="hidden xl:block space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Tahmini Teslimat</p>
                  <p className="text-sm font-bold text-gray-400">3 İş Günü İçinde</p>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-4 border-t border-white/5 lg:border-none pt-6 lg:pt-0">
                <button className="flex-1 lg:flex-none px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black tracking-widest text-white transition-all">
                  DETAYLARI İNCELE
                </button>
                <button className="p-4 bg-cyan-500 text-black rounded-2xl hover:scale-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}