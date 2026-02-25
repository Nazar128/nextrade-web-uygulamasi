"use client";
import React, { useEffect, useState } from 'react';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import FavoriteProductCard from '@/components/FavoriteProductCard';
import { products, Product } from '@/data/products'; 

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved && JSON.parse(saved).length > 0) {
      setFavorites(JSON.parse(saved));
    } else {
      setFavorites(products.slice(0, 4)); 
    }
    setLoading(false);
  }, []);

  const removeFavorite = (id: string | number) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm("Favori listeniz temizlensin mi?")) {
      setFavorites([]);
      localStorage.removeItem("favorites");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen w-full  p-2 md:p-6 font-sans">
      <div className="fixed top-[-5%] left-[-10%] w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6 border-b border-white/5 pb-10">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-gradient-to-br from-[#4f0030] to-[#1e0031] rounded-[2.5rem] border border-white/10 shadow-2xl">
              <Heart className="text-white fill-pink-500 w-10 h-10 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-3 text-blue-500">
                <span className="h-[2px] w-8 bg-current rounded-full" />
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-white">Favorilerim</h1>
              <p className="text-slate-500 text-sm mt-2 font-medium italic">Seçtiğin {favorites.length} özel parça.</p>
            </div>
          </div>

          {favorites.length > 0 && (
            <button 
              onClick={clearAll} 
              className="flex items-center gap-3 bg-gradient-to-r from-slate-800 via-blue-400 to-blue-700 hover:from-blue-700 hover:to-slate-800 px-8 py-4 rounded-[1.5rem] transition-all font-black  active:scale-95"
            >
              <Trash2 size={20} /> LİSTEYİ SIFIRLA
            </button>
          )}
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((product) => (
              <FavoriteProductCard 
                key={product.id} 
                product={product} 
                onRemove={removeFavorite} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <h2 className="text-white text-2xl font-black mb-8 tracking-widest italic opacity-50">LİSTE ŞU AN BOŞ</h2>
            <Link href="/" className="bg-white text-black px-12 py-5 rounded-[1.5rem] font-black hover:bg-pink-500 hover:text-white transition-all shadow-2xl">
              KEŞFETMEYE BAŞLA
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;