"use client";
import React from 'react';
import { Edit3, Trash2, Eye, AlertTriangle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

const mockProducts: Product[] = [
  { id: 1, name: "Oversize Denim Ceket", category: "Dış Giyim", price: 1850, stock: 3, image: "🧥" },
  { id: 2, name: "Pamuklu Slim Fit Tişört", category: "Giyim", price: 450, stock: 25, image: "👕" },
  { id: 3, name: "Deri Sırt Çantası", category: "Aksesuar", price: 3200, stock: 1, image: "🎒" },
];

export default function ProductList() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-[2rem] overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/80">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Ürün Detayı</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Kategori</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Fiyat</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Stok Durumu</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Yönet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {mockProducts.map((product) => {
              const isLowStock = product.stock < 5;
              return (
                <tr key={product.id} className="group hover:bg-indigo-500/5 transition-all duration-300">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {product.image}
                      </div>
                      <span className="font-bold text-gray-200 text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-gray-500 text-xs font-medium bg-gray-950 px-3 py-1 rounded-full border border-gray-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center font-bold text-indigo-400 italic">
                    {product.price} ₺
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black border ${
                        isLowStock 
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                      }`}>
                        {isLowStock && <AlertTriangle size={12} className="animate-pulse" />}
                        {product.stock} ADET
                      </div>
                      {isLowStock && <span className="text-[9px] text-amber-600/70 font-bold uppercase tracking-tighter">Kritik Seviye</span>}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 hover:bg-gray-800 text-gray-400 hover:text-white rounded-xl transition-all"><Eye size={18} /></button>
                      <button className="p-2.5 hover:bg-indigo-500/20 text-indigo-400 rounded-xl transition-all"><Edit3 size={18} /></button>
                      <button className="p-2.5 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}