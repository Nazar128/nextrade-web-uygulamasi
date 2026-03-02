"use client";
import React, { useState } from 'react';
import { Bell, Package, ShoppingCart, AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Yeni Sipariş!",
      desc: "#4502 numaralı sipariş alındı.",
      time: "2 dk önce",
      icon: <ShoppingCart className="text-emerald-400" size={18} />,
      unread: true
    },
    {
      id: 2,
      title: "Stok Uyarısı",
      desc: "Deri Sırt Çantası stokları tükeniyor!",
      time: "1 saat önce",
      icon: <AlertCircle className="text-amber-400" size={18} />,
      unread: true
    },
    {
      id: 3,
      title: "Ürün Onaylandı",
      desc: "Yeni eklediğiniz tişört yayında.",
      time: "5 saat önce",
      icon: <CheckCircle2 className="text-blue-400" size={18} />,
      unread: false
    }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-gray-900 border border-gray-800 rounded-2xl text-gray-400 hover:text-white transition-all group"
      >
        <Bell size={22} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-gray-900 rounded-full animate-pulse" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-4 w-80 bg-gray-900 border border-gray-800 rounded-[2rem] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            <div className="p-5 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-white tracking-tight">Bildirimler</h3>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-lg font-black italic">2 YENİ</span>
            </div>

            <div className="max-h-[350px] overflow-y-auto">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-4 flex gap-4 hover:bg-gray-800/50 transition-colors cursor-pointer border-b border-gray-800/50 ${n.unread ? 'bg-indigo-500/5' : ''}`}
                >
                  <div className="mt-1">{n.icon}</div>
                  <div className="flex-1">
                    <p className={`text-sm ${n.unread ? 'text-white font-bold' : 'text-gray-400'}`}>{n.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{n.desc}</p>
                    <p className="text-[10px] text-gray-600 mt-1 uppercase font-bold">{n.time}</p>
                  </div>
                  {n.unread && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2" />}
                </div>
              ))}
            </div>

            <button className="w-full py-4 text-xs font-black text-gray-500 hover:text-white transition-colors bg-gray-900/50 uppercase tracking-widest">
              Tümünü Gör
            </button>
          </div>
        </>
      )}
    </div>
  );
}