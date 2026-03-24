"use client";
import React from 'react';
import { Hammer, Cog, Clock } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0c0d10] flex flex-col items-center justify-center p-6 text-center antialiased">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full animate-pulse" />
        <div className="relative bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl shadow-2xl">
          <Hammer size={64} className="text-blue-500 animate-bounce" />
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
          Size Daha İyi Bir <br />
          <span className="text-blue-600">NexTrade</span> Hazırlıyoruz
        </h1>
        
        <p className="text-gray-500 font-bold text-lg uppercase tracking-widest max-w-md mx-auto">
          Sistem güncellemeleri nedeniyle kısa bir süreliğine kapalıyız.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/60 text-xs font-black uppercase tracking-widest">
            <Clock size={16} /> Yakında Buradayız
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/60 text-xs font-black uppercase tracking-widest">
            <Cog size={16} className="animate-spin" /> Teknik Güncelleme
          </div>
        </div>
      </div>

      <footer className="fixed bottom-12">
        <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.6em]">
          NexTrade Infrastructure v2.4.0
        </span>
      </footer>
    </div>
  );
}