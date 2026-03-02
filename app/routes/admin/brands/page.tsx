"use client";
import React, { useState } from 'react';
import { brands as initialBrands, Brand } from '@/data/Brands';
import { Award, Plus, Trash2, Edit3, Search, Globe, Image as ImageIcon } from 'lucide-react';

export default function AdminBrandsPage() {
  const [brandsList, setBrandsList] = useState<Brand[]>(initialBrands);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col mx-auto p-6 md:p-12">
      <div className="w-full max-w-6xl space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-900 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                <Award size={24} />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter">
                Marka Portföyü
              </h1>
            </div>
            <p className="text-gray-500 font-medium">Sistemde kayıtlı olan global ve yerel markaları yönetin.</p>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative group hidden md:block">
                <Search className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Marka ara..." 
                  className="bg-gray-900 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all w-64"
                />
             </div>
             <button className="bg-white text-black px-8 py-3.5 rounded-2xl font-black hover:bg-gray-200 transition-all shadow-xl flex items-center gap-2 active:scale-95">
               <Plus size={20} /> YENİ MARKA
             </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandsList.map((brand) => (
            <div 
              key={brand.id} 
              className="group bg-gray-900 border border-gray-800 rounded-[2.5rem] p-6 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl group-hover:bg-indigo-600/10 transition-all" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-950 border border-gray-800 rounded-[2rem] flex items-center justify-center p-4 mb-6 group-hover:scale-110 group-hover:border-gray-700 transition-all duration-500 shadow-inner">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=" + brand.name[0];
                    }}
                  />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                  {brand.name}
                </h3>
                <div className="flex items-center gap-1 text-[10px] text-gray-600 font-black uppercase mt-1 tracking-widest">
                   <Globe size={10} /> Verified Brand
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <button className="p-3 bg-gray-800 hover:bg-indigo-600 text-gray-400 hover:text-white rounded-xl transition-all shadow-lg">
                  <Edit3 size={18} />
                </button>
                <button className="p-3 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl transition-all shadow-lg text-red-500 hover:text-white">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="border-2 border-dashed border-gray-900 rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-4 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gray-700 group-hover:text-indigo-500 transition-colors">
              <Plus size={32} />
            </div>
            <span className="text-xs font-black text-gray-600 tracking-widest uppercase">Marka Tanımla</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] text-sm text-gray-500 italic">
          <ImageIcon size={20} className="text-indigo-400" />
          Marka logoları sistem genelinde (Ürün kartları, filtreler, kategori sayfaları) otomatik olarak optimize edilerek gösterilir.
        </div>

      </div>
    </div>
  );
}