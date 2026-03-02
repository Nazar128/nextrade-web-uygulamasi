"use client";
import React, { useState } from 'react';
import { Store, Clock, MapPin, Save, Bell, ShieldCheck } from 'lucide-react';

export default function StoreSettings() {
  const [days, setDays] = useState([
    { day: "Pazartesi", open: "09:00", close: "19:00", active: true },
    { day: "Salı", open: "09:00", close: "19:00", active: true },
    { day: "Çarşamba", open: "09:00", close: "19:00", active: true },
    { day: "Perşembe", open: "09:00", close: "19:00", active: true },
    { day: "Cuma", open: "09:00", close: "19:00", active: true },
    { day: "Cumartesi", open: "10:00", close: "16:00", active: true },
    { day: "Pazar", open: "00:00", close: "00:00", active: false },
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500">
            <Store size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Mağaza Profili</h2>
            <p className="text-gray-500 text-sm">Müşterilerin göreceği genel mağaza bilgileri.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Mağaza Adı</label>
            <input type="text" defaultValue="Modern Stil Butik" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">E-posta Adresi</label>
            <input type="email" defaultValue="iletisim@modernstil.com" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Mağaza Açıklaması</label>
            <textarea rows={3} className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200 resize-none" placeholder="Mağazanız hakkında kısa bir bilgi verin..." />
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
            <Clock size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Çalışma Saatleri</h2>
            <p className="text-gray-500 text-sm">Siparişlerin hazırlanma ve teslimat zamanlarını belirler.</p>
          </div>
        </div>

        <div className="space-y-3">
          {days.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-950/50 border border-gray-800/50 rounded-2xl hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-gray-700'}`} />
                <span className={`text-sm font-bold w-24 ${item.active ? 'text-gray-200' : 'text-gray-600'}`}>{item.day}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <input type="text" defaultValue={item.open} disabled={!item.active} className="w-20 p-2 bg-gray-900 border border-gray-800 rounded-xl text-center text-xs text-gray-300 disabled:opacity-20" />
                <span className="text-gray-700">-</span>
                <input type="text" defaultValue={item.close} disabled={!item.active} className="w-20 p-2 bg-gray-900 border border-gray-800 rounded-xl text-center text-xs text-gray-300 disabled:opacity-20" />
                <button 
                  onClick={() => {
                    const newDays = [...days];
                    newDays[idx].active = !newDays[idx].active;
                    setDays(newDays);
                  }}
                  className={`ml-4 text-[10px] font-black px-3 py-1 rounded-lg border transition-all ${
                    item.active ? 'border-red-500/20 text-red-500 hover:bg-red-500/10' : 'border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10'
                  }`}
                >
                  {item.active ? 'KAPAT' : 'AÇ'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-3 bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-500 transition-all shadow-[0_15px_30px_-10px_rgba(16,185,129,0.4)] active:scale-95">
          <Save size={20} />
          AYARLARI KAYDET
        </button>
      </div>
    </div>
  );
}