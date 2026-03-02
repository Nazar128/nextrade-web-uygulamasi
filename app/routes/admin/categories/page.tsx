"use client";
import React, { useState } from 'react';
import { Categories as initialCategories } from '@/data/Categories';
import { Plus, Edit2, Trash2, ChevronRight, Layers, FolderTree } from 'lucide-react';

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex mx-auto justify-center p-6 md:p-12">
      <div className="w-full max-w-5xl space-y-10">
        <div className="flex justify-between items-end border-b border-gray-900 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              <FolderTree className="text-indigo-500" size={32} />
              Sistem Kategorileri
            </h1>
            <p className="text-gray-500 mt-2">Hiyerarşik kategori yapısını ve alt dalları yönetin.</p>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-2xl font-black hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg">
            <Plus size={20} /> YENİ ANA KATEGORİ
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-6 hover:border-indigo-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-950 rounded-2xl flex items-center justify-center text-indigo-500 border border-gray-800 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{cat.subCategories.length} Alt Dal</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:text-white transition-colors"><Edit2 size={16}/></button>
                  <button className="p-2 text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>


              <div className="space-y-2 bg-gray-950/50 p-4 rounded-3xl border border-gray-800/50">
                {cat.subCategories.map((sub) => (
                  <div key={sub.id} className="flex justify-between items-center group/sub hover:bg-gray-900 p-2 rounded-xl transition-all">
                    <div className="flex items-center gap-2 text-gray-400">
                      <ChevronRight size={14} className="text-indigo-500" />
                      <span className="text-sm font-medium">{sub.title}</span>
                    </div>
                    <div className="opacity-0 group-hover/sub:opacity-100 flex gap-1">
                       <button className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors">DÜZENLE</button>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-2 py-2 border border-dashed border-gray-800 rounded-xl text-[10px] font-black text-gray-600 hover:border-indigo-500/50 hover:text-indigo-500 transition-all uppercase tracking-widest">
                  + Alt Kategori Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}